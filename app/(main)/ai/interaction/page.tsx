import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { Handshake } from 'lucide-react';

export default function AiInteractionPage() {
  return (
    <PlaceholderPage
      title="How to Interact"
      titleRu="Как с ними взаимодействовать"
      description="Learn the best practices for communicating with your AI assistants"
      descriptionRu="Изучите лучшие практики общения с вашими ИИ-ассистентами"
      category="AI"
      categoryRu="ИИ"
      icon={<Handshake className="h-8 w-8 text-primary" />}
      backHref="/ai"
    />
  );
}