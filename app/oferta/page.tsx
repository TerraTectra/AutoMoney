import Link from 'next/link';

export const metadata = {
  title: 'Публичная оферта — SellerOS Lite',
  description: 'Шаблон публичной оферты для MVP SellerOS Lite. Перед запуском замените placeholder-данные на реальные.'
};

const sections = [
  {
    title: '1. Общие положения',
    text:
      'Настоящая страница является шаблоном публичной оферты для MVP-сервиса SellerOS Lite. Перед коммерческим запуском владелец сервиса должен заменить placeholder-данные на реальные реквизиты и при необходимости проверить текст с юристом.'
  },
  {
    title: '2. Предмет услуги',
    text:
      'Сервис предоставляет информационный аудит карточки товара для маркетплейсов, включая рекомендации по заголовку, описанию, SEO-ключам, УТП, ответам на отзывы и чек-листу улучшений.'
  },
  {
    title: '3. Порядок оплаты',
    text:
      'В MVP-режиме оплата принимается переводом по реквизитам, указанным на странице оплаты. Покупатель обязан указать уникальный номер заказа в комментарии к переводу. Доступ или результат выдаётся после подтверждения фактического поступления платежа.'
  },
  {
    title: '4. Порядок оказания услуги',
    text:
      'После подтверждения оплаты результат отправляется на email, указанный покупателем при оформлении заказа. Срок выдачи результата и формат материалов могут уточняться на странице оплаты или в письме заказа.'
  },
  {
    title: '5. Ограничения результата',
    text:
      'Рекомендации сервиса носят информационный характер. Сервис не гарантирует рост продаж, изменение ранжирования на маркетплейсе или прохождение модерации карточки товара.'
  },
  {
    title: '6. Возвраты',
    text:
      'Условия возврата должны быть дополнены владельцем сервиса перед запуском. В MVP-режиме спорные ситуации рассматриваются через email поддержки.'
  },
  {
    title: '7. Контакты',
    text:
      'Email поддержки и данные владельца сервиса указываются на странице контактов и в переменных окружения проекта.'
  }
];

export default function OfertaPage() {
  return (
    <main className="min-h-screen px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur">
          <Link href="/" className="text-sm font-black text-slate-950">SellerOS Lite</Link>
          <Link href="/pay" className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">Купить аудит</Link>
        </nav>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Документы</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">Публичная оферта</h1>
          <p className="mt-5 text-sm leading-7 text-slate-600">Шаблон для MVP. Перед запуском замените placeholder-данные на реальные и проверьте условия под выбранный формат приёма оплаты.</p>
        </section>

        <section className="mt-8 space-y-4">
          {sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-black text-slate-950">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{section.text}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
