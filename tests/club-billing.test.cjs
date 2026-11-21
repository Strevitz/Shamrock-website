const assert = require("node:assert/strict");
const { createHmac } = require("node:crypto");
const { test } = require("node:test");
const checkout = require("../netlify/functions/checkout").handler;
const webhook = require("../netlify/functions/stripe-webhook").handler;
const { sb } = require("../netlify/functions/_lib");

Object.assign(process.env, {
  SITE_URL: "https://example.test",
  SUPABASE_URL: "https://db.example.test",
  SUPABASE_ANON_KEY: "sb_publishable_fake",
  SUPABASE_SERVICE_ROLE_KEY: "sb_secret_fake",
  STRIPE_PRICE_ID: "price_club",
  STRIPE_WEBHOOK_SECRET: "synthetic-signing-test-secret",
  STRIPE_SECRET_KEY: "synthetic-api-test-key",
  RESEND_API_KEY: "synthetic-mail-test-key",
  MAIL_FROM: "club@example.test",
});

const customer = "cus_club";
const membership = { user_id: "member", stripe_customer_id: customer, stripe_subscription_id: "sub_club" };
const subscription = { id: "sub_club", customer, status: "active", items: { data: [{ price: { id: "price_club" } }] } };
const checkoutRequest = { httpMethod: "POST", headers: { authorization: "Bearer member-token" }, body: '{"lang":"pl"}' };

function signedEvent(type, object) {
  const body = JSON.stringify({ id: "evt_synthetic", type, data: { object } });
  const now = Math.floor(Date.now() / 1000);
  const hash = createHmac("sha256", process.env.STRIPE_WEBHOOK_SECRET).update(`${now}.${body}`).digest("hex");
  return { httpMethod: "POST", body, headers: { "stripe-signature": `t=${now},v1=${hash}` } };
}

function mock(t, respond) {
  t.mock.method(global, "fetch", async (url, options) => Response.json(await respond(new URL(url), options)));
}

test("modern Supabase server key is sent only as apikey", async (t) => {
  mock(t, (url, options) => {
    assert.equal(options.headers.apikey, "sb_secret_fake");
    assert.equal(options.headers.Authorization, undefined);
    return [];
  });
  await sb("memberships");
});

test("an existing unpaid subscription cannot be replaced by a second checkout", async (t) => {
  mock(t, (url) => {
    if (url.pathname === "/auth/v1/user") return { id: "member" };
    if (url.pathname === "/rest/v1/memberships") return [{ ...membership, status: "past_due" }];
    assert.fail("must not contact Stripe to start another checkout");
  });
  assert.equal((await checkout(checkoutRequest)).statusCode, 409);
});

test("reopening an unpaid checkout reuses the session already open", async (t) => {
  mock(t, (url, options) => {
    if (url.pathname === "/auth/v1/user") return { id: "member" };
    if (url.pathname === "/rest/v1/memberships") return [{ ...membership, status: "none" }];
    assert.equal(url.pathname, "/v1/checkout/sessions");
    assert.equal(url.searchParams.get("customer"), customer);
    assert.equal(options.method, "GET");
    return { data: [{ status: "open", url: "https://checkout.example.test/open" }] };
  });
  assert.deepEqual(JSON.parse((await checkout(checkoutRequest)).body), { url: "https://checkout.example.test/open" });
});

test("Stripe prevents a second checkout even before the webhook updates the database", async (t) => {
  mock(t, (url) => {
    if (url.pathname === "/auth/v1/user") return { id: "member" };
    if (url.pathname === "/rest/v1/memberships") return [{ ...membership, status: "none" }];
    if (url.pathname === "/v1/checkout/sessions") return { data: [{ status: "complete" }] };
    assert.equal(url.pathname, "/v1/subscriptions");
    return { data: [subscription] };
  });
  assert.equal((await checkout(checkoutRequest)).statusCode, 409);
});

test("concurrent new checkout attempts use the same idempotency key", async (t) => {
  const keys = [];
  mock(t, (url, options) => {
    if (url.pathname === "/auth/v1/user") return { id: "member" };
    if (url.pathname === "/rest/v1/memberships") return [{ ...membership, status: "none" }];
    if (url.pathname === "/v1/subscriptions" || options.method === "GET") return { data: [] };
    assert.equal(url.pathname, "/v1/checkout/sessions");
    const body = new URLSearchParams(options.body);
    assert.equal(body.get("line_items[0][price]"), "price_club");
    assert.equal(body.get("adaptive_pricing[enabled]"), "false");
    keys.push(options.headers["Idempotency-Key"]);
    return { url: "https://checkout.example.test/new" };
  });
  const results = await Promise.all([checkout(checkoutRequest), checkout(checkoutRequest)]);
  assert.deepEqual(results.map((result) => result.statusCode), [200, 200]);
  assert.deepEqual(keys, [`club-checkout-${customer}-first`, `club-checkout-${customer}-first`]);
});

test("webhook rejects unsigned events and ignores other products", async (t) => {
  mock(t, () => assert.fail("event must not mutate the database or call Stripe"));
  assert.equal((await webhook({ httpMethod: "POST", headers: {}, body: "{}" })).statusCode, 400);
  const other = { ...subscription, items: { data: [{ price: { id: "price_other" } }] } };
  assert.equal((await webhook(signedEvent("customer.subscription.updated", other))).statusCode, 200);
});

test("verified paid checkout activates the membership and sends a deduplicated Resend email", async (t) => {
  let written = false;
  let sent = false;
  mock(t, (url, options) => {
    if (url.pathname === "/v1/subscriptions/sub_club") return subscription;
    if (url.pathname === "/rest/v1/profiles") return [{ email: "delivered@resend.dev" }];
    if (url.pathname === "/rest/v1/memberships") {
      if (options.method === "GET") return [membership];
      assert.equal(JSON.parse(options.body).status, "active");
      written = true;
      return [];
    }
    assert.equal(url.hostname, "api.resend.com");
    assert.equal(options.headers["Idempotency-Key"], "club-welcome-cs_synthetic");
    assert.deepEqual(JSON.parse(options.body).to, ["delivered@resend.dev"]);
    sent = true;
    return { id: "email_synthetic" };
  });
  const event = signedEvent("checkout.session.completed", {
    id: "cs_synthetic", subscription: "sub_club", mode: "subscription", client_reference_id: "member",
  });
  assert.equal((await webhook(event)).statusCode, 200);
  assert.ok(written && sent);
});
