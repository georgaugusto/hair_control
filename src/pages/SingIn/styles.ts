import styled, { keyframes } from 'styled-components';

import signInBackgroundImg from '../../assets/sign-in-background.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 43.75rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  background-color: ${(props) => props.theme['blue-gray-50']};

  z-index: 1;

  @media (max-width: 420px) {
    width: 100vw;
    max-width: 100vw;

    border-radius: 0;
  }
`;

const appeatFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-3.125px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appeatFromLeft} 1s;

  img {
    width: 100%;
  }

  > span {
    font-size: 1.625rem;
    font-weight: 700;

    padding: 0.5rem 0 0 0;
  }

  form {
    margin: 5rem 0;
    width: 21.25rem;
    text-align: center;

    h1 {
      margin-bottom: 1.5rem;
      color: ${(props) => props.theme['blue-gray-700']};
    }
  }

  @media (max-width: 420px) {
    img {
      width: 100%;
    }
    form {
      width: 90vw;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;

  margin-left: -2rem;
  z-index: 0;

  @media (max-width: 420px) {
    display: none;
  }
`;
