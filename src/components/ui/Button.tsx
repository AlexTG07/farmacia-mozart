'use client';

import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'accent' | 'white' | 'outline' | 'outline-white' | 'ghost' | 'whatsapp';
type Size = 'default' | 'sm';

type BaseProps = {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({ variant = 'primary', size = 'default', icon, children, ...rest }: ButtonProps) {
  const className = [
    'btn',
    `btn-${variant}`,
    size === 'sm' ? 'btn-sm' : '',
    (rest as Record<string, unknown>).className ?? '',
  ].filter(Boolean).join(' ');

  if ('href' in rest && rest.href) {
    const { className: _, ...linkProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { className?: string };
    return (
      <a className={className} {...linkProps} href={rest.href}>
        {icon}{children}
      </a>
    );
  }

  const { className: _, ...btnProps } = rest as ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };
  return (
    <button className={className} {...btnProps}>
      {icon}{children}
    </button>
  );
}
