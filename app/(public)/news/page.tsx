import { newsService } from '@/services/data/news.service.mock';
import NewsPageContent from '@/components/NewsPageContent';
import { Metadata } from 'next';

// ISR Revalidation (10 minutes)
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'الأخبار | News',
  description: 'آخر أخبار وإعلانات جامعة الجيل الجديد - Latest News and Announcements from Al-Jeel Al-Jadeed University',
};

export default async function NewsPage() {
  const news = await newsService.getAll();

  return (
    <NewsPageContent initialNews={news} />
  );
}


