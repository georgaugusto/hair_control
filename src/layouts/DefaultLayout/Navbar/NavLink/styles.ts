import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

type ContainerType = {
  compact?: number;
  subMenus?: number;
};

export const StyledLink = styled(Link)<ContainerType>`
  height: 3rem;
  min-height: 3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 1.5rem;

  color: ${(props) => props.theme['blue-gray-600']};

  text-decoration: none;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;

  div {
    display: flex;

    i {
      width: 1.75rem;
      font-size: 1.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    span {
      padding-left: 0.875rem;
      line-height: 1.188rem;
      white-space: nowrap;
      opacity: ${(props) => (props.compact ? 1 : 0)};
      transition: opacity 0.3s cubic-bezier(0.4, 0, 1, 1);
    }
  }

  &:hover {
    text-decoration: none;
    background-color: ${(props) => props.theme['blue-50']};
    opacity: 0.9;
    color: ${(props) => props.theme['blue-600']};

    transition: 0.4s;
  }

  &.active {
    color: ${(props) => props.theme['blue-600']};
    background: ${(props) => props.theme['blue-50']};
    border-left: 0.188rem solid ${(props) => props.theme['blue-600']};
  }

  @media (max-width: 1023px) {
    div {
      span {
        opacity: 1;
      }
    }
  }
`;

export const ButtonClose = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const DropdownButton = styled.button<ContainerType>`
  display: flex;

  opacity: ${(props) => (props.compact ? 1 : 0)};

  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  svg {
    transition: transform 0.2s linear;
    transform: rotate(${(props) => (props.subMenus ? '0deg' : '180deg')});
  }

  @media (max-width: 1023px) {
    opacity: 1;
  }
`;
