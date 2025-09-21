import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { Gamepad2 } from 'lucide-react';

export default function SailingGamesPage() {
  return (
    <PlaceholderPage
      title="Games"
      titleRu="Игры"
      description="Fun sailing games and interactive challenges"
      descriptionRu="Увлекательные парусные игры и интерактивные вызовы"
      category="Yachting"
      categoryRu="Яхтинг"
      icon={<Gamepad2 className="h-8 w-8 text-primary" />}
      backHref="/sailing"
    />
  );
}