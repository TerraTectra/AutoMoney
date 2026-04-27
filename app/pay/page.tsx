import Link from 'next/link';
import ManualPayment from '@/components/ManualPayment';

export const metadata = {
  title: 'Оплата полного аудита карточки — SellerOS Lite',
  description:
    'Ручная оплата полного аудита карточки товара переводом по реквизитам. Покупатель получает ORDER-ID и отправляет письмо для проверки оплаты.'
};

export default function PayPage() {
  return (
    <main className="min-h-screen px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur">
          <Link href="/" className="text-sm font-black text-slate-950">
            SellerOS Lite
          </Link>
          <Link href="/generator" className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-900 transition hover:border-blue-300 hover:text-blue-700">
            Вернуться к аудиту
          </Link>
        </nav>
        <ManualPayment />
      </div>
    </main>
  );
}
