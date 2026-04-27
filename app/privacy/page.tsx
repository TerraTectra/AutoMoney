import Link from 'next/link';

export const metadata = {
  title: 'Политика конфиденциальности — SellerOS Lite',
  description: 'Шаблон политики конфиденциальности для MVP SellerOS Lite. Перед запуском замените placeholder-данные на реальные.'
};

const sections = [
  {
    title: '1. Какие данные обрабатываются',
    text:
      'В MVP-режиме сервис может получать email покупателя, имя или название магазина, номер заказа, данные карточки товара, текст описания, характеристики и отзывы, которые пользователь самостоятельно вводит в форму.'
  },
  {
    title: '2. Зачем нужны данные',
    text:
      'Данные используются для генерации аудита карточки товара, оформления заказа, проверки ручной оплаты, отправки результата на email и ответа на обращения в поддержку.'
  },
  {
    title: '3. Платёжные данные',
    text:
      'Сервис не запрашивает данные банковских карт. В MVP-режиме оплата производится переводом по реквизитам. Факт поступления оплаты подтверждается владельцем сервиса вручную.'
  },
  {
    title: '4. Хранение и передача данных',
    text:
      'Письма по заказам могут храниться в почтовом ящике поддержки. Передача данных третьим лицам не осуществляется, кроме случаев, необходимых для обработки заказа, работы почты или требований законодательства.'
  },
  {
    title: '5. Данные карточек товара',
    text:
      'Пользователь не должен передавать через форму конфиденциальные сведения, коммерческие тайны, персональные данные покупателей или доступы к кабинетам маркетплейсов.'
  },
  {
    title: '6. Запрос на удаление',
    text:
      'Пользователь может обратиться на email поддержки и запросить удаление переписки или данных заказа, если это не противоречит обязательным требованиям учёта и законодательства.'
  },
  {
    title: '7. Важное замечание',
    text:
      'Эта страница является шаблоном для MVP. Перед коммерческим запуском владелец сервиса должен заменить placeholder-данные на реальные и проверить текст под выбранный юридический формат.'
  }
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur">
          <Link href="/" className="text-sm font-black text-slate-950">SellerOS Lite</Link>
          <Link href="/faq" className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-900 transition hover:border-blue-300 hover:text-blue-700">FAQ</Link>
        </nav>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Документы</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">Политика конфиденциальности</h1>
          <p className="mt-5 text-sm leading-7 text-slate-600">Шаблон для MVP. Перед запуском замените placeholder-данные на реальные и проверьте условия обработки данных.</p>
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
