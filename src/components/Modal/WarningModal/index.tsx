import { useCallback, useEffect } from 'react';
import { Warning } from 'phosphor-react';

import { Button } from '../../Button';

import { Container, Content, Buttons } from './styles';

interface ModalProps {
  onConfirm: () => void;
  message: string;
}

export function WarningModal({ onConfirm, message }: ModalProps) {
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
        <Warning size={32} />
        <p>{message}</p>
      </Content>
      <Buttons>
        <Button onClick={onConfirm}>Ok</Button>
      </Buttons>
    </Container>
  );
}
