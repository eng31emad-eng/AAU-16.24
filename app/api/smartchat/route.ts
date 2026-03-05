import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const TOP_K = 4;
const MIN_SIMILARITY = 0.35;
const EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-001';
const GENERATION_MODELS = (
  process.env.GEMINI_GENERATION_MODELS ||
  'gemini-2.5-flash,gemini-flash-lite-latest,gemini-2.0-flash'
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const MAX_RETRIES = 2;
const INDEX_PATH = path.join(process.cwd(), 'data', 'faq_index.json');

const EMPTY_QUESTION_MESSAGE = 'اكتب سؤالك من فضلك.';
const NO_INFO_MESSAGE = 'حاليًا لا أجد إجابة مباشرة لهذا السؤال ضمن بيانات الموقع المتاحة لدي.';
const OUTSIDE_MESSAGE = 'أعتذر، أنا مساعد مخصص لأسئلة جامعة الجيل الجديد فقط. اسألني عن القبول، الكليات، البرامج، الرسوم، أو خدمات الجامعة.';
const GENERIC_ERROR_MESSAGE = 'حدث خلل مؤقت. حاول مرة أخرى بعد قليل.';

type QuestionType = 'small_talk' | 'university' | 'outside';

type IndexItem = {
  id: number;
  question: string;
  answer: string;
  embedding: number[];
};

type IndexFile = {
  createdAt: string;
  count: number;
  model: string;
  items: IndexItem[];
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function getTopMatches(questionEmbedding: number[], items: IndexItem[], topK = TOP_K) {
  return items
    .map((item) => ({
      ...item,
      score: cosineSimilarity(questionEmbedding, item.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

function normalizeArabicText(text: string) {
  return text
    .replace(/[\u064B-\u0652]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeQuestion(question: string) {
  let q = question;
  const slangMap: Array<[RegExp, string]> = [
    [/\bفين\b/gi, 'اين'],
    [/\bوين\b/gi, 'اين'],
    [/\bايش\b/gi, 'ما'],
    [/\bاش\b/gi, 'ما'],
    [/\bشلون\b/gi, 'كيف'],
    [/\bقديش\b/gi, 'كم']
  ];
  for (const [pattern, replacement] of slangMap) {
    q = q.replace(pattern, replacement);
  }
  return normalizeArabicText(q).toLowerCase();
}

function includesAny(text: string, phrases: string[]) {
  return phrases.some((p) => text.includes(p));
}

function classifyQuestion(question: string): QuestionType {
  const q = normalizeQuestion(question);
  if (
    includesAny(q, [
      'السلام عليكم',
      'السلام',
      'مرحبا',
      'اهلا',
      'ما اسمك',
      'من انت',
      'مين انت',
      'كيف استخدم الشات',
      'ساعدني'
    ]) ||
    /(hi|hello|your name|who are you|help)/i.test(q)
  ) {
    return 'small_talk';
  }
  if (
    includesAny(q, [
      'جامعه',
      'الجامعه',
      'الجيل الجديد',
      'قبول',
      'تسجيل',
      'رسوم',
      'منح',
      'كليه',
      'الكليات',
      'برنامج',
      'برامج',
      'تخصص',
      'الموقع',
      'العنوان',
      'تواصل',
      'البريد',
      'الهاتف',
      'شؤون الطلاب',
      'الدوام',
      'المواعيد',
      'اين',
      'وين',
      'فين'
    ]) ||
    /(aau|admission|registration|tuition|college|program|university|campus)/i.test(q)
  ) {
    return 'university';
  }

  return 'outside';
}

function getSmallTalkReply(question: string) {
  const q = normalizeQuestion(question);

  if (includesAny(q, ['السلام عليكم', 'السلام', 'مرحبا', 'اهلا']) || /(hi|hello)/i.test(q)) {
    return 'وعليكم السلام! أنا مساعد الموقع. اسألني عن الجامعة وسأجيبك من معلومات الموقع.';
  }
  if (includesAny(q, ['ما اسمك', 'من انت', 'مين انت']) || /(your name|who are you)/i.test(q)) {
    return 'أنا مساعد جامعة الجيل الجديد. أجيب فقط من بيانات الموقع.';
  }
  if (includesAny(q, ['كيف استخدم الشات', 'ساعدني']) || /(help)/i.test(q)) {
    return 'اكتب سؤالك عن القبول، الكليات، البرامج، الرسوم، الموقع... وسأساعدك.';
  }
  if (includesAny(q, ['كيف حالك', 'اخبارك']) || /(how are you)/i.test(q)) {
    return 'أنا بخير، شكرًا لك. أنا هنا لمساعدتك فيما يخص جامعة الجيل الجديد.';
  }
  return 'مرحبًا بك! اسألني أي سؤال يتعلق بجامعة الجيل الجديد.';
}

function getLowSimilarityReply(suggestions: string[]) {
  const lines = [
    `${NO_INFO_MESSAGE} لأساعدك بشكل أدق، هل تقصد:`,
    '- القبول والتسجيل؟',
    '- الرسوم والمنح؟',
    '- البرامج/التخصصات؟',
    '- التواصل والعنوان؟',
    'اكتب اسم الكلية/البرنامج أو أي تفاصيل إضافية وسأوجهك لأقرب معلومات متاحة.'
  ];
  if (suggestions.length > 0) {
    lines.push('قد تفيدك هذه الأسئلة القريبة:');
    for (const s of suggestions) lines.push(`- ${s}`);
  }
  return lines.join('\n');
}

async function postJsonWithRetry(url: string, body: unknown, retries = MAX_RETRIES) {
  let last: { status: number; message: string } | null = null;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (response.ok) return { status: response.status, data: await response.json() };

    const errText = await response.text();
    last = { status: response.status, message: errText };
    const canRetry = response.status === 429 || response.status >= 500;
    if (!canRetry || attempt === retries) break;
    await sleep(1200 * (attempt + 1));
  }
  return {
    status: last?.status || 500,
    data: null,
    errorText: last?.message || 'Unknown error'
  };
}

async function embedTextGemini(apiKey: string, text: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent?key=${encodeURIComponent(apiKey)}`;
  const result = await postJsonWithRetry(url, {
    content: { parts: [{ text }] }
  });
  if (!result.data) {
    throw new Error(`Gemini embedding request failed (${result.status}): ${result.errorText}`);
  }
  const values = result.data?.embedding?.values;
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error('Gemini embedding response is invalid.');
  }
  return values as number[];
}

async function tryGenerateWithModel(apiKey: string, model: string, prompt: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const result = await postJsonWithRetry(url, {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.25 }
  });
  if (!result.data) {
    return { ok: false, status: result.status, errorText: result.errorText };
  }
  const text = result.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  return { ok: true, text: text || '' };
}

async function generateAnswerGemini(apiKey: string, question: string, topMatches: Array<IndexItem & { score: number }>) {
  const context = topMatches
    .map((item, i) => `Q${i + 1}: ${item.question}\nA${i + 1}: ${item.answer}`)
    .join('\n\n');

  const prompt = [
    'أنت مساعد رسمي لجامعة الجيل الجديد.',
    'التعليمات:',
    '- أجب باللغة العربية بأسلوب مهذب ومنظم ومختصر.',
    '- أجب فقط من "المصدر".',
    '- لا تضف أي معلومة غير موجودة في المصدر.',
    `- إذا كانت الإجابة غير متوفرة بوضوح من المصدر، أعد هذه الجملة فقط: ${NO_INFO_MESSAGE}`,
    '- إذا كانت المعلومة غير مؤكدة، استخدم صياغة عامة بدون أرقام أو حقائق جديدة.',
    '',
    `السؤال:\n${question}`,
    '',
    `المصدر:\n${context}`
  ].join('\n');

  let lastError = '';
  for (const model of GENERATION_MODELS) {
    const result = await tryGenerateWithModel(apiKey, model, prompt);
    if (result.ok && result.text) return result.text;
    lastError = `model=${model} status=${result.status} error=${result.errorText}`;
  }
  console.error(`Gemini generation failed on all models. ${lastError}`);
  return NO_INFO_MESSAGE;
}

function loadIndexFile(): IndexFile {
  if (!fs.existsSync(INDEX_PATH)) {
    throw new Error('data/faq_index.json not found.');
  }
  const parsed = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8')) as IndexFile;
  if (!Array.isArray(parsed.items) || parsed.items.length === 0) {
    throw new Error('data/faq_index.json is empty or invalid.');
  }
  return parsed;
}

export async function POST(req: Request) {
  try {
    let body: unknown = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ answer: EMPTY_QUESTION_MESSAGE, type: 'small_talk', suggestions: [] });
    }

    const questionRaw = typeof (body as { question?: unknown })?.question === 'string'
      ? (body as { question: string }).question
      : '';
    const question = questionRaw.trim();

    if (!question) {
      return NextResponse.json({ answer: EMPTY_QUESTION_MESSAGE, type: 'small_talk', suggestions: [] });
    }

    const type = classifyQuestion(question);

    if (type === 'small_talk') {
      return NextResponse.json({ answer: getSmallTalkReply(question), type, suggestions: [] });
    }

    if (type === 'outside') {
      return NextResponse.json({ answer: OUTSIDE_MESSAGE, type, suggestions: [] });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ answer: GENERIC_ERROR_MESSAGE, type: 'university', suggestions: [] });
    }

    const index = loadIndexFile();
    const normalizedQuestion = normalizeQuestion(question);
    const questionEmbedding = await embedTextGemini(apiKey, normalizedQuestion || question);
    const topMatches = getTopMatches(questionEmbedding, index.items, TOP_K);
    const topScore = topMatches[0]?.score ?? 0;
    const suggestions = topMatches.slice(0, 3).map((m) => m.question);

    if (topScore < MIN_SIMILARITY) {
      return NextResponse.json({
        answer: getLowSimilarityReply(suggestions),
        type: 'university',
        suggestions
      });
    }

    const answer = await generateAnswerGemini(apiKey, question, topMatches);
    return NextResponse.json({
      answer: answer || NO_INFO_MESSAGE,
      type: 'university',
      suggestions
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown server error.';
    console.error('smartchat api error:', message);
    return NextResponse.json({ answer: GENERIC_ERROR_MESSAGE, type: 'university', suggestions: [] });
  }
}
