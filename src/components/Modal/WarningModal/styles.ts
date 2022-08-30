import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 2rem 3rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    color: ${(props) => props.theme['yellow-500']};
    font-size: 3rem;
  }

  p {
    font-family: 'Mulish';
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.313rem;

    text-align: center;

    color: ${(props) => props.theme['blue-gray-800']};

    padding-top: 1.5rem;
  }
`;

export const Buttons = styled.div`
  display: flex;

  padding-top: 1.5rem;
`;
