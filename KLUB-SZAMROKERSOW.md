# Klub Szamrokersów – uruchomienie (koszt stały: 0 zł)

Strona `/membership` działa od razu w trybie „zapisy wkrótce” (przycisk WhatsApp). Formularz, płatności i panele włączają się po dodaniu kluczy poniżej.

Koszty: Netlify, Supabase i skrzynka Zoho w planach darmowych. Stripe nie ma opłaty miesięcznej – pobiera tylko prowizję od każdej udanej płatności.

## 1. Supabase (darmowy plan)
1. Załóż projekt na supabase.com.
2. SQL Editor → wklej `supabase/schema.sql` → Run.
3. Authentication → Providers → Email: dla płynnego zakupu wyłącz „Confirm email” (albo zostaw – wtedy klient najpierw potwierdza e-mail).
4. Authentication → URL Configuration: Site URL `https://shamrockbarber.com`.
5. Zarejestruj własne konto na stronie, potem w SQL Editor: `update public.profiles set role = 'admin' where email = '<twój e-mail>';` Barberom nadaj `'barber'` tak samo.
6. Settings → API: skopiuj Project URL, anon key i service_role key.

## 2. Stripe
1. Product catalog → Add product „Klub Szamrokersów” → cena cykliczna miesięczna 19,00 PLN → skopiuj `price_...`.
2. Settings → Billing → Customer portal: włącz anulowanie subskrypcji, zmianę karty i faktury.
3. Settings → Billing → Subscriptions and emails: włącz ponawianie nieudanych płatności (Smart Retries) i e-maile o nieudanej płatności.
4. Developers → Webhooks → endpoint `https://shamrockbarber.com/.netlify/functions/stripe-webhook`, zdarzenia: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed`. Skopiuj `whsec_...`.
5. Po końcu promocji: dodaj cenę 29 zł, podmień `STRIPE_PRICE_ID` i ustaw `PRICE_PROMO = null` w `src/membership/config.js`.

## 3. Netlify – zmienne środowiskowe
Zobacz `.env.example`. Po zapisaniu zmiennych uruchom ponowne wdrożenie.

## 4. E-mail z info@shamrockbarber.com
W Zoho utwórz hasło aplikacji i wpisz je jako `SMTP_PASS` (host `smtp.zoho.eu`, port 465).

## Jak to działa
- Rejestracja → Supabase Auth; zakup → Stripe Checkout; status i płatności zapisuje webhook.
- Karta z QR: kod `SZ-XXXXXXXX` w panelu członka. Skan QR otwiera `/membership/admin?c=KOD` – barber po zalogowaniu widzi status i czy naliczyć 10%.
- Nieudana płatność: Stripe ponawia próby, status zmienia się na „Zaległa płatność”, członek i salon dostają e-mail.
- Concierge: prośba z panelu trafia do bazy, na info@ i jako gotowa wiadomość WhatsApp.
