import { PlaceholderPage } from '@/components/ui/placeholder-page';
import { Vote } from 'lucide-react';

export default function DaoGovernancePage() {
  return (
    <PlaceholderPage
      title="Voting/Governance"
      titleRu="Голосования/управление"
      description="Participate in DAO governance, proposals and voting mechanisms"
      descriptionRu="Участвуйте в управлении DAO, предложениях и механизмах голосования"
      category="DAO"
      categoryRu="DAO"
      icon={<Vote className="h-8 w-8 text-primary" />}
      backHref="/dao"
    />
  );
}