import styled from 'styled-components';

export const ReportContainer = styled.main`
  height: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;

  border-radius: 10px;
  border: 1px solid ${(props) => props.theme['blue-gray-200']};
  background: ${(props) => props.theme.white};

  form {
    width: 100%;
  }

  h3 {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;

    color: ${(props) => props.theme['blue-gray-800']};

    padding: 1rem;
  }
`;

export const ReportFilter = styled.div``;

export const ReportInputFilter = styled.div`
  display: flex;

  gap: 2rem;

  padding: 0 1rem;

  > div {
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ReportButtonsFilter = styled.div`
  display: flex;
  justify-content: flex-end;

  gap: 2rem;
  padding: 1.5rem 1rem 0 1rem;

  button {
    width: fit-content;
  }
`;
