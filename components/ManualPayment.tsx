'use client';

import { useMemo, useState } from 'react';

function createOrderId() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ORDER-${stamp}-${random}`;
}

function envValue(value: string | undefined, fallback: string) {
  return value && value.trim().length > 0 ? value : fallback;
}

export default function ManualPayment() {
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [orderId] = useState(createOrderId);

  const supportEmail = envValue(process.env.NEXT_PUBLIC_SUPPORT_EMAIL, 'orders@example.com');
  const productName = envValue(process.env.NEXT_PUBLIC_PRODUCT_NAME, 'Полный аудит карточки товара');
  const price = envValue(process.env.NEXT_PUBLIC_PRODUCT_PRICE, '490');
  const recipient = envValue(process.env.NEXT_PUBLIC_PAYMENT_RECIPIENT, 'Реквизиты будут указаны перед запуском');
  const bank = envValue(process.env.NEXT_PUBLIC_PAYMENT_BANK, 'Банк будет указан перед запуском');
  const phone = envValue(process.env.NEXT_PUBLIC_PAYMENT_PHONE, 'Телефон СБП будет указан перед запуском');
  const card = envValue(process.env.NEXT_PUBLIC_PAYMENT_CARD, 'Карта или счёт будут указаны перед запуском');
  const note = envValue(
    process.env.NEXT_PUBLIC_PAYMENT_NOTE,
    'Доступ выдаётся после подтверждения фактического поступления платежа.'
  );

  const mailto = useMemo(() => {
    const subject = `[AutoMoney Order] ${orderId} — проверить оплату`;
    const body = [
      'Здравствуйте!',
      '',
      'Я оплатил(а) заказ. Проверьте, пожалуйста, поступление платежа.',
      '',
      `Заказ: ${orderId}`,
      `Товар: ${productName}`,
      `Сумма: ${price} ₽`,
      `Email покупателя: ${buyerEmail || 'не указан'}`,
      `Имя покупателя: ${buyerName || 'не указано'}`,
      '',
      `Комментарий к переводу: ${orderId}`,
      '',
      'Можно приложить скриншот перевода, но доступ выдаётся только после фактического поступления платежа.',
      '',
      'Спасибо!'
    ].join('\n');

    return `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [buyerEmail, buyerName, orderId, price, productName, supportEmail]);

  const canSend = buyerEmail.includes('@') && buyerEmail.includes('.');

  return (
    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Ручная оплата</p>
        <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Купить полный аудит карточки</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          До подключения платёжной системы заказ оплачивается переводом. После отправки письма я попрошу владельца проверить поступление и после подтверждения отправлю результат на email.
        </p>

        <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white">
          <p className="text-sm font-semibold text-blue-200">Ваш номер заказа</p>
          <p className="mt-2 break-all text-2xl font-black">{orderId}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">Укажите этот номер в комментарии к переводу.</p>
        </div>

        <div className="mt-7 space-y-4">
          <label className="block">
            <span className="text-sm font-bold text-slate-900">Ваш email для получения результата</span>
            <input
              value={buyerEmail}
              onChange={(event) => setBuyerEmail(event.target.value)}
              placeholder="name@example.com"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-slate-900">Имя или название магазина</span>
            <input
              value={buyerName}
              onChange={(event) => setBuyerName(event.target.value)}
              placeholder="Например: Магазин товаров для дома"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">Реквизиты для перевода</h2>
          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Сумма</p>
              <p className="mt-1 text-lg font-black text-slate-950">{price} ₽</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Получатель</p>
              <p className="mt-1 break-words text-base font-bold text-slate-950">{recipient}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Банк</p>
              <p className="mt-1 break-words text-base font-bold text-slate-950">{bank}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">СБП / телефон</p>
              <p className="mt-1 break-words text-base font-bold text-slate-950">{phone}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Карта / счёт</p>
              <p className="mt-1 break-words text-base font-bold text-slate-950">{card}</p>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Комментарий</p>
              <p className="mt-1 break-all text-base font-black text-blue-900">{orderId}</p>
            </div>
          </div>

          <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">{note}</p>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-blue-600 p-6 text-white shadow-soft sm:p-8">
          <h2 className="text-2xl font-black">После перевода</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-blue-50">
            <li>1. Переведите {price} ₽ по реквизитам выше.</li>
            <li>2. Укажите комментарий: {orderId}</li>
            <li>3. Нажмите кнопку ниже и отправьте готовое письмо.</li>
          </ol>
          <a
            href={mailto}
            aria-disabled={!canSend}
            className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-4 text-sm font-black transition ${
              canSend ? 'bg-white text-blue-700 hover:bg-blue-50' : 'pointer-events-none bg-blue-300 text-white/70'
            }`}
          >
            Я оплатил — отправить письмо
          </a>
          {!canSend ? <p className="mt-3 text-xs text-blue-100">Введите email, чтобы активировать письмо заказа.</p> : null}
        </div>
      </div>
    </section>
  );
}
