import { z } from 'zod';

export const contactFormSchema = z.object({
    name: z.string()
        .min(2, { message: { ar: 'الاسم يجب أن يكون حرفين على الأقل', en: 'Name must be at least 2 characters' } as any })
        .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: { ar: 'يرجى استخدام الحروف فقط', en: 'Please use letters only' } as any }),
    email: z.string().email({ message: { ar: 'يرجى إدخال بريد إلكتروني صحيح', en: 'Please enter a valid email address' } as any }),
    subject: z.string()
        .min(5, { message: { ar: 'الموضوع يجب أن يكون 5 أحرف على الأقل', en: 'Subject must be at least 5 characters' } as any })
        .regex(/^[^<>]+$/, { message: { ar: 'يحتوي الموضوع على رموز غير مسموح بها', en: 'Subject contains invalid characters' } as any }),
    message: z.string()
        .min(10, { message: { ar: 'الرسالة يجب أن تكون 10 أحرف على الأقل', en: 'Message must be at least 10 characters' } as any })
        .regex(/^[^<>]+$/, { message: { ar: 'تحتوي الرسالة على رموز غير مسموح بها', en: 'Message contains invalid characters' } as any }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
