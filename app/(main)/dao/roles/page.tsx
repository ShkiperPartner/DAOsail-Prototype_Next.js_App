import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { UserCheck } from 'lucide-react';

export default function DaoRolesPage() {
  return (
    <PlaceholderPage
      title="Roles"
      titleRu="Роли"
      description="Learn about different roles and responsibilities in the DAOsail community"
      descriptionRu="Узнайте о различных ролях и обязанностях в сообществе DAOsail"
      category="DAO"
      categoryRu="DAO"
      icon={<UserCheck className="h-8 w-8 text-primary" />}
      backHref="/dao"
    />
  );
}