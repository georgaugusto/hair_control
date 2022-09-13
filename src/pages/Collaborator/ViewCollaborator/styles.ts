import styled from 'styled-components';

export const CollaboratorContainer = styled.main`
  height: 100%;
  flex: 1;

  padding: 2rem;

  border-radius: 10px;
  border: 1px solid ${(props) => props.theme['blue-gray-200']};
  background: ${(props) => props.theme.white};

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div {
      width: 100%;

      display: flex;
      flex-direction: row;

      gap: 2rem;

      div {
        width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    form {
      > div {
        gap: 0rem;
        flex-direction: column;
      }
    }
  }
`;

export const CollaboratorAtions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
    color: ${(props) => props.theme['blue-gray-800']};

    transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);

    &:hover {
      color: ${(props) => props.theme['blue-gray-500']};
    }
  }

  div {
    text-align: end;

    button {
      width: initial;

      margin-left: 1rem;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse !important;

    div {
      button {
        width: 100%;
        margin-left: 0;
        margin-bottom: 1rem;
      }
    }
  }
`;
