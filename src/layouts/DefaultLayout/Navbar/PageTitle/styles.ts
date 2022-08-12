import styled from 'styled-components';

export const PageTitle = styled.div`
  display: flex;
  align-items: center;

  width: max-content;

  h3 {
    display: flex;
    align-items: center;

    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.25rem;

    color: ${(props) => props.theme['blue-gray-800']};
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;
