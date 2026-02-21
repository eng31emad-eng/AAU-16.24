import { ProjectItem } from '@/types';

const mockProjects: ProjectItem[] = [
  {
    id: '1',
    slug: 'smart-library-system',
    titleAr: 'نظام إدارة المكتبات الذكي',
    titleEn: 'Smart Library Management System',
    descAr: 'نظام متكامل لإدارة المكتبات باستخدام الذكاء الاصطناعي',
    descEn: 'Integrated system for library management using AI',
    students: ['أحمد محمد', 'فاطمة علي'],
    progress: 75,
    status: 'current',
    type: 'graduation',
    startDate: '2024-09-01',
    detailsAr: 'مشروع نظام إدارة المكتبات الذكي يهدف إلى تطوير منصة متكاملة لإدارة عمليات المكتبة بشكل آلي. يستخدم المشروع تقنيات الذكاء الاصطناعي للتوصية بالكتب وإدارة عمليات الإعارة والإرجاع. النظام يتضمن واجهة مستخدم سهلة ولوحة تحكم للموظفين.',
    detailsEn: 'The Smart Library Management System project aims to develop an integrated platform for automating library operations. The project uses artificial intelligence techniques for book recommendations and managing borrowing and return operations. The system includes an easy-to-use interface and a staff control panel.',
    images: ['/placeholder.svg'],
  },
  {
    id: '2',
    slug: 'e-health-app',
    titleAr: 'تطبيق الصحة الإلكترونية',
    titleEn: 'E-Health Application',
    descAr: 'تطبيق لربط المرضى بالأطباء وإدارة المواعيد',
    descEn: 'Application connecting patients with doctors and managing appointments',
    students: ['محمد حسن', 'سارة أحمد'],
    progress: 60,
    status: 'current',
    type: 'graduation',
    startDate: '2024-10-01',
    detailsAr: 'تطبيق الصحة الإلكترونية يربط المرضى بالأطباء المتخصصين ويسهل حجز المواعيد ومتابعة الحالات الطبية. يتضمن التطبيق نظام دفع إلكتروني وخاصية الاستشارات عن بعد.',
    detailsEn: 'The E-Health Application connects patients with specialized doctors and facilitates appointment booking and medical case follow-up. The app includes an electronic payment system and remote consultation feature.',
    images: ['/placeholder.svg'],
  },
  {
    id: '3',
    slug: 'e-learning-platform',
    titleAr: 'منصة التعليم الإلكتروني',
    titleEn: 'E-Learning Platform',
    descAr: 'منصة تفاعلية للتعليم عن بعد',
    descEn: 'Interactive platform for remote learning',
    students: ['خالد يوسف', 'مريم سالم'],
    progress: 85,
    status: 'current',
    type: 'graduation',
    startDate: '2024-08-01',
    detailsAr: 'منصة تعليمية متكاملة توفر بيئة تفاعلية للتعلم عن بعد مع أدوات للتواصل المباشر بين المعلمين والطلاب. تدعم المنصة الفيديوهات التفاعلية والاختبارات الإلكترونية وتتبع التقدم الأكاديمي.',
    detailsEn: 'An integrated educational platform providing an interactive environment for distance learning with tools for direct communication between teachers and students. The platform supports interactive videos, electronic tests, and academic progress tracking.',
    images: ['/placeholder.svg'],
  },
  {
    id: '4',
    slug: 'inventory-management',
    titleAr: 'نظام إدارة المخزون',
    titleEn: 'Inventory Management System',
    descAr: 'نظام متطور لإدارة المخزون والمبيعات',
    descEn: 'Advanced system for inventory and sales management',
    students: ['علي حسين', 'نور الدين'],
    year: 2024,
    status: 'completed',
    type: 'graduation',
    startDate: '2023-09-01',
    endDate: '2024-06-01',
    detailsAr: 'نظام شامل لإدارة المخزون يتضمن تتبع المنتجات وإدارة المبيعات والتقارير المالية. تم تطوير النظام باستخدام تقنيات حديثة ونُفذ بنجاح في عدة شركات محلية.',
    detailsEn: 'A comprehensive inventory management system including product tracking, sales management, and financial reports. The system was developed using modern technologies and successfully implemented in several local companies.',
    images: ['/placeholder.svg'],
  },
  {
    id: '5',
    slug: 'e-commerce-app',
    titleAr: 'تطبيق التجارة الإلكترونية',
    titleEn: 'E-Commerce Application',
    descAr: 'منصة تجارة إلكترونية متكاملة',
    descEn: 'Integrated e-commerce platform',
    students: ['ليلى محمود', 'حسن عمر'],
    year: 2024,
    status: 'completed',
    type: 'graduation',
    startDate: '2023-10-01',
    endDate: '2024-05-01',
    detailsAr: 'منصة تجارة إلكترونية كاملة تتضمن عربة تسوق، نظام دفع آمن، وإدارة الطلبات. المشروع يدعم البائعين المتعددين ويوفر لوحة تحكم شاملة.',
    detailsEn: 'A complete e-commerce platform including shopping cart, secure payment system, and order management. The project supports multiple vendors and provides a comprehensive control panel.',
    images: ['/placeholder.svg'],
  },
  {
    id: '6',
    slug: 'clinic-management',
    titleAr: 'نظام إدارة العيادات',
    titleEn: 'Clinic Management System',
    descAr: 'نظام شامل لإدارة العيادات الطبية',
    descEn: 'Comprehensive system for medical clinic management',
    students: ['رانيا سعيد', 'طارق فهد'],
    year: 2023,
    status: 'completed',
    type: 'graduation',
    startDate: '2022-09-01',
    endDate: '2023-06-01',
    detailsAr: 'نظام إدارة عيادات شامل يتضمن حجز المواعيد، إدارة الملفات الطبية، والوصفات الطبية الإلكترونية. النظام يدعم عدة عيادات ويوفر تقارير شاملة.',
    detailsEn: 'A comprehensive clinic management system including appointment booking, medical records management, and electronic prescriptions. The system supports multiple clinics and provides comprehensive reports.',
    images: ['/placeholder.svg'],
  },
  {
    id: 'studio-1',
    slug: 'graphic-design-branding',
    titleAr: 'هوية بصرية لشركة ناشئة',
    titleEn: 'Visual Identity for a Startup',
    descAr: 'تصميم هوية بصرية كاملة تشمل الشعار والخطوط والألوان',
    descEn: 'Complete visual identity design including logo, fonts, and colors',
    students: ['منى أحمد'],
    status: 'completed',
    type: 'studio',
    categoryAr: 'تصميم جرافيكي',
    categoryEn: 'Graphic Design',
    images: ['https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80'],
    detailsAr: 'مشروع تصميم هوية بصرية كاملة لشركة تقنية ناشئة. يشمل العمل تصميم الشعار (Logo)، اختيار منصة الألوان المتناغمة، وتحديد الخطوط الرسمية، بالإضافة إلى تصميم تطبيقات الهوية على القرطاسية والوسائل الرقمية.',
    detailsEn: 'A project to design a complete visual identity for a tech startup. The work includes logo design, choosing a harmonious color palette, and defining official fonts, as well as applying the identity to stationery and digital media.',
  },
  {
    id: 'studio-2',
    slug: 'architectural-3d-model',
    titleAr: 'نمذجة معمارية ثلاثية الأبعاد',
    titleEn: 'Architectural 3D Modeling',
    descAr: 'تصميم ثلاثي الأبعاد لمبنى سكني حديث مع الإضاءة',
    descEn: '3D design for a modern residential building with lighting',
    students: ['ياسر محمد'],
    status: 'completed',
    type: 'studio',
    categoryAr: 'هندسة معمارية',
    categoryEn: 'Architecture',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'],
    detailsAr: 'نمذجة معمارية ثلاثية الأبعاد لفيلا سكنية بأسلوب "المودرن". تم التركيز في المشروع على دراسة الإضاءة الطبيعية وتوزيع المساحات الداخلية، مع تقديم رندر (Rendering) واقعي يوضح الخامات المستخدمة.',
    detailsEn: '3D architectural modeling of a modern residential villa. The project focuses on studying natural lighting and interior space distribution, providing realistic rendering that shows the materials used.',
  },
  {
    id: 'studio-3',
    slug: 'mobile-ui-concept',
    titleAr: 'واجهة تطبيق سفر ذكي',
    titleEn: 'Smart Travel App UI',
    descAr: 'تصميم واجهة مستخدم مبتكرة لتطبيق حجز الرحلات',
    descEn: 'Innovative UI design for a travel booking app',
    students: ['أروى علي'],
    status: 'completed',
    type: 'studio',
    categoryAr: 'تصميم واجهات',
    categoryEn: 'UI/UX Design',
    images: ['https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80'],
    detailsAr: 'تصميم نموذج أولي لتطبيق سفر ذكي يهدف لتسهيل عملية حجز الرحلات واستكشاف الوجهات السياحية. تم بناء تجربة مستخدم (UX) سلسة تركز على سرعة الوصول للمعلومات وسهولة الدفع.',
    detailsEn: 'UI/UX design for a smart travel app aimed at facilitating tour bookings and destination exploration. A seamless user experience was built, focusing on quick information access and easy payment.',
  },
  {
    id: 'studio-4',
    slug: 'digital-art-showcase',
    titleAr: 'فن رقمي: الطبيعة الصامتة',
    titleEn: 'Digital Art: Still Life',
    descAr: 'رسم رقمي يجسد الطبيعة الصامتة بأسلوب معاصر',
    descEn: 'Digital painting depicting still life in a contemporary style',
    students: ['عبير سالم'],
    status: 'completed',
    type: 'studio',
    categoryAr: 'فنون رقمية',
    categoryEn: 'Digital Arts',
    images: ['https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80'],
    detailsAr: 'عمل فني رقمي يستعرض مفاهيم الطبيعة الصامتة باستخدام أدوات الرسم الرقمي الحديثة. تم دمج أساليب التلوين الكلاسيكية مع لمسات عصرية رقمية لخلق لوحة فنية فريدة.',
    detailsEn: 'Digital art piece showcasing still life concepts using modern digital painting tools. Classical coloring techniques were merged with modern digital touches to create a unique artwork.',
  },
];

export const projectsService = {
  getAll: (): Promise<ProjectItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProjects), 300);
    });
  },

  getCurrent: (): Promise<ProjectItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProjects.filter((p) => p.status === 'current'));
      }, 300);
    });
  },

  getCompleted: (): Promise<ProjectItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProjects.filter((p) => p.status === 'completed'));
      }, 300);
    });
  },

  getBySlug: (slug: string): Promise<ProjectItem | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const project = mockProjects.find((p) => p.slug === slug);
        resolve(project || null);
      }, 200);
    });
  },

  search: (query: string): Promise<ProjectItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = mockProjects.filter(
          (p) =>
            p.titleAr.includes(query) ||
            p.titleEn.toLowerCase().includes(query.toLowerCase()) ||
            p.descAr.includes(query) ||
            p.descEn.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 300);
    });
  },

  getStudio: (): Promise<ProjectItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProjects.filter((p) => p.type === 'studio'));
      }, 300);
    });
  },
};
