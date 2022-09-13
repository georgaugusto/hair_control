import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
}

export const SaleContainer = styled.main`
  height: 100%;

  padding: 1rem;

  border-radius: 10px;
  border: 1px solid ${(props) => props.theme['blue-gray-200']};
  background: ${(props) => props.theme.white};

  form {
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      flex-direction: row;

      gap: 2rem;

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

      > div {
        width: 100%;

        input {
          font-family: 'Mulish' !important;
          font-style: normal !important;
          font-weight: 400 !important;
          font-size: 1rem !important;
          line-height: 1.25rem !important;

          color: ${(props) => props.theme['blue-gray-600']} !important;

          border-radius: 6px !important;

          &:disabled {
            background: ${(props) => props.theme['white-50']} !important;

            color: ${(props) => props.theme['gray-300']} !important;

            cursor: not-allowed !important;
          }

          &::placeholder {
            color: ${(props) => props.theme['blue-gray-300']} !important;
          }
        }
      }
    }

    > div:last-child {
      justify-content: end;

      button {
        width: fit-content;
      }
    }
  }

  @media (max-width: 768px) {
    form {
      > div {
        gap: 0rem;
        flex-direction: column;
      }

      > div:last-child {
        gap: 2rem;

        button {
          width: 100%;
        }
      }
    }
  }
`;

export const SaleHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 2rem;

  h3 {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;

    color: ${(props) => props.theme['blue-gray-800']};
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
