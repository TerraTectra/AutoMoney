export type Marketplace = 'Ozon' | 'Wildberries' | 'Яндекс Маркет' | 'Универсально';

export type AuditInput = {
  marketplace: Marketplace;
  productName: string;
  category: string;
  audience: string;
  description: string;
  features: string;
  reviews: string;
};

export type AuditResult = {
  score: number;
  level: string;
  issues: string[];
  improvedTitle: string;
  shortDescription: string;
  usp: string[];
  seoKeywords: string[];
  reviewReply: string;
  checklist: string[];
};

const weakWords = ['хороший', 'качественный', 'лучший', 'удобный', 'отличный', 'недорогой'];
const benefitWords = ['экономит', 'защищает', 'ускоряет', 'подходит', 'помогает', 'решает', 'уменьшает'];

function splitWords(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^а-яёa-z0-9\s-]/gi, ' ')
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 3);
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function firstMeaningful(value: string, fallback: string): string {
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  return trimmed.length > 90 ? `${trimmed.slice(0, 90).trim()}…` : trimmed;
}

function scoreInput(input: AuditInput): { score: number; issues: string[] } {
  let score = 100;
  const issues: string[] = [];
  const titleWords = splitWords(input.productName);
  const descriptionWords = splitWords(input.description);
  const featureWords = splitWords(input.features);
  const combined = `${input.productName} ${input.description} ${input.features}`.toLowerCase();

  if (titleWords.length < 4) {
    score -= 18;
    issues.push('Заголовок слишком короткий: добавьте тип товара, ключевую характеристику и сценарий использования.');
  }

  if (input.productName.length > 115) {
    score -= 10;
    issues.push('Заголовок выглядит перегруженным: часть характеристик лучше перенести в описание.');
  }

  if (descriptionWords.length < 35) {
    score -= 20;
    issues.push('Описание короткое: не раскрыты выгоды, сценарии применения и возражения покупателя.');
  }

  if (featureWords.length < 8) {
    score -= 12;
    issues.push('Характеристик мало: маркетплейсу и покупателю сложнее понять, чем товар отличается от аналогов.');
  }

  if (!input.audience.trim()) {
    score -= 12;
    issues.push('Не указана целевая аудитория: без неё сложно сформулировать УТП и преимущества.');
  }

  if (!benefitWords.some((word) => combined.includes(word))) {
    score -= 10;
    issues.push('В тексте мало выгод: сейчас карточка больше описывает товар, чем объясняет пользу для покупателя.');
  }

  if (weakWords.some((word) => combined.includes(word))) {
    score -= 8;
    issues.push('Есть общие слова вроде “качественный” или “отличный”: замените их конкретными фактами и преимуществами.');
  }

  if (!input.reviews.trim()) {
    score -= 6;
    issues.push('Нет отзывов или возражений: добавьте ответы на частые сомнения покупателей.');
  }

  return {
    score: Math.max(15, Math.min(100, score)),
    issues: issues.slice(0, 5)
  };
}

function buildKeywords(input: AuditInput): string[] {
  const baseWords = unique([
    ...splitWords(input.productName),
    ...splitWords(input.category),
    ...splitWords(input.features),
    ...splitWords(input.audience)
  ]).slice(0, 14);

  const category = input.category.trim() || 'товар';
  const marketplace = input.marketplace === 'Универсально' ? 'маркетплейс' : input.marketplace;

  return unique([
    ...baseWords,
    `${category} для ${firstMeaningful(input.audience, 'дома')}`.toLowerCase(),
    `${category} ${marketplace}`.toLowerCase(),
    `купить ${category}`.toLowerCase(),
    `${category} с гарантией`.toLowerCase()
  ]).slice(0, 18);
}

export function generateAudit(input: AuditInput): AuditResult {
  const category = firstMeaningful(input.category, 'товар');
  const audience = firstMeaningful(input.audience, 'покупателей');
  const featureList = splitWords(input.features).slice(0, 6);
  const mainFeature = featureList[0] || 'практичный формат';
  const secondFeature = featureList[1] || 'удобное использование';
  const { score, issues } = scoreInput(input);
  const seoKeywords = buildKeywords(input);
  const level = score >= 80 ? 'Сильная карточка' : score >= 60 ? 'Средняя карточка' : 'Карточку нужно усиливать';

  const cleanName = firstMeaningful(input.productName, category);
  const improvedTitle = `${category} ${cleanName} — ${mainFeature}, для ${audience}`.replace(/\s+/g, ' ').trim();

  const shortDescription = `${cleanName} подойдёт для ${audience}. Товар помогает закрыть основную задачу покупателя за счёт: ${featureList.length ? featureList.join(', ') : 'понятных характеристик, удобного применения и практичной комплектации'}. В карточке стоит сделать акцент на сценариях использования, конкретных выгодах и отличиях от аналогов.`;

  const usp = [
    `Понятная выгода для ${audience}: покупатель сразу видит, зачем нужен товар.`,
    `Фокус на характеристике “${mainFeature}” вместо общих фраз.`,
    `Описание показывает сценарии применения, а не просто перечисляет параметры.`,
    `SEO-ключи встроены естественно, без переспама.`,
    `Ответы на возражения помогают снизить сомнения перед покупкой.`
  ];

  const reviewReply = `Здравствуйте! Спасибо за отзыв. Нам жаль, что товар не полностью оправдал ожидания. Подскажите, пожалуйста, что именно вызвало сложность: ${secondFeature}, комплектация или сценарий использования? Мы проверим ситуацию и поможем найти решение.`;

  const checklist = [
    'Добавить главный поисковый ключ ближе к началу заголовка.',
    'Переписать первые 2 строки описания через выгоду покупателя.',
    'Добавить 3–5 сценариев применения товара.',
    'Заменить общие слова на конкретные характеристики и факты.',
    'Добавить блок “кому подойдёт / кому не подойдёт”.',
    'Подготовить 3 ответа на частые негативные отзывы.',
    'Проверить, что характеристики совпадают с требованиями маркетплейса.'
  ];

  return {
    score,
    level,
    issues: issues.length ? issues : ['Критичных ошибок не найдено, но карточку можно усилить через УТП, сценарии применения и SEO-ключи.'],
    improvedTitle,
    shortDescription,
    usp,
    seoKeywords,
    reviewReply,
    checklist
  };
}
