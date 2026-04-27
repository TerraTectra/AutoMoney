import Link from 'next/link';

const tools = [
  'Аудит заголовка и описания',
  'SEO-ключи для карточки',
  'УТП и преимущества товара',
  'Ответы на негативные отзывы',
  'Чек-лист улучшения карточки',
  'Готовый текст для вставки на маркетплейс'
];

const seoPages = [
  ['Генератор названия товара', '/generator-nazvaniya-tovara'],
  ['Генератор описания для Ozon/WB', '/generator-opisaniya-tovara'],
  ['Ответ на негативный отзыв', '/otvet-na-negativnyy-otzyv'],
  ['SEO карточки товара', '/seo-kartochki-tovara']
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-10 sm:py-16">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">SellerOS Lite</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">Аудит карточки товара для маркетплейсов</h1>
          </div>
          <Link
            href="/generator"
            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Проверить карточку
          </Link>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              Для Ozon, Wildberries и Яндекс Маркета
            </div>
            <div className="space-y-5">
              <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">
                Вставьте карточку товара — получите готовые исправления для продаж
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Сервис проверяет заголовок, описание, характеристики и отзывы. Бесплатно даёт короткий разбор, а полный пакет включает SEO-ключи, УТП, тексты и чек-лист улучшений.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/generator"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-soft transition hover:bg-blue-700"
              >
                Сделать бесплатный аудит
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-4 text-base font-bold text-slate-900 transition hover:border-blue-300 hover:text-blue-700"
              >
                Посмотреть тарифы
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <p className="text-sm font-semibold text-blue-200">Пример результата</p>
              <h3 className="mt-3 text-2xl font-bold">Оценка карточки: 63/100</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-200">
                <li>• Заголовок слабый: нет главного ключа и выгоды.</li>
                <li>• Описание перечисляет характеристики, но не закрывает боли покупателя.</li>
                <li>• Не хватает УТП, сценариев применения и ответов на возражения.</li>
              </ul>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {tools.map((tool) => (
                <div key={tool} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">01</p>
            <h3 className="mt-3 text-xl font-bold">Вставьте данные товара</h3>
            <p className="mt-3 text-slate-600">Название, описание, характеристики, аудиторию, маркетплейс и отзывы.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">02</p>
            <h3 className="mt-3 text-xl font-bold">Получите бесплатный разбор</h3>
            <p className="mt-3 text-slate-600">Скоринг, главные ошибки, один вариант названия и короткое описание.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">03</p>
            <h3 className="mt-3 text-xl font-bold">Закажите полный пакет</h3>
            <p className="mt-3 text-slate-600">490 ₽ переводом по реквизитам. После подтверждения оплаты отправляем полный результат.</p>
          </div>
        </section>

        <section className="rounded-3xl border border-blue-100 bg-blue-600 p-8 text-white shadow-soft sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">MVP-оффер</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Полный аудит карточки за 490 ₽</h2>
              <p className="mt-4 max-w-2xl text-blue-50">
                На старте оплата идёт переводом по реквизитам. Заказ получает уникальный номер, после подтверждения перевода покупатель получает полный пакет на email.
              </p>
            </div>
            <Link
              href="/pay"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-base font-black text-blue-700 transition hover:bg-blue-50"
            >
              Купить полный пакет
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">SEO-входы для будущего трафика</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Вместо одного лендинга сайт будет расти как набор бесплатных инструментов под конкретные поисковые запросы селлеров.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {seoPages.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-700">
                {label}
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
