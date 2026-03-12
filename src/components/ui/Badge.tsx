type BadgeVariant = 'open' | 'closed' | 'offer' | 'prescription';

interface BadgeProps {
  variant: BadgeVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Badge({ variant, icon, children }: BadgeProps) {
  return (
    <span className={`badge badge-${variant}`}>
      {icon}{children}
    </span>
  );
}
