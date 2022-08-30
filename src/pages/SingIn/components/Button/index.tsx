import { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function Button({ children, loading, ...rest }: ButtonProps) {
  return (
    <Container type="button" {...rest}>
      {loading ? 'Carregando...' : children}
    </Container>
  );
}
