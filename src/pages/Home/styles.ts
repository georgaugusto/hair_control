import styled from 'styled-components';

interface GraphicContainerProps {
  compact: number;
}

export const HomeContainer = styled.main`
  height: 100%;
`;

export const HeaderContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const BoxContainer = styled.div`
  width: 18rem;
  display: flex;
  justify-content: space-between;

  border-radius: 10px;
  border: 1px solid ${(props) => props.theme['blue-gray-200']};
  background: ${(props) => props.theme.white};

  padding: 1rem;
  margin: 0 2rem 2rem 0;

  > div {
    display: flex;
    flex-direction: column;
  }

  div:nth-child(1) {
    font-family: 'Mulish';
    font-style: normal;

    color: ${(props) => props.theme['blue-gray-700']};

    span:nth-child(2) {
      font-weight: 700;
      font-size: 1rem;
      line-height: 2rem;
    }
  }

  div:nth-child(2) {
    color: ${(props) => props.theme['blue-gray-700']};
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    margin-bottom: 1rem;
  }
`;

export const Teste = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  border: 1px solid ${(props) => props.theme['blue-gray-200']};
  background: ${(props) => props.theme.white};

  > span {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;

    color: ${(props) => props.theme['blue-gray-700']};

    padding-left: 1rem;
    margin-top: 1rem !important;
  }
`;

export const GraphicContainer = styled.div<GraphicContainerProps>`
  width: 100%;
  height: calc(100vh - 25rem - 4rem - 1rem);

  margin: 2rem 0;
  padding-left: 1rem;

  > div {
    max-width: calc(
      100vw - ${(props) => (props.compact ? '130px' : '316px')} - 4rem - 2rem -
        4rem
    );

    @media (max-width: 1023px) {
      max-width: calc(100vw - 2rem - 6rem);
    }

    @media (max-width: 480px) {
      /* max-width: calc(100vw - 1rem - 2rem - 4rem); */
      max-width: calc(100vw - 1rem - 2rem - 2rem);
    }
  }
`;
