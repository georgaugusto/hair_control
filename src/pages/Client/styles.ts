import styled from 'styled-components';

export const ClientContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* form {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 3.5rem;
  }

  @media (max-width: 768px) {
    form {
      width: 100%;
    }
  } */
`;

export const TableActions = styled.div`
  text-align: end;

  a {
    text-decoration: none;

    color: ${(props) => props.theme['blue-500']};

    margin-right: 1rem;
  }

  span {
    color: ${(props) => props.theme['red-500']};

    cursor: pointer;
  }
`;

export const ClientHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;

  h3 {
    font-weight: 500;
    font-size: 1.5rem;

    color: ${(props) => props.theme['blue-gray-600']};
  }

  button {
    width: fit-content;
  }

  @media (max-width: 480px) {
    flex-direction: column;

    button {
      width: 100%;

      margin-top: 1rem;
    }
  }
`;
