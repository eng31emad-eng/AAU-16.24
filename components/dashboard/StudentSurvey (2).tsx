'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, MessageSquare, CheckCircle, ArrowRight, ArrowLeft, Heart, Zap, Shield, GraduationCap, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface StudentSurveyProps {
    onComplete: () => void;
    studentName: string;
}

export const StudentSurvey = ({ onComplete, studentName }: StudentSurveyProps) => {
    const { t, language } = useLanguage();
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const [answers, setAnswers] = useState({
        digitalServices: 0,
        campusLife: '',
        academicSupport: '',
        suggestions: ''
    });

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        // Save to localStorage with current date for daily check
        const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
        localStorage.setItem('survey_last_completed_date', today);
        localStorage.setItem('survey_answers', JSON.stringify(answers));

        toast.success(t('شكراً لك! تم استلام تقييمك بنجاح.', 'Thank you! Your feedback has been received.'));
        onComplete();
    };

    const progress = (step / totalSteps) * 100;

    const stepVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-2xl"
            >
                <Card className="shadow-2xl border-primary/20 bg-white/90 dark:bg-slate-900/90 overflow-hidden relative">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full -ml-16 -mb-16 blur-3xl" />

                    <CardHeader className="text-center pb-2 relative z-10">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                            <GraduationCap className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {t('استبيان تطوير الخدمات الجامعية', 'University Services Improvement Survey')}
                        </CardTitle>
                        <CardDescription className="text-base">
                            {t(`مرحباً ${studentName}، رأيك يهمنا لتطوير جامعتك.`, `Welcome ${studentName}, your opinion matters to improve your university.`)}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-4 relative z-10">
                        <div className="mb-8">
                            <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
                                <span>{t(`الخطوة ${step} من ${totalSteps}`, `Step ${step} of ${totalSteps}`)}</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-1.5" />
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" {...stepVariants} className="space-y-6 py-4">
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold mb-4">{t('ما مدى رضاك عن الخدمات الرقمية في الجامعة؟', 'How satisfied are you with digital services?')}</h3>
                                        <div className="flex justify-center gap-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <motion.button
                                                    key={star}
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setAnswers({ ...answers, digitalServices: star })}
                                                    className={`p-3 rounded-xl transition-all ${answers.digitalServices >= star ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-muted text-muted-foreground'}`}
                                                >
                                                    <Star className={`w-8 h-8 ${answers.digitalServices >= star ? 'fill-current' : ''}`} />
                                                </motion.button>
                                            ))}
                                        </div>
                                        <p className="mt-4 text-sm text-muted-foreground">
                                            {answers.digitalServices === 5 && t('ممتاز جداً - فخورين بك!', 'Excellent - We are proud!')}
                                            {answers.digitalServices === 1 && t('نحتاج لتحسين ملموس', 'We need significant improvement')}
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" {...stepVariants} className="space-y-6 py-4">
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold mb-6">{t('كيف تقيم البيئة الجامعية والقاعات الدراسية؟', 'How do you rate the campus environment and halls?')}</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {[
                                                { id: 'excellent', emoji: '😍', label: { ar: 'ممتازة', en: 'Great' } },
                                                { id: 'good', emoji: '😊', label: { ar: 'جيدة', en: 'Good' } },
                                                { id: 'fair', emoji: '😐', label: { ar: 'مقبولة', en: 'Fair' } },
                                                { id: 'poor', emoji: '☹️', label: { ar: 'ضعيفة', en: 'Poor' } }
                                            ].map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => setAnswers({ ...answers, campusLife: item.id })}
                                                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${answers.campusLife === item.id ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/30'}`}
                                                >
                                                    <span className="text-4xl">{item.emoji}</span>
                                                    <span className="text-sm font-medium">{t(item.label.ar, item.label.en)}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" {...stepVariants} className="space-y-6 py-4">
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold mb-6">{t('هل تجد سهولة في التعامل مع الأقسام الأكاديمية؟', 'Do you find it easy to deal with academic departments?')}</h3>
                                        <div className="space-y-3 max-w-sm mx-auto">
                                            {[
                                                { id: 'very_easy', icon: Zap, label: { ar: 'سهل جداً وسريع', en: 'Very easy and fast' }, color: 'text-blue-500' },
                                                { id: 'easy', icon: Shield, label: { ar: 'سهل نوعاً ما', en: 'Somewhat easy' }, color: 'text-green-500' },
                                                { id: 'hard', icon: AlertCircle, label: { ar: 'يوجد بعض الصعوبة', en: 'Some difficulties' }, color: 'text-amber-500' }
                                            ].map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => setAnswers({ ...answers, academicSupport: item.id })}
                                                    className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${answers.academicSupport === item.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                                                >
                                                    <div className={`p-2 rounded-lg bg-background border ${answers.academicSupport === item.id ? 'border-primary' : 'border-border'}`}>
                                                        {/* @ts-ignore */}
                                                        <item.icon className={`w-5 h-5 ${item.color}`} />
                                                    </div>
                                                    <span className="font-medium text-start">{t(item.label.ar, item.label.en)}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="step4" {...stepVariants} className="space-y-4 py-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MessageSquare className="w-5 h-5 text-primary" />
                                        <h3 className="text-lg font-bold">{t('ما هي مقترحاتك لتطوير الجامعة؟ (اختياري)', 'What are your suggestions for the university? (Optional)')}</h3>
                                    </div>
                                    <Textarea
                                        placeholder={t('اكتب مقترحاتك هنا...', 'Write your suggestions here...')}
                                        className="min-h-[150px] rounded-xl border-primary/20 focus:border-primary"
                                        value={answers.suggestions}
                                        onChange={(e) => setAnswers({ ...answers, suggestions: e.target.value })}
                                    />
                                    <div className="p-4 bg-muted rounded-xl flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-muted-foreground">
                                            {t('بمجرد إرسال الاستبيان، سيتم فتح لوحة التحكم الخاصة بك فوراً.', 'Once submitted, your dashboard will be unlocked immediately.')}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
                            <Button
                                variant="ghost"
                                onClick={handleBack}
                                disabled={step === 1}
                                className="gap-2 rounded-xl"
                            >
                                {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                                {t('السابق', 'Back')}
                            </Button>

                            {step < totalSteps ? (
                                <Button
                                    onClick={handleNext}
                                    disabled={
                                        (step === 1 && answers.digitalServices === 0) ||
                                        (step === 2 && !answers.campusLife) ||
                                        (step === 3 && !answers.academicSupport)
                                    }
                                    className="gap-2 bg-primary hover:bg-primary/90 text-white px-8 rounded-xl shadow-lg shadow-primary/20"
                                >
                                    {t('التالي', 'Next')}
                                    {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    className="gap-2 bg-green-600 hover:bg-green-700 text-white px-8 rounded-xl shadow-lg shadow-green-600/20"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    {t('إرسال وإنهاء', 'Submit & Finish')}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};
