'use client';

import { useMemo, useState } from 'react';
import { AuditInput, Marketplace, generateAudit } from '@/lib/audit';
import Link from 'next/link';

const marketplaces: Marketplace[] = ['Ozon', 'Wildberries', 'Яндекс Маркет', 'Универсально'];

const initialInput: AuditInput = {
  marketplace: 'Универсально',
  productName: '',
  category: '',
  audience: '',
  description: '',
  features: '',
  reviews: ''
};

function Field({
  label,
  hint,
  children
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-900">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-5 text-slate-500">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export default function AuditGenerator() {
  const [input, setInput] = useState<AuditInput>(initialInput);
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => generateAudit(input), [input]);

  const canSubmit = input.productName.trim().length > 2 || input.description.trim().length > 15;

  const update = <K extends keyof AuditInput>(key: K, value: AuditInput[K]) => {
    setInput((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Бесплатный аудит</p>
          <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Проверьте карточку товара</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Вставьте данные карточки. Бесплатная версия покажет оценку, главные ошибки и часть готовых исправлений.
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <Field label="Маркетплейс">
            <select
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={input.marketplace}
              onChange={(event) => update('marketplace', event.target.value as Marketplace)}
            >
              {marketplaces.map((marketplace) => (
                <option key={marketplace} value={marketplace}>
                  {marketplace}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Текущее название товара" hint="Например: Органайзер для косметики пластиковый прозрачный">
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={input.productName}
              onChange={(event) => update('productName', event.target.value)}
              placeholder="Название товара"
            />
          </Field>

          <Field label="Категория" hint="Коротко: рюкзак, органайзер, лампа, детская бутылка">
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={input.category}
              onChange={(event) => update('category', event.target.value)}
              placeholder="Категория товара"
            />
          </Field>

          <Field label="Целевая аудитория" hint="Для кого товар: мамы, студенты, владельцы авто, мастера маникюра">
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={input.audience}
              onChange={(event) => update('audience', event.target.value)}
              placeholder="Кому нужен товар"
            />
          </Field>

          <Field label="Описание карточки" hint="Можно вставить текущее описание или написать как есть.">
            <textarea
              className="min-h-32 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={input.description}
              onChange={(event) => update('description', event.target.value)}
              placeholder="Описание товара"
            />
          </Field>

          <Field label="Характеристики" hint="Материал, размер, комплектация, цвет, гарантия, особенности">
            <textarea
              className="min-h-24 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={input.features}
              onChange={(event) => update('features', event.target.value)}
              placeholder="Характеристики через запятую"
            />
          </Field>

          <Field label="Отзывы или частые возражения" hint="Необязательно, но помогает сгенерировать ответы на негатив.">
            <textarea
              className="min-h-20 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={input.reviews}
              onChange={(event) => update('reviews', event.target.value)}
              placeholder="Что пишут покупатели или чего боятся перед покупкой"
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-7 w-full rounded-2xl bg-blue-600 px-5 py-4 text-base font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Получить аудит карточки
        </button>
      </form>

      <aside className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          {!submitted ? (
            <div className="flex min-h-96 flex-col justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Результат появится здесь</p>
              <h2 className="mt-3 text-2xl font-black text-slate-950">Заполните форму и нажмите “Получить аудит”</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Движок работает без внешнего AI API, поэтому MVP можно запустить сразу.</p>
            </div>
          ) : (
            <div>
              <div className="rounded-2xl bg-slate-950 p-6 text-white">
                <p className="text-sm font-semibold text-blue-200">Оценка карточки</p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="text-5xl font-black">{result.score}</span>
                  <span className="pb-2 text-lg font-bold text-slate-300">/ 100</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{result.level}</p>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="text-lg font-black text-slate-950">Главные проблемы</h3>
                  <ul className="mt-3 space-y-3">
                    {result.issues.slice(0, 3).map((issue) => (
                      <li key={issue} className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Новый заголовок</h3>
                  <p className="mt-3 text-base font-bold leading-7 text-slate-950">{result.improvedTitle}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Короткое описание</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{result.shortDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-950">Часть SEO-ключей</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.seoKeywords.slice(0, 8).map((keyword) => (
                      <span key={keyword} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-blue-100 bg-blue-600 p-6 text-white shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">Полный пакет</p>
          <h2 className="mt-2 text-2xl font-black">490 ₽ за расширенный разбор</h2>
          <p className="mt-3 text-sm leading-6 text-blue-50">
            Получите 5 вариантов названия, полное описание, 10 УТП, SEO-ядро, ответы на отзывы, чек-лист и текстовый экспорт.
          </p>
          <Link
            href="/pay"
            className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-4 text-sm font-black text-blue-700 transition hover:bg-blue-50"
          >
            Купить полный пакет
          </Link>
        </div>
      </aside>
    </section>
  );
}
