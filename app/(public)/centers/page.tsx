import { centersService } from '@/services/data/centers.service.mock';
import CentersPageContent from '@/components/CentersPageContent';
import { Metadata } from 'next';

// ISR Revalidation (1 day)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'مراكز الجامعة | University Centers',
  description: 'المراكز البحثية والتدريبية في جامعة الجيل الجديد - Al-Jeel Al-Jadeed University Research and Training Centers',
};

export default async function CentersPage() {
  const centers = await centersService.getAll();

  return (
    <CentersPageContent initialCenters={centers} />
  );
}






