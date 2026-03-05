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


        </>
    );
};
