// Тест только OpenAI API без базы данных
require('dotenv').config({ path: '.env.local' });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ Отсутствует OPENAI_API_KEY');
  process.exit(1);
}

// FAQ ответ с моковым контекстом
async function getFAQResponse(userQuestion, context) {
  const systemPrompt = `Ты FAQ ассистент DAOsail — строгий и точный помощник по базе знаний проекта.

🎯 ГЛАВНОЕ ПРАВИЛО: Отвечаешь ТОЛЬКО по предоставленному контексту. Никаких выдумок!

📋 ИНСТРУКЦИИ:
• Если есть информация в контексте → отвечай четко и кратко
• Если информации НЕТ → скажи "В базе знаний нет информации по этому вопросу"
• Никогда не добавляй информацию "от себя" или из общих знаний
• Ссылайся на номера источников в ответе [1], [2] если нужно
• Тон: деловой, но дружелюбный
• Длина: 1-3 предложения, максимум 150 слов

Предоставленный контекст:
${context}

Вопрос пользователя: ${userQuestion}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userQuestion }
      ],
      max_tokens: 300,
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function testOpenAI() {
  console.log('🤖 Тестируем OpenAI API и FAQ промпт...\n');

  // Моковый контекст из нашего FAQ
  const mockContext = `[1] DAOsail — это инновационная экосистема, объединяющая парусный спорт и децентрализованные автономные организации (DAO). Проект создает уникальное сообщество для энтузиастов яхтинга, использующих современные технологии блокчейна и искусственного интеллекта.
(Источник: simple-faq-data.md, релевантность: 95%)

[2] Основная цель DAOsail — демократизация яхтинга через коллективное владение яхтами, прозрачное управление и справедливое распределение доходов между участниками сообщества.
(Источник: simple-faq-data.md, релевантность: 88%)`;

  const testCases = [
    {
      question: 'Что такое DAOsail?',
      context: mockContext,
      expectation: 'Должен ответить на основе контекста'
    },
    {
      question: 'Какие роли есть в сообществе?',
      context: mockContext,
      expectation: 'Должен сказать что информации нет в контексте'
    },
    {
      question: 'Сколько стоит биткоин?',
      context: mockContext,
      expectation: 'Должен сказать что информации нет в базе знаний'
    },
    {
      question: 'Расскажи о целях проекта',
      context: mockContext,
      expectation: 'Должен рассказать о демократизации яхтинга'
    }
  ];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];

    console.log(`\n📝 Тест ${i + 1}: "${testCase.question}"`);
    console.log(`🎯 Ожидание: ${testCase.expectation}`);
    console.log('─'.repeat(60));

    try {
      const answer = await getFAQResponse(testCase.question, testCase.context);
      console.log('🤖 Ответ агента:');
      console.log(`"${answer}"`);

      // Простая проверка качества ответа
      if (testCase.question.includes('биткоин') || testCase.question.includes('роли')) {
        if (answer.includes('нет информации') || answer.includes('No information')) {
          console.log('✅ Корректно отказался отвечать');
        } else {
          console.log('⚠️  Возможная галлюцинация - ответил на вопрос вне контекста');
        }
      } else {
        if (answer.includes('DAOsail') || answer.includes('парусный') || answer.includes('демократизация')) {
          console.log('✅ Использовал информацию из контекста');
        } else {
          console.log('⚠️  Возможно игнорирует контекст');
        }
      }

      // Задержка между запросами
      if (i < testCases.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } catch (error) {
      console.error('❌ Ошибка:', error.message);
    }
  }

  console.log('\n🎉 Тестирование OpenAI завершено!');
  console.log('\n💡 Следующий шаг: настроить базу данных и векторный поиск');
}

testOpenAI().catch(console.error);