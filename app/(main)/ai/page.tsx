import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { Bot } from 'lucide-react';

export default function AiPage() {
  return (
    <PlaceholderPage
      title="AI"
      titleRu="ИИ"
      description="Artificial Intelligence assistants and tools for the modern sailor"
      descriptionRu="Искусственные интеллекты-ассистенты и инструменты для современного моряка"
      category="Technology"
      categoryRu="Технологии"
      icon={<Bot className="h-12 w-12 text-primary" />}
      backHref="/"
    />
  );
}