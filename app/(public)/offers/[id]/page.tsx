import { offersService } from '@/services/data/offers.service.mock';
import OfferDetailsContent from '@/components/OfferDetailsContent';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const offer = await offersService.getById(id);

    if (!offer) {
        return {
            title: 'العرض غير موجود | Offer Not Found',
        };
    }

    return {
        title: `${offer.titleAr} | ${offer.titleEn}`,
        description: `${offer.descAr} - ${offer.descEn}`,
    };
}

export default async function OfferDetailsPage({ params }: Props) {
    const { id } = await params;
    const offer = await offersService.getById(id);

    if (!offer) {
        notFound();
    }

    return <OfferDetailsContent offer={offer} />;
}

