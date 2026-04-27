import Link from 'next/link';

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'orders@example.com';

export const metadata = {
  title: 'Контакты — SellerOS Lite',
  description: 'Контакты поддержки SellerOS Lite для вопросов по заказам, оплате и выдаче результата.'
};

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur">
          <Link href="/" className="text-sm font-black text-slate-950">SellerOS Lite</Link>
          <Link href="/generator" className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">Бесплатный аудит</Link>
        </nav>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Контакты</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">Поддержка по заказам и выдаче результата</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            По вопросам оплаты, подтверждения перевода и получения полного аудита карточки напишите на email поддержки.
          </p>
          <a
            href={`mailto:${supportEmail}`}
            className="mt-8 inline-flex rounded-2xl bg-blue-600 px-6 py-4 text-base font-black text-white transition hover:bg-blue-700"
          >
            {supportEmail}
          </a>
        </section>

        <section className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-soft">
          <h2 className="text-xl font-black text-amber-950">Важно для MVP</h2>
          <p className="mt-3 text-sm leading-7 text-amber-950">
            Перед публичным запуском замените email-заглушку и реквизиты в переменных окружения на реальные данные владельца проекта.
          </p>
        </section>
      </div>
    </main>
  );
}
