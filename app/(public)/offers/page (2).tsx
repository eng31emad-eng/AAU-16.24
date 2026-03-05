import { offersService } from '@/services/data/offers.service.mock';
import OffersPageContent from '@/components/OffersPageContent';
import { Metadata } from 'next';

// ISR Revalidation (1 hour)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'عروض الجامعة | University Offers',
  description: 'أحدث العروض والفرص المتاحة لطلاب جامعة الجيل الجديد - Latest Offers and Opportunities for Al-Jeel Al-Jadeed Students',
};

export default async function OffersPage() {
  const offers = await offersService.getAll();

  return (
    <OffersPageContent initialOffers={offers} />
  );
}






