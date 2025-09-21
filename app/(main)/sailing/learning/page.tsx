import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { BookOpen } from 'lucide-react';

export default function SailingLearningPage() {
  return (
    <PlaceholderPage
      title="Learning (Course)"
      titleRu="Обучение (курс)"
      description="Interactive sailing courses and educational materials for all skill levels"
      descriptionRu="Интерактивные курсы по парусному спорту и обучающие материалы для всех уровней навыков"
      category="Yachting"
      categoryRu="Яхтинг"
      icon={<BookOpen className="h-8 w-8 text-primary" />}
      backHref="/sailing"
    />
  );
}