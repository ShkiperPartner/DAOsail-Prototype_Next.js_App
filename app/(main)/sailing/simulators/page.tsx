import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { Ship } from 'lucide-react';

export default function SailingSimulatorsPage() {
  return (
    <PlaceholderPage
      title="Simulators"
      titleRu="Симуляторы"
      description="Virtual sailing simulators for practice and skill development"
      descriptionRu="Виртуальные симуляторы парусного спорта для практики и развития навыков"
      category="Yachting"
      categoryRu="Яхтинг"
      icon={<Ship className="h-8 w-8 text-primary" />}
      backHref="/sailing"
    />
  );
}