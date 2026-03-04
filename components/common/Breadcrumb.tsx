'use client'
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BreadcrumbItem {
  label: { ar: string; en: string };
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const { t, language } = useLanguage();
  const ChevronIcon = language === 'ar' ? ChevronLeft : ChevronRight;

  // Filter out any items that might be "Home" or already represented by the root link
  const filteredItems = items.filter(item =>
    item.label.en.toLowerCase() !== 'home' &&
    item.label.ar !== 'الرئيسية' &&
    item.href !== '/'
  );

  return (
    <nav
      className="flex items-center flex-wrap gap-2 text-sm mb-6 animate-fade-in py-2"
      aria-label={t('التنقل', 'Breadcrumb')}
    >
      <Link href="/"
        className="text-muted-foreground hover:text-secondary transition-all duration-300 flex items-center gap-1.5 group"
        aria-label={t('الرئيسية', 'Home')}
      >
        <div className="p-1.5 rounded-md bg-secondary/10 group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
          <Home className="w-3.5 h-3.5" />
        </div>
        <span className="font-medium hidden sm:inline">{t('الرئيسية', 'Home')}</span>
      </Link>

      {filteredItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2 group">
          <ChevronIcon className="w-4 h-4 text-secondary/50 group-hover:text-secondary transition-colors" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-secondary transition-all duration-300 font-medium"
            >
              {t(item.label.ar, item.label.en)}
            </Link>
          ) : (
            <span className="text-foreground font-bold bg-secondary/5 px-2 py-1 rounded-md border border-secondary/10">
              {t(item.label.ar, item.label.en)}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};



