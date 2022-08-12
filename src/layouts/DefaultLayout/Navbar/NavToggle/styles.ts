import styled from 'styled-components';

type ContainerType = {
  compact?: number;
};

export const Button = styled.button<ContainerType>`
  width: 0.75rem;
  height: 1.5rem;
  min-height: 0.75rem;

  text-align: ${(props) => (props.compact ? 'center' : 'right')};

  background-color: ${(props) => props.theme['blue-500']};

  border: none;
  border-radius: 0px 2px 2px 0px;

  margin-top: 8.25rem;

  cursor: pointer;

  svg {
    display: flex;
    border-radius: 1px;
    color: ${(props) => props.theme.white};
    font-size: 1rem;

    margin: ${(props) => (props.compact ? '0 -0.125rem' : '0 -0.188rem')};

    transition: transform 0.2s linear;
    transform: rotate(${(props) => (props.compact ? '270deg' : '90deg')});
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;
