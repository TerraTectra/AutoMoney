import Link from 'next/link';

const plans = [
  {
    name: 'Разовый аудит',
    price: '490 ₽',
    description: 'Один полный разбор карточки товара с готовыми текстами и чек-листом.',
    features: ['5 вариантов названия', 'Описание карточки', 'SEO-ключи', '10 УТП', 'Ответы на отзывы', 'Чек-лист улучшений'],
    featured: true
  },
  {
    name: 'Пак 5 аудитов',
    price: '1 990 ₽',
    description: 'Для продавца, который хочет быстро улучшить несколько карточек.',
    features: ['5 карточек товара', 'Единый стиль текстов', 'CSV-структура', 'Приоритетная выдача', 'Рекомендации по категориям'],
    featured: false
  },
  {
    name: 'Bulk-подготовка',
    price: 'от 4 990 ₽',
    description: 'Для каталога товаров. Пока оформляется вручную после заявки.',
    features: ['20+ карточек', 'Массовая структура', 'Группировка по категориям', 'Экспорт для команды', 'План улучшений'],
    featured: false
  }
];

export const metadata = {
  title: 'Тарифы SellerOS Lite — аудит карточек товара',
  description: 'Тарифы на аудит карточек товара для маркетплейсов: разовый аудит, пакет карточек и bulk-подготовка.'
};

export default function PricingPage() {
  return (
    <main className="min-h-screen px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur">
          <Link href="/" className="text-sm font-black text-slate-950">SellerOS Lite</Link>
          <Link href="/generator" className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">Бесплатный аудит</Link>
        </nav>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Тарифы</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">Начните с одного аудита и масштабируйте, если результат полезен</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">MVP работает через ручную оплату переводом. После подтверждения платежа полный результат отправляется на email покупателя.</p>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className={`rounded-3xl border p-6 shadow-soft ${plan.featured ? 'border-blue-200 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-950'}`}>
              <h2 className="text-2xl font-black">{plan.name}</h2>
              <p className={`mt-3 text-sm leading-6 ${plan.featured ? 'text-blue-50' : 'text-slate-600'}`}>{plan.description}</p>
              <p className="mt-6 text-4xl font-black">{plan.price}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className={`rounded-2xl p-3 text-sm font-semibold ${plan.featured ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-700'}`}>✓ {feature}</li>
                ))}
              </ul>
              <Link href="/pay" className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-4 text-sm font-black transition ${plan.featured ? 'bg-white text-blue-700 hover:bg-blue-50' : 'bg-slate-950 text-white hover:bg-slate-800'}`}>
                Купить
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
