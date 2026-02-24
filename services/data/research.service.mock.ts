import { LucideIcon, Book, FileText } from 'lucide-react';

export interface ResearchJournal {
    id: string;
    titleAr: string;
    titleEn: string;
    volume: string;
    issue: string;
    dateAr: string;
    dateEn: string;
    image: string;
    pdfUrl: string;
    descriptionAr: string;
    descriptionEn: string;
}

export interface ResearchArticle {
    id: string;
    titleAr: string;
    titleEn: string;
    authorAr: string;
    authorEn: string;
    doctorIcon?: string;
    categoryAr: string;
    categoryEn: string;
    summaryAr: string;
    summaryEn: string;
    contentAr: string;
    contentEn: string;
    publishDateAr: string;
    publishDateEn: string;
    tags: string[];
}

const mockJournals: ResearchJournal[] = [
    {
        id: 'v1-i1',
        titleAr: 'مجلة جامعة الجيل الجديد - العدد الأول',
        titleEn: 'NGU Journal - First Issue',
        volume: '1',
        issue: '1',
        dateAr: 'يناير 2024',
        dateEn: 'January 2024',
        image: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=2070&auto=format&fit=crop',
        pdfUrl: '#',
        descriptionAr: 'المجلد الأول الذي يضم أبحاثاً في مجالات الهندسة والطب والعلوم الإدارية.',
        descriptionEn: 'The first volume featuring research in Engineering, Medicine, and Administrative Sciences.',
    },
    {
        id: 'v1-i2',
        titleAr: 'مجلة جامعة الجيل الجديد - العدد الثاني',
        titleEn: 'NGU Journal - Second Issue',
        volume: '1',
        issue: '2',
        dateAr: 'يوليو 2024',
        dateEn: 'July 2024',
        image: 'https://images.unsplash.com/photo-1532153322601-043a1811ad4e?q=80&w=2070&auto=format&fit=crop',
        pdfUrl: '#',
        descriptionAr: 'العدد الثاني المتخصص في التحول الرقمي وتجربة المستخدم في التعليم العالي.',
        descriptionEn: 'The second issue specialized in digital transformation and UX in higher education.',
    },
];

const mockArticles: ResearchArticle[] = [
    {
        id: 'art-1',
        titleAr: 'تأثير الذكاء الاصطناعي في جراحة القلب',
        titleEn: 'Impact of AI in Cardiac Surgery',
        authorAr: 'أ.د/ همدان الشامي',
        authorEn: 'Prof. Hamdan Al-Shami',
        categoryAr: 'العلوم الطبية',
        categoryEn: 'Medical Sciences',
        summaryAr: 'دراسة تحليلية حول كيفية مساعدة أنظمة الذكاء الاصطناعي في تقليل المخاطر أثناء العمليات المفتوحة.',
        summaryEn: 'An analytical study on how AI systems help reduce risks during open-heart surgeries.',
        contentAr: 'تعد هذه الدراسة حجر زاوية في فهم تطبيقات الذكاء الاصطناعي ضمن القطاع الطبي، حيث استعرض الباحث عبر سلسلة من التجارب السريرية كيف يمكن للخوارزميات المتقدمة التنبؤ بالمضاعفات الجراحية قبل وقوعها بنسبة دقة تصل إلى 94%. تضمنت المنهجية المتبعة تحليل بيانات أكثر من 500 عملية جراحية، ومقارنة النتائج بين البروتوكولات التقليدية والبروتوكولات المدعومة تقنياً، مما أثبت فاعلية عالية في تقليل زمن النقاهة والحفاظ على سلامة المرضى.',
        contentEn: 'This study serves as a cornerstone in understanding AI applications within the medical sector. The researcher demonstrated through clinical trials how advanced algorithms can predict surgical complications before they occur with a 94% accuracy rate. The methodology involved analyzing data from over 500 surgeries, comparing traditional protocols with tech-supported ones, proving high effectiveness in reducing recovery time and ensuring patient safety.',
        publishDateAr: '15 فبراير 2024',
        publishDateEn: 'February 15, 2024',
        tags: ['AI', 'Medicine', 'Surgery'],
    },
    {
        id: 'art-2',
        titleAr: 'المدن المستدامة وتحديات الطاقة في اليمن',
        titleEn: 'Sustainable Cities and Energy Challenges in Yemen',
        authorAr: 'د/ محمد عبد الله',
        authorEn: 'Dr. Mohammed Abdullah',
        categoryAr: 'الهندسة والتكنولوجيا',
        categoryEn: 'Engineering & Technology',
        summaryAr: 'بحث حول استخدام الطاقة المتجددة في تصميم المباني الجامعية الحديثة.',
        summaryEn: 'Research on using renewable energy in modern university building designs.',
        contentAr: 'يناقش هذا البحث استراتيجيات دمج الطاقة الشمسية وتصميمات العمارة الخضراء في البيئات الجامعية اليمنية، مع التركيز على دراسة حالة لجامعة الجيل الجديد كنموذج رائد. خلصت النتائج إلى إمكانية توفير ما يصل إلى 60% من تكاليف الاستهلاك الكهربائي عبر استخدام أنظمة التظليل الذكية والواحات الحرارية، مما يساهم في خلق بيئة تعليمية مستدامة واقتصادية صديقة للبيئة.',
        contentEn: 'This research discusses strategies for integrating solar energy and green architecture designs in Yemeni university environments, focusing on a case study of Al-Jeel Al-Jadeed University as a pioneering model. The results concluded that up to 60% of electrical consumption costs could be saved through the use of smart shading systems and thermal oases, contributing to a sustainable, economical, and eco-friendly educational environment.',
        publishDateAr: '10 مارس 2024',
        publishDateEn: 'March 10, 2024',
        tags: ['Sustainable', 'Energy', 'Engineering'],
    },
];

export const researchService = {
    getAllJournals: async (): Promise<ResearchJournal[]> => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return mockJournals;
    },
    getAllArticles: async (): Promise<ResearchArticle[]> => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return mockArticles;
    },
    getArticlesByCategory: async (category: string): Promise<ResearchArticle[]> => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return mockArticles.filter(a => a.categoryEn.toLowerCase().includes(category.toLowerCase()));
    },
    getArticleById: async (id: string): Promise<ResearchArticle | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return mockArticles.find(a => a.id === id);
    }
};
