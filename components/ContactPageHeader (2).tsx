'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const ContactPageHeader = () => {
    const { t, language } = useLanguage();
    const router = useRouter();
    const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;

    return (
        <>
            <Breadcrumb items={[{ label: { ar: 'تواصل معنا', en: 'Contact Us' } }]} />

            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-6 text-secondary hover:text-secondary/80 hover:bg-secondary/10"
            >
                <BackArrow className="w-4 h-4 mx-2" />
                {t('رجوع', 'Back')}
            </Button>
        </>
    );
};
