'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    GraduationCap, Globe, Calendar, BookOpen,
    ExternalLink, ArrowRight, ArrowLeft, MousePointerClick
} from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';

export default function LinksPage() {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';
    const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

    const importantLinks = [
        {
            id: 'results',
            titleAr: 'بوابة نتائج الطلاب',
            titleEn: 'Student Results Portal',
            descAr: 'الوصول المباشر إلى نتائج الامتحانات الفصلية والسنوية عبر البوابة الإلكترونية.',
            descEn: 'Direct access to semester and annual exam results through the online portal.',
            icon: GraduationCap,
            href: 'https://results.ngu.edu.ye',
            color: 'bg-emerald-500/10 text-emerald-600',
            btnTextAr: 'دخول البوابة',
            btnTextEn: 'Enter Portal'
        },
        {
            id: 'website',
            titleAr: 'موقع الجامعة (النسخة القديمة)',
            titleEn: 'NGU Website (Legacy)',
            descAr: 'زيارة الموقع الإلكتروني السابق للجامعة للوصول إلى الأرشيف والمعلومات القديمة.',
            descEn: 'Visit the previous university website for archives and legacy information.',
            icon: Globe,
            href: 'https://ngu.edu.ye',
            color: 'bg-blue-500/10 text-blue-600',
            btnTextAr: 'زيارة الموقع',
            btnTextEn: 'Visit Website'
        },
        {
            id: 'schedule',
            titleAr: 'الجداول الدراسية',
            titleEn: 'Academic Schedules',
            descAr: 'الاطلاع على الجداول الدراسية الأسبوعية والمواعيد الأكاديمية لكل فصل.',
            descEn: 'View weekly academic schedules and academic dates for each semester.',
            icon: Calendar,
            href: 'https://external-link-placeholder.com/schedule',
            color: 'bg-amber-500/10 text-amber-600',
            btnTextAr: 'عرض الجداول',
            btnTextEn: 'View Schedules'
        },
        {
            id: 'library',
            titleAr: 'المكتبة الرقمية',
            titleEn: 'Digital Library',
            descAr: 'الوصول إلى المصادر العلمية والكتب الإلكترونية والأبحاث العالمية.',
            descEn: 'Access scientific resources, e-books, and global research databases.',
            icon: BookOpen,
            href: 'https://external-link-placeholder.com/library',
            color: 'bg-purple-500/10 text-purple-600',
            btnTextAr: 'دخول المكتبة',
            btnTextEn: 'Enter Library'
        }
    ];

    const breadcrumbItems = [
        { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
        { label: { ar: 'روابط هامة', en: 'Important Links' } }
    ];

    return (
        <div className={`min-h-screen bg-background flex flex-col ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-16 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

                    <div className="container mx-auto px-4 relative z-10">
                        <Breadcrumb items={breadcrumbItems} />

                        <div className="max-w-3xl mx-auto text-center mt-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6 border border-secondary/20"
                            >
                                <MousePointerClick className="w-4 h-4" />
                                {t('خدمات الطلاب الرقمية', 'Digital Student Services')}
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-4xl md:text-6xl font-bold text-primary mb-6"
                            >
                                {t('روابط تهم الطالب', 'Important Links for Students')}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-xl text-muted-foreground leading-relaxed"
                            >
                                {t(
                                    'نسهل عليك الوصول إلى كافة المنصات والخدمات الجامعية في مكان واحد وبطريقة سريعة ومنظمة.',
                                    'We make it easy for you to access all university platforms and services in one place, quickly and organized.'
                                )}
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 -mt-10">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {importantLinks.map((link, idx) => (
                                <motion.div
                                    key={link.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                >
                                    <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-none bg-white/40 backdrop-blur-md shadow-xl overflow-hidden flex flex-col border border-white/20">
                                        <CardContent className="p-8 flex-1 flex flex-col">
                                            <div className="flex items-start justify-between mb-6">
                                                <div className={`p-4 rounded-2xl ${link.color} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm`}>
                                                    <link.icon className="w-8 h-8" />
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <ExternalLink className="w-5 h-5 text-muted-foreground/30" />
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                                                {language === 'ar' ? link.titleAr : link.titleEn}
                                            </h3>

                                            <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                                                {language === 'ar' ? link.descAr : link.descEn}
                                            </p>

                                            <div className="mt-auto">
                                                <Button
                                                    onClick={() => window.open(link.href, '_blank')}
                                                    className="w-full bg-primary hover:bg-secondary text-white hover:text-primary font-bold py-6 rounded-xl gap-2 transition-all duration-300 shadow-lg hover:shadow-secondary/20"
                                                >
                                                    {t(link.btnTextAr, link.btnTextEn)}
                                                    <ArrowIcon className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Note Card */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="max-w-5xl mx-auto mt-16 p-8 rounded-3xl bg-secondary/5 border border-secondary/10 text-center"
                        >
                            <p className="text-sm text-secondary font-medium">
                                {t(
                                    '* جميع الروابط أعلاه توجهك إلى منصات رسمية تابعة لجامعة الجيل الجديد.',
                                    '* All the links above direct you to official platforms belonging to Al-Jeel Al-Jadeed University.'
                                )}
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>
        </div>
    );
}
