import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SellerOS Lite — аудит карточки товара для маркетплейсов',
  description:
    'Проверьте карточку товара для Ozon, Wildberries и Яндекс Маркета: заголовок, описание, УТП, SEO-ключи и ответы на отзывы.',
  keywords: [
    'аудит карточки товара',
    'генератор описания товара',
    'Ozon',
    'Wildberries',
    'Яндекс Маркет',
    'SEO карточки товара',
    'ответы на отзывы'
  ],
  openGraph: {
    title: 'SellerOS Lite — аудит карточки товара',
    description: 'Бесплатная проверка карточки товара и платный полный пакет улучшений для селлеров маркетплейсов.',
    type: 'website',
    locale: 'ru_RU'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
