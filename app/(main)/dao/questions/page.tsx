import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { HelpCircle } from 'lucide-react';

export default function DaoQuestionsPage() {
  return (
    <PlaceholderPage
      title="DAO Questions"
      titleRu="Вопросы по DAO"
      description="Frequently asked questions about DAO structure, governance and participation"
      descriptionRu="Часто задаваемые вопросы о структуре DAO, управлении и участии"
      category="DAO"
      categoryRu="DAO"
      icon={<HelpCircle className="h-8 w-8 text-primary" />}
      backHref="/dao"
    />
  );
}