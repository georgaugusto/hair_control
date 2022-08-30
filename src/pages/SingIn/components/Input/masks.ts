export function CPF(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 14;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2');
  value = value.replace(/(-\d{2})\d+?$/, '$1');
  e.currentTarget.value = value;
  return e;
}

export function RG(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 12;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2');
  value = value.replace(/(-\d{2})\d+?$/, '$1');
  e.currentTarget.value = value;
  return e;
}

export function CNPJ(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 18;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/, '$1.$2');
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
  value = value.replace(/(\d{4})(\d)/, '$1-$2');
  e.currentTarget.value = value;
  return e;
}

export function phone(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 15;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '($1) $2');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');
  value = value.replace(/(-\d{4})(\d+?)$/, '$1');
  e.currentTarget.value = value;
  return e;
}

export function CEP(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 9;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');
  value = value.replace(/(-\d{3})\d+?$/, '$1');
  e.currentTarget.value = value;
  return e;
}

export function onlyNumbers(e: React.FormEvent<HTMLInputElement>) {
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  e.currentTarget.value = value;
  return e;
}

export function onlyNumbersWithLimit(
  e: React.FormEvent<HTMLInputElement>,
  maxNum: number | undefined,
) {
  if (maxNum) e.currentTarget.maxLength = maxNum;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  e.currentTarget.value = value;
  return e;
}

export function onlyLetters(e: React.FormEvent<HTMLInputElement>) {
  let { value } = e.currentTarget;
  value = value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, '');
  e.currentTarget.value = value;
  return e;
}

export function money(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 12;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{8})$/, '$1.$2');
  value = value.replace(/(\d)(\d{5})$/, '$1.$2');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  e.currentTarget.value = `R$${value}`;
  return e;
}

export function percentage(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 7;
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  e.currentTarget.value = `${value}%`;
  return e;
}
