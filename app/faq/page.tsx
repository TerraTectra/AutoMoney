import Link from 'next/link';

const faqs = [
  {
    question: 'Как работает бесплатный аудит?',
    answer:
      'Вы вставляете данные карточки товара, а сервис показывает оценку, главные проблемы, пример улучшенного заголовка, короткое описание и часть SEO-ключей.'
  },
  {
    question: 'Что входит в полный аудит?',
    answer:
      'Полный аудит включает несколько вариантов названия, расширенное описание, SEO-ключи, УТП, ответы на отзывы, чек-лист улучшений и текстовый экспорт для работы с карточкой.'
  },
  {
    question: 'Почему оплата переводом?',
    answer:
      'Это MVP-режим до подключения платёжной системы. Каждый заказ получает уникальный ORDER-ID, который нужно указать в комментарии к переводу.'
  },
  {
    question: 'Скриншот оплаты подходит?',
    answer:
      'Скриншот можно приложить к письму, но доступ выдаётся только после фактического поступления платежа и подтверждения владельцем.'
  },
  {
    question: 'Как я получу результат?',
    answer:
      'После подтверждения оплаты результат отправляется на email, который вы указали при создании заказа.'
  },
  {
    question: 'Нужно ли давать доступ к кабинету маркетплейса?',
    answer:
      'Нет. В MVP ничего подключать не нужно. Вы просто вставляете текст карточки, характеристики и отзывы вручную.'
  }
];

export const metadata = {
  title: 'FAQ SellerOS Lite — вопросы по аудиту карточек и оплате',
  description: 'Ответы на вопросы о бесплатном аудите, полном пакете, ручной оплате и получении результата.'
};

export default function FaqPage() {
  return (
    <main className="min-h-screen px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur">
          <Link href="/" className="text-sm font-black text-slate-950">SellerOS Lite</Link>
          <Link href="/pay" className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">Купить аудит</Link>
        </nav>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">FAQ</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">Вопросы по аудиту карточек и ручной оплате</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Коротко о том, как работает MVP, что получает покупатель и как подтверждается оплата переводом.</p>
        </section>

        <section className="mt-8 space-y-4">
          {faqs.map((item) => (
            <article key={item.question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-black text-slate-950">{item.question}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
