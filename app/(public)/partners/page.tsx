import { partnersService } from '@/services/data/partners.service.mock';
import PartnersPageContent from '@/components/PartnersPageContent';
import { Metadata } from 'next';

// ISR Revalidation (1 week)
export const revalidate = 604800;

export const metadata: Metadata = {
  title: 'شركاؤنا | Our Partners',
  description: 'شركاء جامعة الجيل الجديد من المؤسسات المحلية والدولية - Al-Jeel Al-Jadeed University Partners',
};

export default async function PartnersPage() {
  const partners = await partnersService.getAll();

  return (
    <PartnersPageContent initialPartners={partners} />
  );
}






