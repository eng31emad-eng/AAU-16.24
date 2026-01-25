'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Offer } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Award, Users, CheckCircle, Info } from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import Link from 'next/link';
import Image from 'next/image';

interface OfferDetailsContentProps {
    offer: Offer;
}

export default function OfferDetailsContent({ offer }: OfferDetailsContentProps) {
    const { t, language } = useLanguage();
    const router = useRouter();
    const isRTL = language === 'ar';

    return (
        <div className="min-h-screen bg-[#F5F5F5] dark:bg-background">
            {/* Header Section */}
            <div className="bg-white dark:bg-card border-b">
                <div className="container mx-auto px-4 py-6">
                    {/* Breadcrumb - FIXED: Only العروض > تفاصيل العرض (الرئيسية added automatically) */}
                    <Breadcrumb
                        items={[
                            { label: { ar: 'العروض', en: 'Offers' }, href: '/offers' },
                            { label: { ar: 'تفاصيل العرض', en: 'Offer Details' } },
                        ]}
                    />

                    {/* Back Button - EVEN SMALLER SIZE */}
                    <Button
                        onClick={() => router.push('/offers')}
                        className="mt-3 bg-[#D4AF37] hover:bg-[#C9A961] text-white gap-1.5 rounded-lg font-medium transition-colors px-4 py-1.5 text-xs"
                    >
                        {t('رجوع', 'Back')}
                        <ArrowRight className="w-3 h-3" />
                    </Button>

                    {/* Title and Info Row */}
                    <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        {/* Title Section */}
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                                {t(offer.titleAr, offer.titleEn)}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {t('ساري حتى', 'Valid until')}: {offer.validUntil || t('غير محدد', 'Not specified')}
                            </p>
                        </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-base text-muted-foreground mt-4 max-w-3xl leading-relaxed">
                        {t(offer.descAr, offer.descEn)}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Side - Image */}
                    <div className="lg:col-span-1 order-2 lg:order-1">
                        <div className="relative w-full h-[300px] lg:h-[400px] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-lg">
                            {offer.image && offer.image !== '/placeholder.svg' ? (
                                <Image
                                    src={offer.image}
                                    alt={t(offer.titleAr, offer.titleEn)}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="text-gray-400 text-6xl">📷</div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - NEW REDESIGNED INTEREST SECTION */}
                    <div className="lg:col-span-2 order-1 lg:order-2">
                        <div
                            className="rounded-3xl p-8 shadow-lg"
                            style={{
                                background: 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)'
                            }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                                {t('هل أنت مهتم بهذا العرض؟', 'Are you interested in this offer?')}
                            </h2>
                            <p className="text-white text-center mb-8 text-base opacity-95">
                                {t(
                                    'لا تفوت الفرصة! استفد من هذا العرض المميز واحجز مكانك الآن',
                                    'Don\'t miss the opportunity! Take advantage of this special offer and reserve your spot now'
                                )}
                            </p>

                            {/* Info Cards Grid - NO IMAGES, NO LINKS */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                {/* Card 1: Duration or Category */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                                    <Calendar className="w-8 h-8 text-white mx-auto mb-2" />
                                    <p className="text-white font-semibold text-sm mb-1">
                                        {t('المدة', 'Duration')}
                                    </p>
                                    <p className="text-white/90 text-xs">
                                        {t(offer.durationAr || 'حسب البرنامج', offer.durationEn || 'As per program')}
                                    </p>
                                </div>

                                {/* Card 2: Category Type */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                                    <Award className="w-8 h-8 text-white mx-auto mb-2" />
                                    <p className="text-white font-semibold text-sm mb-1">
                                        {t('التصنيف', 'Category')}
                                    </p>
                                    <p className="text-white/90 text-xs capitalize">
                                        {offer.category === 'scholarship' ? t('منحة دراسية', 'Scholarship') :
                                            offer.category === 'training' ? t('تدريب', 'Training') :
                                                offer.category === 'academic' ? t('أكاديمي', 'Academic') :
                                                    t('أخرى', 'Other')}
                                    </p>
                                </div>

                                {/* Card 3: Open for All */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                                    <Users className="w-8 h-8 text-white mx-auto mb-2" />
                                    <p className="text-white font-semibold text-sm mb-1">
                                        {t('متاح للجميع', 'Open to All')}
                                    </p>
                                    <p className="text-white/90 text-xs">
                                        {t('طلاب الجامعة', 'University Students')}
                                    </p>
                                </div>
                            </div>

                            {/* Key Benefits List */}
                            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
                                <h3 className="text-white font-bold text-lg mb-4 text-center">
                                    {t('مميزات العرض', 'Offer Highlights')}
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                        <p className="text-white text-sm">
                                            {t('فرصة مميزة للطلاب المتميزين', 'Excellent opportunity for outstanding students')}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                        <p className="text-white text-sm">
                                            {t('دعم كامل من الجامعة', 'Full support from the university')}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                        <p className="text-white text-sm">
                                            {t('شروط ميسرة وواضحة', 'Easy and clear conditions')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Important Notice */}
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                    <p className="text-white text-sm">
                                        {t(
                                            'للمزيد من التفاصيل أو للتقديم، يرجى زيارة قسم القبول والتسجيل أو التواصل مع الإدارة',
                                            'For more details or to apply, please visit the admissions office or contact the administration'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Description Section - IMPROVED LAYOUT */}
                <div className="mt-12 bg-white dark:bg-card rounded-3xl p-8 shadow-sm">
                    {/* Title - SMALLER SIZE */}
                    <div className="border-b-2 border-gray-200 dark:border-gray-700 pb-4 mb-6">
                        <h2 className="text-xl md:text-2xl font-bold">
                            {t('وصف كامل', 'Full Description')}
                        </h2>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {/* Details */}
                        {(offer.detailsAr || offer.detailsEn) ? (
                            <div className="mb-8">
                                <p className="text-base leading-relaxed text-muted-foreground">
                                    {t(offer.detailsAr || offer.descAr, offer.detailsEn || offer.descEn)}
                                </p>
                            </div>
                        ) : (
                            <div className="mb-8">
                                <p className="text-base leading-relaxed text-muted-foreground">
                                    {t(offer.descAr, offer.descEn)}
                                </p>
                            </div>
                        )}

                        {/* Benefits */}
                        {(offer.benefitsAr || offer.benefitsEn) && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                                    {t('المميزات', 'Benefits')}
                                </h3>
                                <div className="bg-[#FFF9E6] dark:bg-primary/10 rounded-2xl p-6">
                                    <p className="text-base leading-relaxed text-foreground">
                                        {t(offer.benefitsAr || '', offer.benefitsEn || '')}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Target Audience */}
                        {(offer.targetAudienceAr || offer.targetAudienceEn) && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                                    {t('الفئات المستهدفة', 'Target Audience')}
                                </h3>
                                <p className="text-base leading-relaxed text-muted-foreground">
                                    {t(offer.targetAudienceAr || '', offer.targetAudienceEn || '')}
                                </p>
                            </div>
                        )}

                        {/* Requirements */}
                        {(offer.requirementsAr || offer.requirementsEn) && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                                    {t('الشروط والمتطلبات', 'Requirements')}
                                </h3>
                                <div className="bg-gray-50 dark:bg-muted/30 rounded-2xl p-6">
                                    <p className="text-base leading-relaxed text-foreground">
                                        {t(offer.requirementsAr || '', offer.requirementsEn || '')}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Duration if exists and not shown above */}
                        {(offer.durationAr || offer.durationEn) && offer.durationAr !== 'حسب البرنامج' && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                                    {t('المدة', 'Duration')}
                                </h3>
                                <p className="text-base leading-relaxed text-muted-foreground">
                                    {t(offer.durationAr || '', offer.durationEn || '')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Call to Action */}
                <div className="mt-8 text-center bg-gradient-to-r from-black via-[#5C4A2F] to-[#D4AF37] rounded-2xl p-8 shadow-lg">
                    <h3 className="text-white text-2xl font-bold mb-3">
                        {t('هل أنت مستعد للبدء؟', 'Are you ready to start?')}
                    </h3>
                    <p className="text-white/90 mb-6 text-base">
                        {t('تواصل معنا الآن للحصول على المزيد من المعلومات', 'Contact us now for more information')}
                    </p>
                    {offer.applyLink ? (
                        <Button
                            className="bg-white text-[#8B7355] hover:bg-[#D4AF37] hover:text-white border-0 rounded-xl font-bold px-12 py-6 text-lg transition-all shadow-md"
                            asChild
                        >
                            <a href={offer.applyLink} target="_blank" rel="noopener noreferrer">
                                {t('قدم على هذا العرض', 'Apply for This Offer')}
                            </a>
                        </Button>
                    ) : (
                        <Button
                            className="bg-white text-[#8B7355] hover:bg-[#D4AF37] hover:text-white border-0 rounded-xl font-bold px-12 py-6 text-lg transition-all shadow-md"
                            asChild
                        >
                            <Link href="/contact">
                                {t('تواصل معنا', 'Contact Us')}
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
