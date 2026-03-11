type SectionBadgeVariant = 'default' | 'accent' | 'gold';

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: SectionBadgeVariant;
  badgeIcon?: React.ReactNode;
  title: string;
  description?: string;
}

export default function SectionHeader({ badge, badgeVariant = 'default', badgeIcon, title, description }: SectionHeaderProps) {
  return (
    <div className="section-header">
      {badge && (
        <span className={`section-badge ${badgeVariant !== 'default' ? badgeVariant : ''}`}>
          {badgeIcon}{badge}
        </span>
      )}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
