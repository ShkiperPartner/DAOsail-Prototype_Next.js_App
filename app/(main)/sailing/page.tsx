import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { Anchor } from 'lucide-react';

export default function SailingPage() {
  return (
    <PlaceholderPage
      title="Yachting"
      titleRu="Яхтинг"
      description="Everything about sailing - from learning to advanced techniques and tools"
      descriptionRu="Всё о парусном спорте - от обучения до продвинутых техник и инструментов"
      category="Navigation"
      categoryRu="Навигация"
      icon={<Anchor className="h-12 w-12 text-primary" />}
      backHref="/"
    />
  );
}