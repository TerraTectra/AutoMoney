import Link from 'next/link';

type SeoToolPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  exampleTitle: string;
  exampleBody: string;
  cta?: string;
};

export default function SeoToolPage({
  eyebrow,
  title,
  description,
  bullets,
  exampleTitle,
  exampleBody,
  cta = 'Проверить карточку бесплатно'
}: SeoToolPageProps) {
  return (
    <main className="min-h-screen px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur">
          <Link href="/" className="text-sm font-black text-slate-950">
            SellerOS Lite
          </Link>
          <Link href="/generator" className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
            Открыть генератор
          </Link>
        </nav>

        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/generator" className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-base font-black text-white transition hover:bg-blue-700">
              {cta}
            </Link>
            <Link href="/pay" className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-4 text-base font-black text-slate-950 transition hover:border-blue-300 hover:text-blue-700">
              Купить полный аудит
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black text-slate-950">Что проверяем</h2>
            <ul className="mt-5 space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-600 p-6 text-white shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">Пример результата</p>
            <h2 className="mt-3 text-2xl font-black">{exampleTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-blue-50">{exampleBody}</p>
            <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-blue-50">
              Бесплатная версия показывает часть результата. Полный пакет за 490 ₽ включает SEO-ключи, варианты названий, УТП, ответы на отзывы и чек-лист улучшений.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
