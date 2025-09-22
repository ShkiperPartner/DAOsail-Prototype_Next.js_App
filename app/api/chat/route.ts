import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/lib/supabase/server';

// Инициализируем OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Функция для поиска релевантного контекста с учетом роли пользователя
async function getRelevantContext(
  userMessage: string,
  assistantType: 'navigator' | 'skipper',
  userRole: string = 'Интересующийся',
  language: 'ru' | 'en' = 'ru'
): Promise<{ context: string; chunksUsed: number }> {
  try {
    // Создаем embedding для пользовательского сообщения
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: userMessage.trim(),
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;

    // Определяем доступные роли для пользователя
    const getAccessibleRoles = (role: string): string[] => {
      const roleHierarchy: Record<string, string[]> = {
        'Интересующийся': ['public'],
        'Пассажир': ['public', 'passenger'],
        'Матрос': ['public', 'passenger', 'sailor'],
        'Партнер': ['public', 'passenger', 'sailor', 'partner'],
        'admin': ['public', 'passenger', 'sailor', 'partner', 'admin']
      };
      return roleHierarchy[role] || ['public'];
    };

    const accessibleRoles = getAccessibleRoles(userRole);

    // Определяем категории для каждого типа ассистента
    const categoryMap = {
      navigator: ['sailing_basics', 'navigation', 'weather', 'equipment'],
      skipper: ['safety', 'crew_management', 'emergency', 'racing']
    };

    const supabase = await createClient();
    let allResults: any[] = [];

    // Ищем по релевантным категориям с фильтрацией по ролям
    for (const category of categoryMap[assistantType]) {
      const { data } = await supabase.rpc('search_knowledge_documents_by_role', {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: 2,
        filter_category: category,
        filter_language: language,
        accessible_roles: accessibleRoles
      });

      if (data && data.length > 0) {
        allResults.push(...data);
      }
    }

    if (allResults.length === 0) {
      return { context: '', chunksUsed: 0 };
    }

    // Убираем дубликаты и сортируем по релевантности
    const uniqueResults = allResults
      .filter((doc, index, self) => index === self.findIndex(d => d.id === doc.id))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3);

    // Формируем контекст с метаданными о уровне доступа
    const accessLevel = accessibleRoles[accessibleRoles.length - 1];
    const contextParts = uniqueResults.map(doc =>
      `**${doc.title}** (${doc.knowledge_level || 'basic'}, ${doc.target_audience || 'general'})\n${doc.content}`
    );

    const contextHeader = language === 'ru'
      ? `Контекст из базы знаний (уровень доступа: ${accessLevel}):`
      : `Context from knowledge base (access level: ${accessLevel}):`;

    return {
      context: `${contextHeader}\n\n${contextParts.join('\n\n---\n\n')}`,
      chunksUsed: uniqueResults.length
    };

  } catch (error) {
    console.error('Error getting relevant context:', error);
    return { context: '', chunksUsed: 0 };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages, assistantType, userRole, userId, filesContext } = await request.json();

    // Проверяем аутентификацию пользователя (для гостей разрешаем с ограничениями)
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    // Для гостей используем базовую роль
    const effectiveUserRole = user ? userRole || 'Интересующийся' : 'Интересующийся';
    const isGuest = !user;

    // Валидация входных данных
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    // Определяем язык пользователя (можно расширить логику)
    const userLanguage = 'ru'; // Пока по умолчанию русский, позже можно брать из профиля пользователя

    // Получаем последнее сообщение пользователя для поиска контекста
    const lastUserMessage = messages[messages.length - 1];
    let contextResult = { context: '', chunksUsed: 0 };

    if (lastUserMessage && lastUserMessage.role === 'user') {
      contextResult = await getRelevantContext(
        lastUserMessage.content,
        assistantType,
        effectiveUserRole,
        userLanguage
      );
    }

    // Настройка системного промпта в зависимости от типа ассистента
    const baseSystemPrompts = {
      navigator: {
        ru: `Ты - Навигатор DAOsail, эксперт по парусному спорту, навигации и морским путешествиям.
        Ты помогаешь пользователям изучать основы парусного спорта, планировать маршруты, понимать погодные условия и навигационные системы.
        Отвечай дружелюбно, используя морскую терминологию где уместно. Всегда давай практичные советы.

        ${contextResult.context ? 'ВАЖНО: Используй информацию из базы знаний ниже для более точных ответов, но не ссылайся на неё напрямую. Отвечай естественно, как будто это твои собственные знания.' : ''}

        Если не знаешь точного ответа, честно скажи об этом и предложи где можно найти информацию.`,
        en: `You are Navigator DAOsail, an expert in sailing, navigation, and maritime voyages.
        You help users learn sailing basics, plan routes, understand weather conditions and navigation systems.
        Respond in a friendly manner, using maritime terminology where appropriate. Always give practical advice.

        ${contextResult.context ? 'IMPORTANT: Use the information from the knowledge base below for more accurate answers, but don\'t reference it directly. Answer naturally as if it\'s your own knowledge.' : ''}

        If you don't know the exact answer, be honest about it and suggest where to find the information.`
      },
      skipper: {
        ru: `Ты - Шкипер DAOsail, опытный капитан с многолетним опытом управления яхтами и командой.
        Ты специализируешься на безопасности на воде, управлении экипажем, принятии решений в сложных ситуациях.
        Отвечай как опытный наставник, делись реальным опытом и практическими советами.

        ${contextResult.context ? 'ВАЖНО: Используй информацию из базы знаний ниже для более точных ответов, но не ссылайся на неё напрямую. Отвечай естественно, как будто это твои собственные знания.' : ''}

        Всегда подчеркивай важность безопасности и ответственного подхода к парусному спорту.`,
        en: `You are Skipper DAOsail, an experienced captain with years of yacht and crew management experience.
        You specialize in water safety, crew management, and decision-making in challenging situations.
        Respond as an experienced mentor, sharing real experience and practical advice.

        ${contextResult.context ? 'IMPORTANT: Use the information from the knowledge base below for more accurate answers, but don\'t reference it directly. Answer naturally as if it\'s your own knowledge.' : ''}

        Always emphasize the importance of safety and responsible approach to sailing.`
      }
    };

    // Формируем итоговый системный промпт
    let systemPrompt = baseSystemPrompts[assistantType as keyof typeof baseSystemPrompts]?.[userLanguage]
      || baseSystemPrompts.navigator.ru;

    // Добавляем контекст, если он найден
    if (contextResult.context) {
      systemPrompt += `\n\n${contextResult.context}`;
    }

    // Добавляем контекст файлов, если есть
    if (filesContext && filesContext.trim()) {
      systemPrompt += `\n\n${filesContext}`;
    }

    // Подготавливаем сообщения для OpenAI
    const openaiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Проверяем, нужен ли стриминг (из query параметров)
    const url = new URL(request.url);
    const useStreaming = url.searchParams.get('stream') === 'true';

    if (useStreaming) {
      // Создаем стрим для OpenAI
      const stream = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: openaiMessages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      });

      // Создаем ReadableStream для передачи данных клиенту
      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          let fullContent = '';

          try {
            // Отправляем метаданные в начале стрима
            const metadata = {
              type: 'metadata',
              assistantType,
              userRole: effectiveUserRole,
              knowledgeChunksUsed: contextResult.chunksUsed,
              isGuest,
              timestamp: new Date().toISOString()
            };

            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(metadata)}\n\n`)
            );

            // Обрабатываем стрим от OpenAI
            for await (const chunk of stream) {
              const content = chunk.choices[0]?.delta?.content;
              if (content) {
                fullContent += content;

                const streamData = {
                  type: 'content',
                  content: content,
                  fullContent: fullContent
                };

                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify(streamData)}\n\n`)
                );
              }

              // Проверяем завершение стрима
              if (chunk.choices[0]?.finish_reason) {
                const finishData = {
                  type: 'finish',
                  reason: chunk.choices[0].finish_reason,
                  fullContent: fullContent,
                  message: {
                    role: 'assistant' as const,
                    content: fullContent,
                    timestamp: new Date().toISOString(),
                    model: 'gpt-4o-mini',
                    assistantType,
                    metadata: {
                      userRole: effectiveUserRole,
                      knowledgeChunksUsed: contextResult.chunksUsed,
                      accessLevel: effectiveUserRole === 'Интересующийся' ? 'public' :
                                   effectiveUserRole === 'Пассажир' ? 'passenger' :
                                   effectiveUserRole === 'Матрос' ? 'sailor' : 'partner',
                      isGuest
                    }
                  }
                };

                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify(finishData)}\n\n`)
                );
                break;
              }
            }
          } catch (error) {
            const errorData = {
              type: 'error',
              error: error instanceof Error ? error.message : 'Unknown error'
            };

            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`)
            );
          } finally {
            controller.close();
          }
        }
      });

      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    } else {
      // Обычный (не-стрим) ответ
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: openaiMessages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      });

      const aiResponse = completion.choices[0]?.message?.content;

      if (!aiResponse) {
        return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
      }

      // Подготавливаем ответ с метаданными
      const response = {
        role: 'assistant' as const,
        content: aiResponse,
        timestamp: new Date().toISOString(),
        model: 'gpt-4o-mini',
        assistantType,
        metadata: {
          userRole: effectiveUserRole,
          knowledgeChunksUsed: contextResult.chunksUsed,
          accessLevel: effectiveUserRole === 'Интересующийся' ? 'public' :
                       effectiveUserRole === 'Пассажир' ? 'passenger' :
                       effectiveUserRole === 'Матрос' ? 'sailor' : 'partner',
          isGuest
        }
      };

      // Возвращаем результат с дополнительной информацией
      return NextResponse.json({
        message: response,
        usage: {
          prompt_tokens: completion.usage?.prompt_tokens || 0,
          completion_tokens: completion.usage?.completion_tokens || 0,
          total_tokens: completion.usage?.total_tokens || 0
        },
        knowledgeChunksUsed: contextResult.chunksUsed,
        userRole: effectiveUserRole,
        isGuest
      });
    }

  } catch (error) {
    console.error('Chat API Error:', error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Опционально: GET для получения истории чатов
export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // TODO: Получить историю чатов пользователя из Supabase

  return NextResponse.json({ chats: [] });
}