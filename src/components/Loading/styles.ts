import styled from 'styled-components';

export const ClipLoaderContainer = styled.p`
  padding-top: 20vh;
`;

export const ClipLoaderSubtitle = styled.p`
  font-family: 'Mulish';
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.25rem;

  margin-top: 1rem;

  color: ${(props) => props.theme['blue-gray-500']};
`;
