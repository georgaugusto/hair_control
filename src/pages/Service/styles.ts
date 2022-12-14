import styled from 'styled-components';

export const ServicesContainer = styled.main`
  height: 100%;

  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  border: 1px solid ${(props) => props.theme['blue-gray-200']};
  background: ${(props) => props.theme.white};
`;

export const TableActions = styled.div`
  text-align: end;

  a {
    text-decoration: none;

    color: ${(props) => props.theme['blue-500']};

    margin-right: 1rem;
  }
`;

export const ServicesHeader = styled.div`
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
