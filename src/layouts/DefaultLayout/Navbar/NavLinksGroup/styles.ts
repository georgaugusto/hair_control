import { Link } from 'react-router-dom';
import styled from 'styled-components';

type ContainerType = {
  compact?: number;
};

export const LinksGroup = styled.div<ContainerType>`
  display: flex;
  flex-direction: column;
  flex-grow: ${(props) => props.compact};

  overflow: hidden;
  overflow-y: auto;

  padding: 0.5rem 0 0 0;
  margin-right: 0.125rem;

  border-top: 1px solid ${(props) => props.theme['blue-gray-200']};

  transition: flex-grow 0.3s cubic-bezier(0.4, 0, 1, 1);

  ::-webkit-scrollbar {
    width: 0.25rem;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  .ReactTooltipCustomeStyles {
    opacity: 1 !important;
  }

  @media (max-width: 1023px) {
    flex-grow: 1;

    padding: 0;
  }
`;

export const SubMenusLinks = styled(Link)`
  display: flex;
  text-align: center;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 130%;

  color: ${(props) => props.theme['gray-700']};

  text-decoration: none;

  &.active {
    color: ${(props) => props.theme['gray-300']};
  }

  &:hover {
    color: ${(props) => props.theme['gray-300']};
  }
`;
