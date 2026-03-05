import { facultyService } from '@/services/data/faculty.service.mock';
import FacultyPageContent from '@/components/FacultyPageContent';
import { Metadata } from 'next';

// ISR Revalidation (1 day)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'الكادر التعليمي | Faculty',
  description: 'نخبة من الأساتذة والدكاترة المتميزين في جامعة الجيل الجديد - Al-Jeel Al-Jadeed University Distinguished Faculty',
};

export default async function FacultyPage() {
  const members = await facultyService.getAllMembers();

  return (
    <FacultyPageContent initialMembers={members} />
  );
}
