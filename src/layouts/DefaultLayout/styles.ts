import styled from 'styled-components';

type ContainerType = {
  compact: number;
};

export const Grid = styled.div`
  min-height: 100vh;
  display: grid;
  background-color: ${(props) => props.theme['blue-gray-100']};
  grid:
    'nav header' min-content
    'nav main' 1fr
    'nav footer' auto / min-content;

  @media (max-width: 1023px) {
    grid:
      'nav header' min-content
      'nav title' min-content
      'nav main' 1fr
      'nav footer' auto / min-content;
  }
`;

export const GridNav = styled.div`
  grid-area: nav;
  z-index: 2000;

  @media (min-width: 1023px) {
    position: fixed;
  }
`;

export const GridHeader = styled.header<ContainerType>`
  grid-area: header;

  @media (min-width: 1023px) {
    margin-left: ${(props) => (props.compact ? '70px' : '256px')};

    transition-property: margin, transform !important;
    transition-duration: 0.3s !important;
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1) !important;
  }
`;

export const GridTitle = styled.div`
  grid-area: title;
  display: none;

  @media (max-width: 1023px) {
    display: contents;

    h3 {
      padding: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    h3 {
      padding: 1.5rem 0.5rem;
    }
  }
`;

export const GridMain = styled.main<ContainerType>`
  /* height: fit-content; */

  grid-area: main;

  background: ${(props) => props.theme.white};

  margin: 0 3.75rem 0 3rem;

  border-radius: 10px;
  border: 1px solid ${(props) => props.theme['blue-gray-200']};

  @media (min-width: 1023px) {
    margin-left: ${(props) => (props.compact ? '130px' : '316px')};

    transition-property: margin, transform !important;
    transition-duration: 0.3s !important;
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1) !important;
  }

  @media (max-width: 1023px) {
    margin: 0 1.5rem;
  }

  @media (max-width: 480px) {
    margin: 0 0.5rem;
  }
`;

export const GridFooter = styled.footer<ContainerType>`
  grid-area: footer;

  height: 2rem;
`;
