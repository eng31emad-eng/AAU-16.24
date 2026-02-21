'use client'
import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Target, Eye, Heart, Flag, Quote, Sparkles } from 'lucide-react';
;
import { Card, CardContent } from '@/components/ui/card';
import aboutImage from '@/assets/about-university.jpg';
import { useRouter } from 'next/navigation'

const About = () => {
  const { t, language } = useLanguage();
  const router = useRouter();
  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;

  const values = [
    {
      icon: Eye,
      title: { ar: 'الرؤية', en: 'Vision' },
      description: {
        ar: 'مؤسسة تعليميه رائدة وطنياومتميزة اقليميا فعالة في بناء مجتمع المعرفة',
        en: 'A leading educational institution nationally, distinguished regionally, and effective in building a knowledge society.'
      },
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: { ar: 'الرسالة', en: 'Mission' },
      description: {
        ar: 'إعداد خريجين يتمتعون بالكفاءة العلمية والمهنية والتعلم مدى الحياة، من خلال تقديم خبرة تعليمية رائدة ترتكز على بيئة علمية وتعليمية داعمة، وبرامج أكاديمية نوعية مبتكرة تسهم في مواكبة المتغيرات الراهنة والاحتياجات التنموية وتلبي متطلبات سوق العمل، وتسهم في خدمة المجتمع وتعزيز التنمية المستدامة',
        en: 'Preparing graduates who possess scientific and professional competence and lifelong learning skills, through providing a pioneering educational experience based on a supportive scientific and educational environment, and innovative, high-quality academic programs that contribute to keeping pace with contemporary changes and developmental needs, meet labor market requirements, serve the community, and enhance sustainable development.'
      },
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Flag,
      title: { ar: 'الأهداف', en: 'Goals' },
      description: {
        ar: 'تحقيق التميز الأكاديمي والبحثي، وتعزيز الشراكة المجتمعية، وتوفير بيئة تعليمية محفزة، وتنمية الموارد البشرية والمادية للجامعة.',
        en: 'Achieving academic and research excellence, enhancing community partnership, providing a stimulating educational environment, and developing human and material resources.'
      },
      gradient: 'from-emerald-500 to-green-500'
    },
    {
      icon: Heart,
      title: { ar: 'القيم', en: 'Values' },
      description: {
        ar: 'الريادة والتعلم المستمر , الابتكار والإبداع ,المسؤولية والشفافية , العمل بروح الفريق',
        en: 'Leadership and Continuous Learning , Innovation and Creativity , Responsibility and Transparency , Teamwork Spirit'
      },
      gradient: 'from-rose-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div data-breadcrumb="local">
          <Breadcrumb items={[{ label: { ar: 'عن الجامعة', en: 'About' } }]} />
        </div>

        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <BackArrow className="w-4 h-4 mx-2" />
          {t('رجوع', 'Back')}
        </Button>

        <div className="mb-16 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t('عن جامعة الجيل الجديد', 'About AJ JEEL ALJADEED UNIVERSITY')}
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16 animate-fade-in-up">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t(
                'جامعة الجيل الجديد تأسست سنة 2022م.وتقع وسط العاصمة صنعاء في شارع الرقاص من جهة الدائري ويمكن الوصول اليهاء ايضا من شارع الستين. وتضم الجامعة حاليا اربع كليات هي كلية الطب البشري وكلية العلوم الطبية والصحيه وكليه الهندسة وتكنولوجيا المعلومات وكلية العلوم الاداريه والانسانية ',
                'Al Jeel Al Jadeed University was established in 2022 and is located in the center of the capital, Sana’a, on Al-Raqqas Street near the Ring Road. It can also be accessed from Sixty Street. The university branch is also located on Al-Maqaleh Street. The university currently includes four colleges: the College of Human Medicine, the College of Medical and Health Sciences, the College of Engineering and Information Technology, and the College of Administrative and Human Sciences.'
              )}
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
            <img
              src={(aboutImage as any).src || aboutImage}

              alt={t('جامعة الجيل الجديد', 'Al Jeel Al Jadeed University')}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Top Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient}`} />

              <CardContent className="pt-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-center mb-3">
                  {t(value.title.ar, value.title.en)}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed text-sm">
                  {t(value.description.ar, value.description.en)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Administrative Team Section */}
        <div className="mt-20 mb-16 animate-fade-in-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('الفريق الإداري', 'Administrative Team')}
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('نخبة من الكفاءات الأكاديمية والإدارية التي تقود مسيرة الجامعة نحو التميز والحداثة', 'A group of elite academic and administrative competencies leading the university towards excellence and modernity')}
            </p>
          </div>

          <div className="flex flex-col items-center space-y-12 max-w-6xl mx-auto">
            {/* Level 1: President */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-secondary p-1 bg-background shadow-xl transition-transform duration-500 group-hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80"
                    alt={t('د. أحمد محمود الحسن', 'Dr. Ahmed Mahmoud')}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold mb-1">{t('د. أحمد محمود الحسن', 'Dr. Ahmed Mahmoud')}</h3>
                <p className="text-secondary font-medium">{t('رئيس الجامعة', 'University President')}</p>
              </div>
              {/* Vertical line connector */}
              <div className="w-0.5 h-12 bg-gradient-to-b from-secondary to-primary/20 mt-4 hidden md:block"></div>
            </div>

            {/* Level 2: Top Management */}
            <div className="relative w-full">
              {/* Horizontal line connector (Desktop only) */}
              <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-primary/20 hidden md:block"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-center pt-8">
                {[
                  {
                    name: { ar: 'أ.د. محمد العلفي', en: 'Dr. Mohamed Al-Alfi' },
                    role: { ar: 'نائب رئيس الجامعة للشؤون الأكاديمية', en: 'Vice President for Academic Affairs' },
                    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80'
                  },
                  {
                    name: { ar: 'د. خالد سيف', en: 'Dr. Khaled Saif' },
                    role: { ar: 'الأمين العام للجامعة', en: 'Secretary General' },
                    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
                  },
                  {
                    name: { ar: 'د. سارة المنصور', en: 'Dr. Sarah Al-Mansouri' },
                    role: { ar: 'نائب رئيس الجامعة للدراسات العليا', en: 'Vice President for Graduate Studies' },
                    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80'
                  }
                ].map((member, index) => (
                  <div key={index} className="flex flex-col items-center group relative">
                    {/* Vertical line to horizontal (Desktop only) */}
                    <div className="absolute -top-8 w-0.5 h-8 bg-primary/20 hidden md:block"></div>

                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-secondary transition-all duration-300 shadow-lg mb-4 bg-background">
                      <img
                        src={member.image}
                        alt={t(member.name.ar, member.name.en)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-base font-bold text-center">{t(member.name.ar, member.name.en)}</h3>
                    <p className="text-xs text-muted-foreground text-center px-2">{t(member.role.ar, member.role.en)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Level 3: Directors (Grid) */}
            <div className="w-full pt-16">
              <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{t('مدراء الإدارات العامة', 'General Administration Directors')}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                {[
                  {
                    name: { ar: 'م. ياسر القاضي', en: 'Eng. Yasser Al-Qadi' },
                    role: { ar: 'مدير الشؤون المالية', en: 'Director of Finance' },
                    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80'
                  },
                  {
                    name: { ar: 'د. علي عبده', en: 'Dr. Ali Abdu' },
                    role: { ar: 'مسجل عام الجامعة', en: 'University Registrar' },
                    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=200&q=80'
                  },
                  {
                    name: { ar: 'أ. منى الراعي', en: 'Ms. Mona Al-Raee' },
                    role: { ar: 'مدير شؤون الموظفين', en: 'HR Director' },
                    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80'
                  },
                  {
                    name: { ar: 'أ. سامي محمد', en: 'Mr. Sami Mohamed' },
                    role: { ar: 'مدير النظم والمعلومات', en: 'IT Director' },
                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
                  },
                  {
                    name: { ar: 'د. ليلى أحمد', en: 'Dr. Layla Ahmed' },
                    role: { ar: 'مدير ضمان الجودة والاعتماد', en: 'Quality Assurance Director' },
                    image: 'https://images.unsplash.com/photo-1594744803329-a584af1cae24?w=200&q=80'
                  },
                  {
                    name: { ar: 'أ. حسن العزاني', en: 'Mr. Hassan Al-Azani' },
                    role: { ar: 'مدير العلاقات العامة والإعلام', en: 'Public Relations Director' },
                    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'
                  },
                  {
                    name: { ar: 'أ. فؤاد الصبري', en: 'Mr. Fouad Al-Sabri' },
                    role: { ar: 'مدير الشؤون القانونية', en: 'Legal Affairs Director' },
                    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80'
                  },
                  {
                    name: { ar: 'د. أروى صالح', en: 'Dr. Arwa Saleh' },
                    role: { ar: 'أمين مكتبة الجامعة', en: 'University Librarian' },
                    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0ad2f01?w=200&q=80'
                  },
                  {
                    name: { ar: 'م. عمار الحبيشي', en: 'Eng. Ammar Al-Hubaishi' },
                    role: { ar: 'مدير التخطيط والمشاريع', en: 'Planning & Projects Director' },
                    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80'
                  },
                  {
                    name: { ar: 'أ. جيهان محمد', en: 'Ms. Jihan Mohamed' },
                    role: { ar: 'منسق شؤون الخريجين', en: 'Alumni Coordinator' },
                    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&q=80'
                  }
                ].map((member, index) => (
                  <div key={index} className="flex flex-col items-center group">
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-primary/10 group-hover:border-secondary/50 transition-all duration-300 mb-3 bg-muted/20">
                      <img
                        src={member.image}
                        alt={t(member.name.ar, member.name.en)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                    <h4 className="text-xs md:text-sm font-bold text-center leading-tight">{t(member.name.ar, member.name.en)}</h4>
                    <p className="text-[10px] text-muted-foreground text-center mt-1">{t(member.role.ar, member.role.en)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;






