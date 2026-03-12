'use client';

import { CSSProperties, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  style?: CSSProperties;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  style,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        ...style, // allow overrides when needed
      }}
    >
      {children}
    </button>
  );
}

const baseStyle: CSSProperties = {
  padding: '12px 18px',
  borderRadius: 8,
  fontSize: 16,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'opacity 0.15s ease',
};

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: '#e5e5e5',
    color: '#111',
  },
  secondary: {
    background: '#2C2C2C',
    color: '#fff',
  },
  ghost: {
    background: 'transparent',
    color: '#555',
  },
};
