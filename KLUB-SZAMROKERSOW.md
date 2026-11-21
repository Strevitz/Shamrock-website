# Klub Szamrokersów – uruchomienie

Strona `/membership` działa od razu w trybie „zapisy wkrótce” (przycisk WhatsApp). Formularz, płatności i panele włączają się po dodaniu kluczy poniżej.

Przed uruchomieniem sprawdź limity wybranych planów Netlify, Supabase i dostawcy poczty oraz opłaty Stripe Payments i Billing.

## 1. Supabase (darmowy plan)
1. Załóż projekt na supabase.com.
2. SQL Editor → wklej `supabase/schema.sql` → Run.
3. Authentication → Providers → Email: zostaw włączone „Confirm email”. Przed otwarciem zapisów skonfiguruj własny SMTP dla Supabase Auth i sprawdź dostarczenie wiadomości rejestracyjnej oraz linku do zmiany hasła na adres spoza zespołu Supabase.
4. Authentication → URL Configuration: Site URL `https://shamrockbarber.com`. W Redirect URLs dodaj dokładne adresy `https://shamrockbarber.com/membership/confirm` i `https://shamrockbarber.com/membership/reset` oraz odpowiedniki ze ścieżkami `/en/membership` i `/ua/membership`. W projekcie testowym użyj tych samych ścieżek na odrębnej domenie podglądu. Zachowaj `{{ .ConfirmationURL }}` w szablonach potwierdzenia i resetu.
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

### Test przed uruchomieniem zapisów
- Użyj odrębnego projektu Supabase do testów i ceny miesięcznej z sandboxa Stripe. W Netlify ustaw testowe wartości wyłącznie dla **Deploy Previews**, a nie dla Production. Oznacz klucz serwerowy Supabase, klucz Stripe i sekret webhooka jako sekrety.
- Ustaw `SITE_URL` na adres testowego podglądu. Skieruj webhook z sandboxa Stripe na `/.netlify/functions/stripe-webhook` tego podglądu, nie na domenę produkcyjną. Nie publikuj formularza w produkcji, dopóki nowe członkostwo nie przejdzie testu od zakupu po status aktywny w aplikacji.
- W Supabase pozostaw wyłączony automatyczny dostęp do nowych tabel przez Data API. Schemat nadaje zalogowanym użytkownikom i funkcjom serwerowym tylko niezbędne uprawnienia.

## 4. E-maile transakcyjne Klubu
- Użyj osobnego dostawcy maili transakcyjnych, np. Resend. Zweryfikuj subdomenę nadawczą, np. `mail.shamrockbarber.com`, bez zmieniania poczty przychodzącej głównej domeny. Zwykła skrzynka Zoho Mail nie służy do automatycznej wysyłki zgodnie z [zasadami Zoho](https://www.zoho.com/mail/help/usage-policy.html).
- Skonfiguruj SMTP w dwóch miejscach: w [Supabase Auth](https://supabase.com/docs/guides/auth/auth-smtp) do potwierdzeń i resetów oraz w zmiennych Netlify (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`) do wiadomości Klubu. Nie używaj danych logowania do skrzynki salonu.
- Ustaw `MAIL_TO=info@shamrockbarber.com` jako adres obsługi. Przed publikacją potwierdź dostarczenie testowej rejestracji, resetu i wiadomości Klubu. Jeśli dostawca śledzi linki, wyłącz śledzenie dla poczty Auth.

## Jak to działa
- Rejestracja → Supabase Auth; zakup → Stripe Checkout; status i płatności zapisuje webhook.
- Karta z QR: kod `SZ-XXXXXXXX` w panelu członka. Skan QR otwiera `/membership/admin?c=KOD` – barber po zalogowaniu widzi status i czy naliczyć 10%.
- Nieudana płatność: Stripe ponawia próby, status zmienia się na „Zaległa płatność”, członek i salon dostają e-mail.
- Concierge: prośba z panelu trafia do bazy, na info@ i jako gotowa wiadomość WhatsApp.
