import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Grid = styled.div`
  display: flex;

  justify-content: space-between;

  height: 4rem;
  padding: 0 3.438rem;

  margin-bottom: 2rem;

  background: ${(props) => props.theme.white};

  img:last-child {
    display: none;
  }

  .nav-toggle {
    pointer-events: none;
    opacity: 0;
  }

  @media (max-width: 1023px) {
    height: 3rem;

    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;

    padding: 0 1.5rem;

    background: ${(props) => props.theme.white};
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08);

    img:last-child {
      width: 1.875rem;
      display: block;
    }

    .nav-toggle {
      opacity: 1;
      pointer-events: all;

      color: ${(props) => props.theme['gray-500']};
    }
  }
`;

export const Menu = styled.div`
  display: none;

  @media (max-width: 1023px) {
    display: flex;
    align-items: center;

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const PageTitle = styled.div`
  display: flex;
  align-items: center;

  width: max-content;

  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 1.625rem;
    line-height: 1.75rem;

    display: flex;
    align-items: center;

    color: ${(props) => props.theme['gray-900']};
  }

  @media (max-width: 1023px) {
    display: none;

    h3 {
      display: none;
    }
  }
`;

export const Options = styled.div`
  display: flex;

  align-items: center;

  p {
    width: fit-content;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5rem;

    padding: 0 1.5rem 0 0;
    margin: 0;

    color: ${(props) => props.theme['gray-900']};
  }

  > div {
    display: none;
    margin-top: 0;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;

    color: ${(props) => props.theme['gray-900']};
  }

  @media (max-width: 1023px) {
    gap: 1.5rem;

    p {
      display: none;
    }

    > div {
      display: flex;
      margin: 0;
      div {
        padding: 0.5rem;
        span {
          display: none;
        }
      }
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;

      color: ${(props) => props.theme['gray-900']};
    }
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;

  text-decoration: none;

  gap: 1.5rem;

  &:nth-child(2) {
    border-radius: 4px;
    color: ${(props) => props.theme['gray-900']} !important;

    padding: 1px 1px;

    img {
      filter: none;
    }
  }
`;
