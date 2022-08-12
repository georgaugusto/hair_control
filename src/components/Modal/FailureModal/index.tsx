import { useCallback, useEffect } from 'react';

import { Button } from '../../Button';

import { Container, Content, Buttons } from './styles';
import { XCircle } from 'phosphor-react';

interface ModalProps {
  onConfirm: () => void;
  message: string;
}

export function FailureModal({ onConfirm, message }: ModalProps) {
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
        <XCircle size={32} />
        <p>{message}</p>
      </Content>
      <Buttons>
        <Button onClick={onConfirm}>Ok</Button>
      </Buttons>
    </Container>
  );
}
