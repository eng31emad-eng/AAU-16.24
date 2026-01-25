import { notFound } from 'next/navigation';
import { campusLifeService } from '@/services/data/campuslife.service.mock';
import CampusLifeDetailsContent from '@/components/CampusLifeDetailsContent';
import { Metadata } from 'next';

export const revalidate = 86400; // 1 day

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const items = await campusLifeService.getAllItems();
    return items.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const item = await campusLifeService.getItemBySlug(slug);

    if (!item) {
        return {
            title: 'Item Not Found',
        };
    }

    return {
        title: `${item.titleEn} | Campus Life`,
        description: item.descriptionEn,
        openGraph: {
            title: `${item.titleEn} | Campus Life`,
            description: item.descriptionEn,
        },
    };
}

export default async function CampusLifeDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    const item = await campusLifeService.getItemBySlug(slug);

    if (!item) {
        return notFound();
    }

    const allItems = await campusLifeService.getAllItems();
    const relatedItems = allItems.filter(i => i.id !== item.id && i.category === item.category).slice(0, 2);

    return <CampusLifeDetailsContent item={item} relatedItems={relatedItems} />;
}
