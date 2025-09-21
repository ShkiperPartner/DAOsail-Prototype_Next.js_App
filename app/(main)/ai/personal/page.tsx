import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { UserCog } from 'lucide-react';

export default function AiPersonalPage() {
  return (
    <PlaceholderPage
      title="Your Personal Skipper"
      titleRu="Ваш личный Шкипер"
      description="Configure and interact with your personalized AI skipper companion"
      descriptionRu="Настройте и взаимодействуйте с вашим персонализированным ИИ-шкипером компаньоном"
      category="AI"
      categoryRu="ИИ"
      icon={<UserCog className="h-8 w-8 text-primary" />}
      backHref="/ai"
    />
  );
}