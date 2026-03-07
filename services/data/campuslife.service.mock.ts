import { CampusLifeItem } from '@/types';

const mockCampusLifeItems: CampusLifeItem[] = [
  {
    id: '1',
    slug: 'central-library',
    titleAr: 'المكتبة المركزية',
    titleEn: 'Central Library',
    descriptionAr: 'مكتبة حديثة مجهزة بأحدث الكتب والمراجع العلمية وقاعات الدراسة الهادئة',
    descriptionEn: 'Modern library equipped with the latest books, scientific references, and quiet study spaces',
    contentAr: 'مكتبة حديثة مجهزة بأحدث الكتب والمراجع العلمية وقاعات الدراسة الهادئة',
    contentEn: 'Modern library equipped with the latest books, scientific references, and quiet study spaces',
    category: 'facilities',
    image: '/images/campus/central-library.jpg'
  },
  {
    id: '2',
    slug: 'scientific-laboratories',
    titleAr: 'المختبرات العلمية',
    titleEn: 'Scientific Laboratories',
    descriptionAr: 'مختبرات متقدمة مجهزة بأحدث التقنيات للتجارب العملية والبحث العلمي',
    descriptionEn: 'Advanced laboratories equipped with the latest technologies for practical experiments and research',
    contentAr: 'مختبرات متقدمة مجهزة بأحدث التقنيات للتجارب العملية والبحث العلمي',
    contentEn: 'Advanced laboratories equipped with the latest technologies for practical experiments and research',
    category: 'facilities',
    image: '/images/campus/scientific-laboratories.jpg'
  },
  {
    id: '3',
    slug: 'sports-fields',
    titleAr: 'الملاعب الرياضية',
    titleEn: 'Sports Fields',
    descriptionAr: 'ملاعب مجهزة لمختلف الرياضات: كرة القدم، كرة السلة، الكرة الطائرة، والتنس',
    descriptionEn: 'Fields equipped for various sports: football, basketball, volleyball, and tennis',
    contentAr: 'ملاعب مجهزة لمختلف الرياضات: كرة القدم، كرة السلة، الكرة الطائرة، والتنس',
    contentEn: 'Fields equipped for various sports: football, basketball, volleyball, and tennis',
    category: 'facilities',
    image: '/images/campus/sports-activities.jpg'
  },
  {
    id: '4',
    slug: 'health-center',
    titleAr: 'المركز الصحي',
    titleEn: 'Health Center',
    descriptionAr: 'مركز طبي متكامل يقدم الخدمات الصحية للطلاب والموظفين',
    descriptionEn: 'Integrated medical center providing health services for students and staff',
    contentAr: 'مركز طبي متكامل يقدم الخدمات الصحية للطلاب والموظفين',
    contentEn: 'Integrated medical center providing health services for students and staff',
    category: 'facilities',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop'
  },
  {
    id: '5',
    slug: 'restaurants-cafeterias',
    titleAr: 'المطاعم والكافتيريات',
    titleEn: 'Restaurants and Cafeterias',
    descriptionAr: 'مجموعة متنوعة من المطاعم والكافتيريات التي تقدم وجبات صحية ولذيقة',
    descriptionEn: 'Various restaurants and cafeterias offering healthy and delicious meals',
    contentAr: 'مجموعة متنوعة من المطاعم والكافتيريات التي تقدم وجبات صحية ولذيقة',
    contentEn: 'Various restaurants and cafeterias offering healthy and delicious meals',
    category: 'facilities',
    image: '/images/campus/cafeteria.jpg'
  },
  {
    id: '6',
    slug: 'student-club',
    titleAr: 'النادي الطلابي',
    titleEn: 'Student Club',
    descriptionAr: 'مساحة ترفيهية للطلاب تشمل الألعاب والأنشطة المتنوعة',
    descriptionEn: 'Entertainment space for students including games and various activities',
    contentAr: 'مساحة ترفيهية للطلاب تشمل الألعاب والأنشطة المتنوعة',
    contentEn: 'Entertainment space for students including games and various activities',
    category: 'activities',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop'
  },
  {
    id: '7',
    slug: 'sports-activities',
    titleAr: 'الأنشطة الرياضية',
    titleEn: 'Sports Activities',
    descriptionAr: 'دوريات وبطولات رياضية منتظمة في مختلف الألعاب',
    descriptionEn: 'Regular sports leagues and championships in various games',
    contentAr: 'دوريات وبطولات رياضية منتظمة في مختلف الألعاب',
    contentEn: 'Regular sports leagues and championships in various games',
    category: 'activities',
    image: '/images/campus/sports-activities.jpg'
  },
  {
    id: '8',
    slug: 'cultural-activities',
    titleAr: 'الأنشطة الثقافية',
    titleEn: 'Cultural Activities',
    descriptionAr: 'ندوات ثقافية ومعارض فنية وأمسيات أدبية منتظمة',
    descriptionEn: 'Cultural seminars, art exhibitions, and regular literary evenings',
    contentAr: 'ندوات ثقافية ومعارض فنية وأمسيات أدبية منتظمة',
    contentEn: 'Cultural seminars, art exhibitions, and regular literary evenings',
    category: 'activities',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop'
  },
  {
    id: '9',
    slug: 'scientific-club',
    titleAr: 'النادي العلمي',
    titleEn: 'Scientific Club',
    descriptionAr: 'ورش علمية ومسابقات تقنية وجلسات برمجة',
    descriptionEn: 'Scientific workshops, technical competitions, and programming sessions',
    contentAr: 'ورش علمية ومسابقات تقنية وجلسات برمجة',
    contentEn: 'Scientific workshops, technical competitions, and programming sessions',
    category: 'activities',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop'
  },
  {
    id: '10',
    slug: 'volunteer-activities',
    titleAr: 'الأنشطة التطوعية',
    titleEn: 'Volunteer Activities',
    descriptionAr: 'برامج تطوعية منتظمة لخدمة المجتمع المحلي',
    descriptionEn: 'Regular volunteer programs serving the local community',
    contentAr: 'برامج تطوعية منتظمة لخدمة المجتمع المحلي',
    contentEn: 'Regular volunteer programs serving the local community',
    category: 'activities',
    image: 'https://images.unsplash.com/photo-1559027615-cd26735559ad?w=800&h=600&fit=crop'
  },
  {
    id: '11',
    slug: 'university-campus',
    titleAr: 'حرم الجامعة',
    titleEn: 'University Campus',
    descriptionAr: 'حرم جامعي واسع ومنظم يضم مساحات خضراء ومناطق للاستراحة',
    descriptionEn: 'Spacious and organized campus with green spaces and rest areas',
    contentAr: 'حرم جامعي واسع ومنظم يضم مساحات خضراء ومناطق للاستراحة',
    contentEn: 'Spacious and organized campus with green spaces and rest areas',
    category: 'campus',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe1?w=800&h=600&fit=crop'
  },
  {
    id: '12',
    slug: 'university-transportation',
    titleAr: 'مواصلات الجامعة',
    titleEn: 'University Transportation',
    descriptionAr: 'خدمة حافلات منتظمة تربط الجامعة بمختلف مناطق المدينة',
    descriptionEn: 'Regular bus service connecting the university to various city areas',
    contentAr: 'خدمة حافلات منتظمة تربط الجامعة بمختلف مناطق المدينة',
    contentEn: 'Regular bus service connecting the university to various city areas',
    category: 'campus',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop'
  },
  {
    id: '13',
    slug: 'parking-lots',
    titleAr: 'مواقف السيارات',
    titleEn: 'Parking Lots',
    descriptionAr: 'مواقف واسعة وآمنة للطلاب والموظفين',
    descriptionEn: 'Spacious and secure parking for students and staff',
    contentAr: 'مواقف واسعة وآمنة للطلاب والموظفين',
    contentEn: 'Spacious and secure parking for students and staff',
    category: 'campus',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=600&fit=crop'
  },
  {
    id: '14',
    slug: 'technology-center',
    titleAr: 'مركز التقنية',
    titleEn: 'Technology Center',
    descriptionAr: 'مركز مجهز بأحدث التقنيات وخدمات الإنترنت عالية السرعة',
    descriptionEn: 'Center equipped with the latest technologies and high-speed internet services',
    contentAr: 'مركز مجهز بأحدث التقنيات وخدمات الإنترنت عالية السرعة',
    contentEn: 'Center equipped with the latest technologies and high-speed internet services',
    category: 'facilities',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop'
  },
  {
    id: '15',
    slug: 'lecture-halls',
    titleAr: 'قاعات المحاضرات',
    titleEn: 'Lecture Halls',
    descriptionAr: 'قاعات محاضرات مجهزة بأحدث أنظمة العرض والصوت',
    descriptionEn: 'Lecture halls equipped with the latest display and sound systems',
    contentAr: 'قاعات محاضرات مجهزة بأحدث أنظمة العرض والصوت',
    contentEn: 'Lecture halls equipped with the latest display and sound systems',
    category: 'facilities',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop'
  },
];

export const campusLifeService = {
  getAllItems: async (): Promise<CampusLifeItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCampusLifeItems;
  },

  getItemsByCategory: async (category: string): Promise<CampusLifeItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCampusLifeItems.filter(item => item.category === category);
  },

  getItemBySlug: async (slug: string): Promise<CampusLifeItem | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockCampusLifeItems.find(item => item.slug === slug);
  },
};
