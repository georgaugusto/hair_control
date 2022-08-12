import styled from 'styled-components';

export const CollaboratorContainer = styled.main`
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
  a {
    text-decoration: none;

    color: ${(props) => props.theme['yellow-500']};

    margin-right: 1rem;
  }

  span {
    color: ${(props) => props.theme['red-500']};

    cursor: pointer;
  }
`;

export const CollaboratorHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;

  h3 {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;

    color: ${(props) => props.theme['blue-gray-800']};
  }

  button {
    width: fit-content;
  }

  border-bottom: 1px solid ${(props) => props.theme['blue-gray-100']};

  @media (max-width: 480px) {
    flex-direction: column;

    button {
      width: 100%;

      margin-top: 1rem;
    }
  }
`;
