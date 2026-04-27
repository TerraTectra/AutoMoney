# SellerOS Lite MVP

SellerOS Lite is a self-serve micro-SaaS experiment for Russian marketplace sellers. The first version focuses on one clear pain: audit a product card and generate ready-to-use improvements for Ozon, Wildberries, and Yandex Market.

## MVP scope

- Landing page for the product-card audit offer.
- Free product-card generator with limited output.
- Manual transfer checkout flow with order ID.
- Mailto-based order notification for Gmail handling.
- Pricing blocks for one-time audit packs.
- Download/delivery instructions for the first paid product.
- SEO pages for marketplace seller search demand.

## Manual payment flow

1. Buyer fills in the audit form.
2. Buyer sees a generated order ID and transfer instructions.
3. Buyer sends an order email via `mailto:`.
4. ChatGPT monitors Gmail for `[AutoMoney Order]` messages.
5. Owner confirms payment receipt.
6. ChatGPT sends delivery email and labels the order as delivered.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values before deployment.

```bash
NEXT_PUBLIC_SUPPORT_EMAIL=
NEXT_PUBLIC_PAYMENT_RECIPIENT=
NEXT_PUBLIC_PAYMENT_BANK=
NEXT_PUBLIC_PAYMENT_PHONE=
NEXT_PUBLIC_PAYMENT_CARD=
NEXT_PUBLIC_PAYMENT_NOTE=
NEXT_PUBLIC_PRODUCT_PRICE=490
```

The MVP works without a payment gateway. Later, `manualTransfer` can be replaced with Robokassa, YooKassa, CloudPayments, or T-Kassa.

## Build status

The repository includes a GitHub Actions workflow that runs `npm install` and `npm run build` on pushes to `master` and pull requests targeting `master`.
