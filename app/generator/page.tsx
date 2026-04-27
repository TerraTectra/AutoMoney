import Link from 'next/link';
import AuditGenerator from '@/components/AuditGenerator';

export const metadata = {
  title: 'Бесплатный аудит карточки товара — SellerOS Lite',
  description:
    'Проверьте карточку товара для Ozon, Wildberries и Яндекс Маркета. Получите оценку, ошибки, SEO-ключи и готовые улучшения.'
};

export default function GeneratorPage() {
  return (
    <main className="min-h-screen px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur">
          <Link href="/" className="text-sm font-black text-slate-950">
            SellerOS Lite
          </Link>
          <Link href="/pay" className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
            Купить полный пакет
          </Link>
        </nav>
        <AuditGenerator />
      </div>
    </main>
  );
}
