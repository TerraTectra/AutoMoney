import Link from 'next/link';

const deliverables = [
  'Полная оценка карточки товара по структуре и содержанию',
  '5 вариантов названия карточки под маркетплейсы',
  'Расширенное описание товара через выгоды и сценарии применения',
  'SEO-ключи и подсказки по естественному добавлению в текст',
  '10 УТП и преимуществ для блока описания или инфографики',
  'Ответы на негативные отзывы и частые возражения покупателей',
  'Чек-лист улучшений карточки перед публикацией или обновлением'
];

export const metadata = {
  title: 'Выдача результата — SellerOS Lite',
  description: 'Как покупатель получает полный аудит карточки товара после подтверждения ручной оплаты.'
};

export default function DownloadPage() {
  return (
    <main className="min-h-screen px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur">
          <Link href="/" className="text-sm font-black text-slate-950">SellerOS Lite</Link>
          <Link href="/generator" className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">Новый аудит</Link>
        </nav>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Выдача результата</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">После подтверждения оплаты результат отправляется на email</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Эта страница описывает пост-оплатный процесс MVP. Пока нет платёжной системы, доступ выдаётся вручную после проверки фактического поступления перевода.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <h2 className="text-2xl font-black text-slate-950">Что входит в письмо</h2>
            <ul className="mt-5 space-y-3">
              {deliverables.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">✓ {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-600 p-6 text-white shadow-soft sm:p-8">
            <h2 className="text-2xl font-black">Процесс выдачи</h2>
            <ol className="mt-5 space-y-4 text-sm leading-6 text-blue-50">
              <li className="rounded-2xl bg-white/10 p-4">1. Покупатель оплачивает заказ переводом и отправляет письмо с ORDER-ID.</li>
              <li className="rounded-2xl bg-white/10 p-4">2. Заказ попадает в Gmail с темой `[AutoMoney Order]`.</li>
              <li className="rounded-2xl bg-white/10 p-4">3. Владелец проверяет поступление денег и подтверждает оплату.</li>
              <li className="rounded-2xl bg-white/10 p-4">4. После подтверждения покупатель получает полный результат на email.</li>
            </ol>
            <Link href="/pay" className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-4 text-sm font-black text-blue-700 transition hover:bg-blue-50">
              Перейти к оплате
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
