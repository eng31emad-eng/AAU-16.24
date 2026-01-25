'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { CampusLifeItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface CampusLifeDetailsContentProps {
    item: CampusLifeItem;
    relatedItems: CampusLifeItem[];
}

export default function CampusLifeDetailsContent({ item, relatedItems }: CampusLifeDetailsContentProps) {
    const { t, language } = useLanguage();
    const router = useRouter();
    const isRTL = language === 'ar';

    const BackArrow = isRTL ? ArrowRight : ArrowLeft;

    // Get category translation
    const getCategoryLabel = (category: string) => {
        const labels: Record<string, { ar: string; en: string }> = {
            facilities: { ar: 'مرافق', en: 'Facilities' },
            activities: { ar: 'أنشطة', en: 'Activities' },
            campus: { ar: 'الحرم الجامعي', en: 'Campus' },
        };
        return labels[category] || { ar: category, en: category };
    };

    const categoryLabel = getCategoryLabel(item.category);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b">
                <div className="container mx-auto px-4 py-6">
                    {/* Breadcrumbs */}
                    <Breadcrumb
                        items={[
                            { label: { ar: 'الحياة الجامعية', en: 'Campus Life' }, href: '/campus-life' },
                            { label: { ar: item.titleAr, en: item.titleEn } }
                        ]}
                    />

                    {/* Back Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push('/campus-life')}
                        className="mt-4 bg-white dark:bg-white text-black hover:bg-[#F4E4B0] dark:hover:bg-[#F4E4B0] border-2 border-border gap-2 rounded-lg font-medium transition-colors"
                    >
                        <BackArrow className="w-4 h-4" />
                        {t('العودة إلى الحياة الجامعية', 'Back to Campus Life')}
                    </Button>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-4 mb-3">
                        {t(item.titleAr, item.titleEn)}
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        {t(item.descriptionAr, item.descriptionEn)}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar - معلومات الحياة الجامعية */}
                    <motion.aside
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-3 order-2 lg:order-1"
                    >
                        {/* Card with Golden Border */}
                        <div className="sticky top-24 border-[3px] border-[#C9A961] rounded-[2rem] overflow-hidden shadow-2xl bg-white dark:bg-card">
                            {/* Header */}
                            <div className="bg-white dark:bg-card p-6 text-center border-b border-border">
                                <h3 className="text-xl font-bold">
                                    {t('صور من الحياة الجامعية', 'Campus Life Photos')}
                                </h3>
                            </div>

                            {/* Content Area */}
                            <div className="bg-white dark:bg-card p-6 space-y-6">
                                {/* Stats Cards */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-muted/30 rounded-2xl p-6 text-center border border-border">
                                        <div className="text-4xl font-bold mb-2">+15</div>
                                        <div className="text-sm text-muted-foreground">
                                            {t('مرافق', 'Facilities')}
                                        </div>
                                    </div>
                                    <div className="bg-muted/30 rounded-2xl p-6 text-center border border-border">
                                        <div className="text-4xl font-bold mb-2">+10</div>
                                        <div className="text-sm text-muted-foreground">
                                            {t('أنشطة', 'Activities')}
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div className="space-y-3">
                                    <h4 className="text-base font-bold mb-3">
                                        {t('روابط سريعة', 'Quick Links')}
                                    </h4>
                                    <Link
                                        href="/campus-life"
                                        className="flex items-center gap-2 text-sm hover:text-primary transition-colors group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-foreground group-hover:bg-primary transition-colors"></div>
                                        {t('جميع المرافق', 'All Facilities')}
                                    </Link>
                                    <Link
                                        href="/campus-life"
                                        className="flex items-center gap-2 text-sm hover:text-primary transition-colors group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-foreground group-hover:bg-primary transition-colors"></div>
                                        {t('الأنشطة الطلابية', 'Student Activities')}
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="flex items-center gap-2 text-sm hover:text-primary transition-colors group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-foreground group-hover:bg-primary transition-colors"></div>
                                        {t('تواصل معنا', 'Contact Us')}
                                    </Link>
                                </div>
                            </div>

                            {/* Black Footer Button */}
                            <div className="bg-black dark:bg-black p-6">
                                <Button
                                    className="w-full bg-transparent hover:bg-white/10 text-white border-0 rounded-2xl font-bold py-6 transition-all"
                                    asChild
                                >
                                    <Link href="/campus-life">
                                        {t('عش التجربة الجامعية المتكاملة', 'Live the Complete University Experience')}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.aside>

                    {/* Main Content Area */}
                    <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-9 order-1 lg:order-2"
                    >
                        {/* Featured Image Placeholder */}
                        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-br from-muted/50 to-muted rounded-2xl mb-8 flex items-center justify-center overflow-hidden">
                            {/* Decorative circles */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    {/* Outer circle */}
                                    <div className="w-48 h-48 rounded-full border-2 border-muted-foreground/20"></div>
                                    {/* Lines radiating from center */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <div className="w-32 h-0.5 bg-muted-foreground/20 absolute top-0 left-1/2 -translate-x-1/2 rotate-0"></div>
                                        <div className="w-32 h-0.5 bg-muted-foreground/20 absolute top-0 left-1/2 -translate-x-1/2 rotate-45"></div>
                                        <div className="w-32 h-0.5 bg-muted-foreground/20 absolute top-0 left-1/2 -translate-x-1/2 rotate-90"></div>
                                        <div className="w-32 h-0.5 bg-muted-foreground/20 absolute top-0 left-1/2 -translate-x-1/2 rotate-[135deg]"></div>
                                    </div>
                                    {/* Inner circle with icon */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-card border rounded-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                                <h2 className="text-2xl font-bold">
                                    {t('عن هذه التجربة', 'About This Experience')}
                                </h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {t(item.contentAr, item.contentEn)}
                            </p>
                        </div>

                    </motion.main>
                </div>
            </div>
        </div>
    );
}
