import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { Home } from 'lucide-react';

export default function SailingCabinPage() {
  return (
    <PlaceholderPage
      title="Cabin"
      titleRu="Кают-компания"
      description="Community space for sailors to share experiences and connect"
      descriptionRu="Общественное пространство для моряков, где можно делиться опытом и общаться"
      category="Yachting"
      categoryRu="Яхтинг"
      icon={<Home className="h-8 w-8 text-primary" />}
      backHref="/sailing"
    />
  );
}