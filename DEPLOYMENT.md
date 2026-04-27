# Deployment checklist

This checklist turns the SellerOS Lite MVP from repository code into a public test.

## 1. Import the project into Vercel

1. Open Vercel dashboard.
2. Choose **Add New Project**.
3. Import GitHub repository: `TerraTectra/AutoMoney`.
4. Framework preset: **Next.js**.
5. Build command: `npm run build`.
6. Install command: `npm install`.
7. Output directory: leave default.

The repository includes `vercel.json`, so Vercel should detect the basic configuration automatically.

## 2. Set environment variables

Add these variables in Vercel Project Settings → Environment Variables.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_SUPPORT_EMAIL=orders@your-domain.example
NEXT_PUBLIC_PAYMENT_RECIPIENT=REPLACE_WITH_REAL_RECIPIENT
NEXT_PUBLIC_PAYMENT_BANK=REPLACE_WITH_REAL_BANK
NEXT_PUBLIC_PAYMENT_PHONE=REPLACE_WITH_REAL_SBP_PHONE
NEXT_PUBLIC_PAYMENT_CARD=REPLACE_WITH_REAL_CARD_OR_ACCOUNT
NEXT_PUBLIC_PAYMENT_NOTE=Доступ выдаётся после подтверждения фактического поступления платежа.
NEXT_PUBLIC_PRODUCT_PRICE=490
NEXT_PUBLIC_PRODUCT_NAME=Полный аудит карточки товара
```

## 3. Manual payment process

1. Buyer opens `/pay`.
2. Site creates an `ORDER-YYYYMMDD-XXXXX` ID.
3. Buyer transfers the exact amount and adds the order ID as payment comment.
4. Buyer clicks the mailto button and sends an order email.
5. ChatGPT checks Gmail for emails with subject `[AutoMoney Order]`.
6. Owner confirms whether the transfer arrived.
7. ChatGPT sends the paid result to the buyer and labels the order as delivered.

## 4. Pre-launch checks

Before sharing the public link, verify:

- Real support email is set.
- Real payment recipient details are set.
- `/pay` does not show placeholder values.
- `/oferta` and `/privacy` are reviewed and updated for the real seller/legal status.
- `NEXT_PUBLIC_SITE_URL` matches the deployed domain.
- `sitemap.xml` opens correctly.
- `robots.txt` opens correctly.
- A test order email arrives in Gmail.

## 5. First traffic test

The first target is not scale. The first target is proof of demand.

Minimum test target:

- 100–300 visitors.
- 10–20 clicks on payment intent.
- 1–3 real paid orders.

If payment intent is low, change the offer before adding complex automation.

## 6. Next automation step

After first paid signals, replace manual transfer with one of:

- YooKassa
- Robokassa
- CloudPayments
- T-Kassa

The code is structured so the manual transfer flow can later be replaced by a payment gateway without rebuilding the entire product.
