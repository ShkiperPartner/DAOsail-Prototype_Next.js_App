import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { Database } from 'lucide-react';

export default function SailingDataPage() {
  return (
    <PlaceholderPage
      title="Useful Data"
      titleRu="Полезные данные"
      description="Weather data, charts, navigation tools and useful sailing resources"
      descriptionRu="Погодные данные, карты, навигационные инструменты и полезные ресурсы для парусного спорта"
      category="Yachting"
      categoryRu="Яхтинг"
      icon={<Database className="h-8 w-8 text-primary" />}
      backHref="/sailing"
    />
  );
}