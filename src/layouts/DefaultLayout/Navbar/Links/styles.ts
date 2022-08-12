import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SubMenusLinks = styled(Link)`
  display: flex;

  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 130%;
  text-align: center;

  color: ${(props) => props.theme['gray-300']};

  text-decoration: none;
`;
