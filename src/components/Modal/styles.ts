import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100001;
  width: inherit;
  outline: 0;

  text-align: end;

  background-color: ${(props) => props.theme['blue-gray-100']};
  border-radius: 6px;

  > svg {
    cursor: pointer;

    margin: 0.5rem;

    color: ${(props) => props.theme['blue-gray-800']};
  }
`;

export const Content = styled.div``;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
`;
