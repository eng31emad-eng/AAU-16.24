import { NextResponse } from 'next/server';
import { getNewsList } from '@/services/server/news';
import { getEventsList } from '@/services/server/events';
import { getBlogList } from '@/services/server/blog';
import { getCollegesList } from '@/services/server/colleges';
import { getCentersList } from '@/services/server/centers';
import { getOffersList } from '@/services/server/offers';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';

    if (!query) {
        return NextResponse.json({ query: '', results: [] });
    }

    // Fetch all data in parallel
    const [news, events, blog, colleges, centers, offers] = await Promise.all([
        getNewsList(),
        getEventsList(),
        getBlogList(),
        getCollegesList(),
        getCentersList(),
        getOffersList()
    ]);

    const results = [];

    // Search News
    news.forEach(item => {
        if (item.titleAr.toLowerCase().includes(query) || item.titleEn.toLowerCase().includes(query)) {
            results.push({
                type: 'news',
                title: item.titleEn,
                href: `/news/${item.slug}`,
                snippet: item.descriptionEn,
                image: item.image
            });
        }
    });

    // Search Events
    events.forEach(item => {
        if (item.titleAr.toLowerCase().includes(query) || item.titleEn.toLowerCase().includes(query)) {
            results.push({
                type: 'event',
                title: item.titleEn,
                href: `/events/${item.slug}`,
                snippet: item.descriptionEn,
                image: item.image
            });
        }
    });

    // Search Blog
    blog.forEach(item => {
        if (item.title.en.toLowerCase().includes(query) || item.title.ar.includes(query) || item.excerpt.en.toLowerCase().includes(query) || item.excerpt.ar.includes(query)) {
            results.push({
                type: 'blog',
                title: item.title.en,
                href: `/blog/${item.id}`,
                snippet: item.excerpt.en,
                image: item.image
            });
        }
    });

    // Search Colleges
    colleges.forEach(item => {
        if (item.nameAr.toLowerCase().includes(query) || item.nameEn.toLowerCase().includes(query)) {
            results.push({
                type: 'college',
                title: item.nameEn,
                href: `/colleges/${item.id}`,
                snippet: item.descriptionEn,
                image: item.image
            });
        }
    });

    // Search Centers
    centers.forEach(item => {
        if (item.titleAr.includes(query) || item.titleEn.toLowerCase().includes(query)) {
            results.push({
                type: 'center',
                title: item.titleEn,
                href: `/centers/${item.id}`,
                snippet: item.descEn,
                image: undefined
            });
        }
    });

    // Search Offers
    offers.forEach(item => {
        if (item.titleAr.includes(query) || item.titleEn.toLowerCase().includes(query)) {
            results.push({
                type: 'offer',
                title: item.titleEn,
                href: `/offers#${item.id}`,
                snippet: item.descEn,
                image: item.image
            });
        }
    });

    return NextResponse.json({ query, results });
}
