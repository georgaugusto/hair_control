import styled from 'styled-components';

export const HomeContainer = styled.main`
  height: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 600;
    font-size: 4rem;
    line-height: 1.5rem;

    color: ${(props) => props.theme['blue-gray-700']};
  }
`;
