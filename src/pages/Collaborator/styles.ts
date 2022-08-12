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
