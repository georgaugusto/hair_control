import styled from 'styled-components';

interface ContainerProps {
  color: 'blue' | 'green' | 'red' | 'yellow';
}

export const Container = styled.button<ContainerProps>`
  width: 100%;
  height: 2rem;

  border-radius: 6px;
  border: 0;

  cursor: pointer;

  font-family: 'Mulish';
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;

  padding: 0 2rem;

  color: ${(props) => props.theme['blue-50']};
  background: ${(props) => props.theme[`${props.color}-500`]};

  transition: background-color 0.2s cubic-bezier(0.4, 0, 1, 1);

  &:hover {
    background: ${(props) => props.theme[`${props.color}-700`]};
  }
`;
