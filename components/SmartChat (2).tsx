'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  suggestions?: string[];
};

export const SmartChat = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'student' | 'doctor' | 'guest' | 'editor' | 'admin'>('guest');
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userRole');
    if (stored) {
      if (stored === 'student') setRole('student');
      else if (stored === 'teacher') setRole('doctor');
      else if (stored === 'editor') setRole('editor');
      else if (stored === 'admin') setRole('admin');
      else setRole('guest');
    }
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const inferred = inferRoleFromText(input.trim());
    if (inferred && inferred !== role) {
      setRole(inferred);
      const sysMsg: Message = {
        id: String(Date.now() + 1),
        role: 'system',
        text: language === 'ar' ? `تم التعرف عليك كـ ${roleLabel(inferred)}` : `Detected as ${roleLabel(inferred)}`
      };
      setMessages((prev) => [...prev, sysMsg]);
    }

    const userMsg: Message = { id: String(Date.now()), role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/smartchat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg.text })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.error) {
        const reply: Message = {
          id: String(Date.now() + 1),
          role: 'assistant',
          text:
            language === 'ar'
              ? 'عذرًا، حدثت مشكلة مؤقتة. حاول مرة أخرى بعد قليل.'
              : 'A temporary issue occurred. Please try again shortly.'
        };
        setMessages((prev) => [...prev, reply]);
        return;
      }

      const reply: Message = {
        id: String(Date.now() + 1),
        role: 'assistant',
        text:
          typeof data?.answer === 'string' && data.answer.trim()
            ? data.answer.trim()
            : language === 'ar'
              ? 'لا أملك معلومة كافية من المصدر.'
              : 'I do not have enough information from the source.',
        suggestions: Array.isArray(data?.suggestions)
          ? data.suggestions.filter((s: unknown) => typeof s === 'string' && s.trim()).slice(0, 3)
          : []
      };
      setMessages((prev) => [...prev, reply]);
    } catch {
      const reply: Message = {
        id: String(Date.now() + 1),
        role: 'assistant',
        text:
          language === 'ar'
            ? 'لا أستطيع الرد الآن. حاول مرة أخرى.'
            : 'An error occurred while fetching the answer. Please try again.'
      };
      setMessages((prev) => [...prev, reply]);
    } finally {
      setLoading(false);
    }
  };

  const inferRoleFromText = (text: string): 'student' | 'doctor' | 'editor' | 'admin' | 'guest' => {
    const tLower = text.toLowerCase();
    if (/\b(طالب|طالبة|الدراسة|مقرر|مشروع|تسجيل)\b/.test(tLower) || tLower.includes('طالب')) return 'student';
    if (/\b(دكتور|دكتورة|أستاذ|أستاذة)\b/.test(tLower) || tLower.includes('دكتور') || tLower.includes('أستاذ')) return 'doctor';
    if (/\b(محرر|تحرير|نشر|محتوى)\b/.test(tLower) || tLower.includes('محرر')) return 'editor';
    if (/\b(ادمن|مسؤول|admin|administrator|مدير)\b/.test(tLower) || tLower.includes('ادمن') || tLower.includes('مسؤول')) return 'admin';
    if (tLower.match(/\b(student|homework|course|enroll|degree)\b/)) return 'student';
    if (tLower.match(/\b(professor|doctor|faculty|lecturer)\b/)) return 'doctor';
    if (tLower.match(/\b(editor|content|publish)\b/)) return 'editor';
    if (tLower.match(/\b(admin|administrator|manager)\b/)) return 'admin';
    return 'guest';
  };

  const roleLabel = (r: string) => {
    if (r === 'student') return language === 'ar' ? 'طالب' : 'Student';
    if (r === 'doctor') return language === 'ar' ? 'دكتور' : 'Doctor';
    if (r === 'editor') return language === 'ar' ? 'محرر محتوى' : 'Editor';
    if (r === 'admin') return language === 'ar' ? 'ادمن' : 'Admin';
    return language === 'ar' ? 'زائر' : 'Guest';
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      <div className="fixed z-50 bottom-[calc(16px+env(safe-area-inset-bottom))] right-6">
        <motion.button
          whileTap={{ scale: 0.96 }}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary via-secondary/90 to-gold-light text-primary shadow-lg hover:shadow-xl ring-1 ring-black/5 flex items-center justify-center transition-shadow duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={() => setOpen((o) => !o)}
          aria-label={t('الدردشة الذكية', 'Smart Chat')}
          title={t('المساعد الذكي', 'Smart Assistant')}
        >
          <span className="absolute inset-0 rounded-2xl border border-white/20" />
          <span className="absolute top-1.5 h-1.5 w-1.5 rounded-full bg-primary/80" />
          <span className="absolute top-2.5 left-4 h-1.5 w-1.5 rounded-full bg-primary/80" />
          <span className="absolute top-2.5 right-4 h-1.5 w-1.5 rounded-full bg-primary/80" />
          <Bot className="w-7 h-7" />
        </motion.button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-0 left-0 right-0 z-50 h-[100dvh] bg-card/95 backdrop-blur-lg rounded-none shadow-2xl border border-secondary/40 overflow-hidden flex flex-col sm:bottom-24 sm:left-auto sm:right-6 sm:h-[520px] sm:w-[340px] md:w-[420px] sm:rounded-2xl"
        >
          <div className="relative flex items-center justify-between px-4 py-3 border-b border-secondary/25 bg-gradient-to-r from-secondary/10 to-gold-light/10">
            <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/20 text-secondary shadow-sm">
                <span className="absolute top-1 h-1 w-1 rounded-full bg-secondary" />
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold">{t('الروبوت الذكي', 'Smart Robot')}</div>
                <div className="text-xs text-muted-foreground">{t('نسعد بمساعدتك', 'Happy to help')}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {role === 'guest'
                    ? t('زائر', 'Guest')
                    : role === 'student'
                      ? t('طالب', 'Student')
                      : role === 'doctor'
                        ? t('دكتور', 'Doctor')
                        : role === 'editor'
                          ? t('محرر محتوى', 'Editor')
                          : t('ادمن', 'Admin')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearChat} className="text-xs text-muted-foreground hover:text-secondary">
                {t('مسح', 'Clear')}
              </button>
              <button onClick={() => setOpen(false)} className="p-2 rounded hover:bg-muted transition-colors duration-150">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div ref={listRef} className="flex-1 min-h-0 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-transparent to-secondary/5 [-webkit-overflow-scrolling:touch]">
            {messages.length === 0 && (
              <div className="text-center text-sm text-muted-foreground mt-12">
                {t('ابدأ المحادثة بطرح سؤال...', 'Start the conversation by asking a question...')}
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${isRtl ? 'text-right' : 'text-left'} ${m.role === 'user' ? 'ml-auto bg-secondary/20 text-foreground border border-secondary/20' : 'mr-auto bg-card/85 text-foreground border border-border/40 shadow-sm'}`}
              >
                <div>{m.text}</div>
                {m.role === 'assistant' && Array.isArray(m.suggestions) && m.suggestions.length > 0 && (
                  <ul className={`mt-2 text-xs text-muted-foreground list-disc ${isRtl ? 'pr-5' : 'pl-5'}`}>
                    {m.suggestions.map((s, idx) => (
                      <li key={`${m.id}-s-${idx}`}>{s}</li>
                    ))}
                  </ul>
                )}
                <div className={`text-[10px] text-muted-foreground mt-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {m.role === 'user' ? (language === 'ar' ? 'أنت' : 'You') : language === 'ar' ? 'المساعد' : 'Assistant'}
                </div>
              </div>
            ))}

            {loading && (
              <div className="max-w-[85%] mr-auto bg-card/80 p-3 rounded-2xl text-sm text-muted-foreground flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
                {t('جاري تجهيز الرد...', 'Preparing response...')}
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-border/50 bg-background pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center gap-2">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={t('اكتب سؤالك هنا واضغط Enter...', 'Type your question and press Enter...')}
                className="flex-1 resize-none bg-transparent border border-border/30 rounded-lg px-3 py-2 text-sm outline-none max-h-24 overflow-y-auto"
              />
              <Button size="sm" onClick={sendMessage} disabled={loading || !input.trim()} className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                {t('إرسال', 'Send')}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SmartChat;
