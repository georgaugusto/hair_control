import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  height: 2.938rem;

  border-radius: 10px;
  border: 0;

  cursor: pointer;

  font-weight: 500;

  padding: 0 2rem;

  color: ${(props) => props.theme['blue-50']};
  background: ${(props) => props.theme['blue-500']};

  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => props.theme['blue-700']};
  }
`;
