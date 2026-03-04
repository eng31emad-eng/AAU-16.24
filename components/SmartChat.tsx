'use client'
import { useEffect, useRef, useState } from 'react';
import { Send, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * SmartChat v1.2 - Generic Assistant
 * Changes: Removed all role labels, detection logic, and added verification logging.
 */

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
};

export const SmartChat = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem('smartchat_messages');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Sync Verification Log
    console.log("SmartChat Initialized - v1.2 [Role-Free UI]");
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    localStorage.setItem('smartchat_messages', JSON.stringify(messages));
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: String(Date.now()), role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Placeholder: replace this block with actual AIP/API call
    setTimeout(() => {
      const reply: Message = {
        id: String(Date.now() + 1),
        role: 'assistant',
        text:
          (language === 'ar'
            ? 'شكراً لسؤالك — هذا رد تجريبي. سيتم ربط الدردشة بخدمة AIP لاحقاً لتقديم إجابات ذكية.'
            : 'Thanks — this is a demo reply. The chat will be connected to AIP later for smart responses.')
      };
      setMessages(prev => [...prev, reply]);
      setLoading(false);
    }, 900);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('smartchat_messages');
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed z-50 bottom-[calc(16px+env(safe-area-inset-bottom))] right-6">
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="w-14 h-14 rounded-full bg-secondary text-primary shadow-lg hover:shadow-xl ring-1 ring-black/5 flex items-center justify-center transition-shadow duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={() => setOpen(o => !o)}
          aria-label={t('الدردشة الذكية', 'Smart Chat')}
          title={t('المساعد الذكي', 'Smart Assistant')}
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-0 left-0 right-0 z-50 h-[100dvh] bg-card/95 backdrop-blur-lg rounded-none shadow-2xl border border-border/50 overflow-hidden flex flex-col sm:bottom-24 sm:left-auto sm:right-6 sm:h-[520px] sm:w-[340px] md:w-[420px] sm:rounded-2xl"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-bold">{t('المساعد الذكي', 'Smart Assistant')}</div>
                  <div className="text-xs text-muted-foreground">{t('نسعد بمساعدتك', 'Happy to help')}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearChat} className="text-xs text-muted-foreground hover:text-secondary px-2 py-1 transition-colors">
                  {t('مسح', 'Clear')}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div ref={listRef} className="flex-1 min-h-0 p-4 overflow-y-auto space-y-3 [-webkit-overflow-scrolling:touch]">
              {messages.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-12 flex flex-col gap-3 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 opacity-20" />
                  </div>
                  {t('ابدأ المحادثة بطرح سؤال...', 'Start the conversation by asking a question...')}
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${isRtl ? 'text-right' : 'text-left'} ${m.role === 'user' ? (isRtl ? 'mr-auto bg-secondary/20 text-foreground' : 'ml-auto bg-secondary/20 text-foreground') : (isRtl ? 'ml-auto bg-card/80 text-foreground' : 'mr-auto bg-card/80 text-foreground')}`}>
                  <div>{m.text}</div>
                  <div className={`text-[10px] text-muted-foreground mt-1 ${isRtl ? 'text-right' : 'text-left'}`}>{m.role === 'user' ? (language === 'ar' ? 'أنت' : 'You') : (language === 'ar' ? 'المساعد' : 'Assistant')}</div>
                </div>
              ))}
              {loading && (
                <div className="max-w-[85%] mr-auto bg-card/80 p-3 rounded-2xl text-sm text-muted-foreground flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" />
                  </div>
                  <span className="text-xs">{t('جاري تحضير الرد...', 'Preparing response...')}</span>
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-border/50 bg-background pb-[env(safe-area-inset-bottom)]">
              <div className="flex items-center gap-2">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder={t('اكتب سؤالك هنا واضغط Enter...', 'Type your question and press Enter...')}
                  className="flex-1 resize-none bg-muted/30 border border-border/30 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-secondary/50 transition-colors max-h-24 overflow-y-auto"
                />
                <Button size="sm" onClick={sendMessage} disabled={loading || !input.trim()} className="flex items-center gap-2 rounded-lg bg-secondary text-primary hover:bg-secondary/90 h-10">
                  <Send className="w-4 h-4" />
                  {t('إرسال', 'Send')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmartChat;
