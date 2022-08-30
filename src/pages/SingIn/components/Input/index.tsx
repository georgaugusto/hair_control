import { forwardRef, InputHTMLAttributes, LegacyRef } from 'react';
import { FieldError } from 'react-hook-form';

import { Container, ErrorMessage } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: Record<string, unknown>;
  name: string;
  label?: string;
  error?: FieldError;
}

function InputBase(
  { containerStyle = {}, name, label, error, ...props }: InputProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <Container style={containerStyle} isErrored={!!error}>
      {!!label && <label htmlFor={name}>{label}</label>}

      <input name={name} id={name} ref={ref} size={1} {...props} />

      <ErrorMessage isErrored={!!error}>
        {!!error && <span>{error.message}</span>}
      </ErrorMessage>
    </Container>
  );
}

export const Input = forwardRef(InputBase);
