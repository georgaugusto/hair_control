import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    padding-bottom: 0.25rem;

    font-family: 'Mulish';
    font-weight: 800;
    font-size: 0.875rem;
    line-height: 1.25rem;

    color: ${(props) => props.theme['blue-gray-700']};
  }

  input {
    height: 2rem;

    padding: 0.5rem 0 0.5rem 0.75rem;
    margin-bottom: 0.125rem;

    background: ${(props) => props.theme['blue-gray-50']};

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.25rem;

    color: ${(props) => props.theme['blue-gray-600']};
    border: 1px solid ${(props) => props.theme['blue-gray-200']};

    border-radius: 6px;

    transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);

    &:focus {
      outline: none;
      border: 0.5px solid ${(props) => props.theme['blue-gray-500']};
    }

    &:disabled {
      background: ${(props) => props.theme['blue-gray-200']};

      cursor: not-allowed;
    }

    &::placeholder {
      color: ${(props) => props.theme['blue-gray-300']};
    }

    ${(props) =>
      props.isErrored &&
      css`
        border-color: ${props.theme['red-500']};
      `}
  }

  &::placeholder {
    color: ${(props) => props.theme['blue-gray-100']};
  }
`;

export const ErrorMessage = styled.div<ContainerProps>`
  text-align: start;
  padding: 0 0 1.5rem 0;
  opacity: 0;

  span {
    font-weight: normal;
    font-size: 0.875rem;
    line-height: 1.5rem;

    color: ${(props) => props.theme['red-500']};

    cursor: default;
  }

  ${(props) =>
    props.isErrored &&
    css`
      opacity: 1;

      transition: opacity 0.3s cubic-bezier(0.4, 0, 1, 1);
    `}
`;
