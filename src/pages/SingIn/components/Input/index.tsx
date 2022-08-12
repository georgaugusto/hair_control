import { ChangeEvent, forwardRef, InputHTMLAttributes, LegacyRef } from 'react';
import { FieldError } from 'react-hook-form';
import {
  CPF,
  RG,
  CNPJ,
  phone,
  CEP,
  onlyNumbers,
  onlyNumbersWithLimit,
  onlyLetters,
  money,
  percentage,
} from './masks';

import { Container, ErrorMessage } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: Record<string, unknown>;
  name: string;
  label?: string;
  error?: FieldError;
  maxNum?: number;
  mask?:
    | 'CPF'
    | 'RG'
    | 'CNPJ'
    | 'phone'
    | 'CEP'
    | 'onlyNumbers'
    | 'onlyNumbersWithLimit'
    | 'onlyNumbersWithLimit'
    | 'onlyLetters'
    | 'money'
    | 'percentage'
    | 'RNE'
    | null;
}

function InputBase(
  {
    containerStyle = {},
    name,
    label,
    error,
    maxNum,
    mask,
    ...props
  }: InputProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  function handleOnInput(e: ChangeEvent<HTMLInputElement>) {
    switch (mask) {
      case 'CPF':
        return CPF(e);
      case 'RG':
        return RG(e);
      case 'CNPJ':
        return CNPJ(e);
      case 'phone':
        return phone(e);
      case 'CEP':
        return CEP(e);
      case 'onlyNumbers':
        return onlyNumbers(e);
      case 'onlyNumbersWithLimit':
        return onlyNumbersWithLimit(e, maxNum);
      case 'onlyLetters':
        return onlyLetters(e);
      case 'money':
        return money(e);
      case 'percentage':
        return percentage(e);
      default:
        return null;
    }
  }

  return (
    <Container style={containerStyle} isErrored={!!error}>
      {!!label && <label htmlFor={name}>{label}</label>}

      <input
        name={name}
        id={name}
        ref={ref}
        size={1}
        onInput={handleOnInput}
        {...props}
      />

      <ErrorMessage isErrored={!!error}>
        {!!error && <span>{error.message}</span>}
      </ErrorMessage>
    </Container>
  );
}

export const Input = forwardRef(InputBase);
