import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  color?: 'blue' | 'green' | 'red' | 'yellow';
};

export function Button({
  children,
  loading,
  color = 'blue',
  ...rest
}: ButtonProps) {
  return (
    <Container color={color} type="button" {...rest}>
      {loading ? 'Carregando...' : children}
    </Container>
  );
}
