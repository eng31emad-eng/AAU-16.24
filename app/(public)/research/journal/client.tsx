'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { researchService, ResearchJournal } from '@/services/data/research.service.mock';
import { Button } from '@/components/ui/button';
import {
    FileText, Download, BookOpen, ChevronRight, Info, CheckCircle,
    MessageSquare, Globe, ArrowDownToLine, Calendar, Archive, FileType
} from 'lucide-react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function JournalClient() {
    const { t, language } = useLanguage();
    const [journals, setJournals] = useState<ResearchJournal[]>([]);
    const [loading, setLoading] = useState(true);
    const [showGuidelines, setShowGuidelines] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState<ResearchJournal | null>(null);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const data = await researchService.getAllJournals();
                setJournals(data || []);
            } catch (error) {
                console.error("Error fetching journals:", error);
                setJournals([]);
            } finally {
                setLoading(false);
            }
        };
        fetchJournals();
    }, []);

    const handleDownload = (title: string, format: 'PDF' | 'Word') => {
        toast.success(t(`بدأ تحميل ${title} بصيغة ${format}...`, `Starting download for ${title} as ${format}...`), {
            description: t('يرجى التحقق من مجلد التنزيلات في جهازك، سيفتح الملف تلقائياً إذا كان المتصفح يدعم ذلك.', 'Please check your device downloads folder. The file will open automatically if your browser supports it.'),
            icon: format === 'PDF' ? <FileType className="w-5 h-5 text-red-500" /> : <FileType className="w-5 h-5 text-blue-500" />
        });

        // محاكاة تقنية: فتح ملف تجريبي لإظهار "الطريقة" للمستخدم
        if (format === 'PDF') {
            setTimeout(() => {
                window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
            }, 1500);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 bg-gray-50/30">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop"
                        alt="Library"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        {t('المجلة العلمية لجامعة الجيل الجديد', 'NGU Scientific Journal')}
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        {t(
                            'منصة أكاديمية محكمة لنشر الأبحاث العلمية المتميزة في مختلف التخصصات',
                            'A peer-reviewed academic platform for publishing distinguished scientific research in various disciplines'
                        )}
                    </motion.p>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-20">
                {/* Featured Issue / Call to Action */}
                {journals.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 border border-secondary/10 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/3">
                            <div className="relative group cursor-pointer" onClick={() => setSelectedIssue(journals[0])}>
                                <img
                                    src={journals[0]?.image}
                                    alt="Latest Issue"
                                    className="w-full h-auto rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <BookOpen className="text-white w-12 h-12" />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 text-right">
                            <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-4">
                                {t('أحدث إصدار', 'Latest Issue')}
                            </span>
                            <h2 className="text-3xl font-bold text-primary mb-4">
                                {language === 'ar' ? journals[0]?.titleAr : journals[0]?.titleEn}
                            </h2>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                {language === 'ar' ? journals[0]?.descriptionAr : journals[0]?.descriptionEn}
                            </p>
                            <div className="flex flex-wrap gap-4 justify-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="bg-secondary hover:bg-secondary-dark text-primary font-bold px-8 py-6 rounded-xl flex gap-2">
                                            <Download className="w-5 h-5" />
                                            {t('تحميل المجلد كاملاً', 'Download Full Volume')}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 text-right">
                                        <DropdownMenuItem onClick={() => handleDownload(language === 'ar' ? journals[0].titleAr : journals[0].titleEn, 'PDF')} className="flex justify-between items-center">
                                            <span className="font-bold">PDF (الأصلي)</span>
                                            <FileText className="w-4 h-4 text-red-500" />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDownload(language === 'ar' ? journals[0].titleAr : journals[0].titleEn, 'Word')} className="flex justify-between items-center">
                                            <span className="font-bold">Word (قابل للتعديل)</span>
                                            <FileText className="w-4 h-4 text-blue-500" />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button
                                    onClick={() => setShowGuidelines(true)}
                                    variant="outline"
                                    className="border-secondary text-secondary hover:bg-secondary/10 font-bold px-8 py-6 rounded-xl flex gap-2"
                                >
                                    <Info className="w-5 h-5" />
                                    {t('تعليمات النشر', 'Author Guidelines')}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Previous Issues Grid */}
                <h3 className="text-2xl font-bold text-primary mb-8 border-r-4 border-secondary pr-4">
                    {t('الأعداد السابقة', 'Previous Issues')}
                </h3>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {journals.map((journal) => (
                        <motion.div
                            key={journal.id}
                            variants={cardVariants}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all duration-300 flex flex-col"
                        >
                            <div className="h-64 overflow-hidden relative cursor-pointer" onClick={() => setSelectedIssue(journal)}>
                                <img
                                    src={journal.image}
                                    alt={journal.titleEn}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-primary shadow-sm">
                                    {language === 'ar' ? journal.dateAr : journal.dateEn}
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-secondary text-xs font-bold mb-2">
                                    {t('مجلد', 'Vol')}: {journal.volume} / {t('عدد', 'Issue')}: {journal.issue}
                                </div>
                                <h4 className="text-lg font-bold text-primary mb-4 line-clamp-2">
                                    {language === 'ar' ? journal.titleAr : journal.titleEn}
                                </h4>
                                <div className="mt-auto pt-4 flex gap-2">
                                    <Button
                                        onClick={() => setSelectedIssue(journal)}
                                        variant="ghost"
                                        className="flex-1 border border-gray-100 hover:bg-secondary/5 text-secondary font-bold text-xs"
                                    >
                                        {t('تصفح', 'Browse')}
                                    </Button>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="border-gray-200 text-gray-400 hover:text-secondary hover:border-secondary"
                                            >
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 text-right">
                                            <DropdownMenuItem onClick={() => handleDownload(language === 'ar' ? journal.titleAr : journal.titleEn, 'PDF')} className="flex justify-between items-center">
                                                <span className="text-xs font-bold">PDF</span>
                                                <FileText className="w-3.5 h-3.5 text-red-500" />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDownload(language === 'ar' ? journal.titleAr : journal.titleEn, 'Word')} className="flex justify-between items-center">
                                                <span className="text-xs font-bold">Word</span>
                                                <FileText className="w-3.5 h-3.5 text-blue-500" />
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Guidelines Modal */}
            <Dialog open={showGuidelines} onOpenChange={setShowGuidelines}>
                <DialogContent className="max-w-2xl text-right" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                            <FileText className="text-secondary w-6 h-6" />
                            {t('تعليمات النشر للباحثين', 'Author Guidelines')}
                        </DialogTitle>
                        <DialogDescription className="text-right">
                            {t('يرجى اتباع المعايير التالية لضمان قبول البحث للنشر في المجلة.', 'Please follow these criteria to ensure your research is accepted for publication.')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 my-6 overflow-y-auto max-h-[60vh] px-2">
                        {[
                            {
                                titleAr: 'الأصالة العلمية', titleEn: 'Scientific Originality',
                                descAr: 'يجب أن يكون البحث أصيلاً ولم يسبق نشره في أي مجلة أخرى.',
                                descEn: 'Research must be original and not previously published in any other journal.'
                            },
                            {
                                titleAr: 'التنسيق الأكاديمي', titleEn: 'Academic Formatting',
                                descAr: 'يجب اتباع نظام APA في التوثيق والمراجع، واستخدام خط Simplified Arabic مقاس 12.',
                                descEn: 'APA style must be followed for citations and references, using Simplified Arabic font size 12.'
                            },
                            {
                                titleAr: 'لغة البحث', titleEn: 'Language',
                                descAr: 'تقبل المجلة الأبحاث باللغتين العربية والإنجليزية مع ملخص باللغتين.',
                                descEn: 'The journal accepts research in both Arabic and English with abstracts in both languages.'
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-secondary" />
                                    {language === 'ar' ? item.titleAr : item.titleEn}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {language === 'ar' ? item.descAr : item.descEn}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-start pt-4 border-t">
                        <Button onClick={() => setShowGuidelines(false)} className="bg-primary text-white">
                            {t('فهمت ذلك', 'I Understand')}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Issue Preview Modal */}
            <Dialog open={!!selectedIssue} onOpenChange={(open) => !open && setSelectedIssue(null)}>
                <DialogContent className="max-w-3xl text-right p-0 overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    <div className="flex flex-col md:flex-row h-full">
                        <div className="w-full md:w-2/5 bg-primary/5 p-8 flex items-center justify-center border-l">
                            <img
                                src={selectedIssue?.image}
                                alt="Issue Cover"
                                className="w-full max-w-[240px] shadow-2xl rounded-lg"
                            />
                        </div>
                        <div className="flex-1 p-8">
                            <DialogHeader>
                                <span className="text-secondary text-xs font-bold mb-2 block">
                                    {t('تصفح العدد', 'View Issue')} • {language === 'ar' ? selectedIssue?.dateAr : selectedIssue?.dateEn}
                                </span>
                                <DialogTitle className="text-2xl font-bold text-primary mb-4 leading-tight">
                                    {language === 'ar' ? selectedIssue?.titleAr : selectedIssue?.titleEn}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-6 my-6 text-sm text-muted-foreground leading-relaxed">
                                <p>
                                    {language === 'ar' ? selectedIssue?.descriptionAr : selectedIssue?.descriptionEn}
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="text-primary font-bold mb-1">{t('8 أبحاث', '8 Researches')}</div>
                                        <div className="text-[10px]">{t('في هذا العدد', 'In this issue')}</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="text-primary font-bold mb-1">{t('120 صفحة', '120 Pages')}</div>
                                        <div className="text-[10px]">{t('إجمالي المحتوى', 'Total Content')}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 justify-end mt-8">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                                            <Download className="w-4 h-4" />
                                            {t('تحميل الآن', 'Download Now')}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 text-right">
                                        <DropdownMenuItem onClick={() => handleDownload(selectedIssue ? (language === 'ar' ? selectedIssue.titleAr : selectedIssue.titleEn) : '', 'PDF')} className="flex justify-between items-center text-sm">
                                            <span>PDF Version</span>
                                            <FileType className="w-4 h-4 text-red-500" />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDownload(selectedIssue ? (language === 'ar' ? selectedIssue.titleAr : selectedIssue.titleEn) : '', 'Word')} className="flex justify-between items-center text-sm">
                                            <span>Word Version</span>
                                            <FileType className="w-4 h-4 text-blue-500" />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button variant="outline" onClick={() => setSelectedIssue(null)}>
                                    {t('إغلاق', 'Close')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
