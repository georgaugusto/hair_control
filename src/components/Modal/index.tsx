import { X } from 'phosphor-react';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { Container, Content, Backdrop } from './styles';

interface ModalProps {
  isShown: boolean;
  hide: () => void;
  modalContent: ReactNode;
}

export function Modal({ isShown, hide, modalContent }: ModalProps) {
  const modal = (
    <>
      <Backdrop />
      <Container>
        <X size={24} onClick={hide} />
        <Content>
          <div>{modalContent}</div>
        </Content>
      </Container>
    </>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
}
