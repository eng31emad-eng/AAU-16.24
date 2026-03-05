import { campusLifeService } from '@/services/data/campuslife.service.mock';
import CampusLifePageContent from '@/components/CampusLifePageContent';
import { Metadata } from 'next';

// ISR Revalidation (1 day)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'الحياة الجامعية | Campus Life',
  description: 'استكشف الحياة الجامعية النابضة بالحيوية والمرافق الحديثة - Explore vibrant campus life and modern facilities',
};

export default async function CampusLifePage() {
  const items = await campusLifeService.getAllItems();

  return (
    <CampusLifePageContent initialItems={items} />
  );
}
