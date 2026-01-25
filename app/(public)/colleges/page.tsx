import { collegesService } from '@/services/data/colleges.service.mock';
import CollegesPageContent from '@/components/CollegesPageContent';
import { Metadata } from 'next';

// ISR Revalidation (1 day)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'كلياتنا | Our Colleges',
  description: 'تعرف على كليات وبرامج جامعة الجيل الجديد - Discover Al-Jeel Al-Jadeed University Colleges and Programs',
};

export default async function CollegesPage() {
  const colleges = await collegesService.getAllColleges();

  return (
    <CollegesPageContent initialColleges={colleges} />
  );
}





