import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { Brain } from 'lucide-react';

export default function AiSkippersPage() {
  return (
    <PlaceholderPage
      title="Digital Skippers"
      titleRu="Цифровые Шкиперы"
      description="Meet our AI assistants - your digital crew members ready to help"
      descriptionRu="Познакомьтесь с нашими ИИ-ассистентами - вашими цифровыми членами экипажа, готовыми помочь"
      category="AI"
      categoryRu="ИИ"
      icon={<Brain className="h-8 w-8 text-primary" />}
      backHref="/ai"
    />
  );
}