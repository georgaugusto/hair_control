import styled from 'styled-components';

export const CreateClientContainer = styled.main`
  flex: 1;

  padding: 2rem;

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

    > div:nth-child(3) {
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        cursor: pointer;
        color: ${(props) => props.theme['blue-gray-600']};

        transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);

        &:hover {
          color: ${(props) => props.theme['blue-gray-300']};
        }
      }

      button {
        width: fit-content;
      }
    }
  }
`;
