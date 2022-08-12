import { CheckCircle } from 'phosphor-react';
import { useEffect, useCallback } from 'react';

import { Button } from '../../Button';

import { Container, Content, Buttons } from './styles';

interface ModalProps {
  onConfirm: () => void;
  message: string;
}

export function SuccessModal({ onConfirm, message }: ModalProps) {
  const keyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onConfirm();
      }
    },
    [onConfirm],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <Container>
      <Content>
        <CheckCircle size={44} />
        <p>{message}</p>
      </Content>
      <Buttons>
        <Button onClick={onConfirm}>Ok</Button>
      </Buttons>
    </Container>
  );
}
