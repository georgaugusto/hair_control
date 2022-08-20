import styled from 'styled-components';

interface ContainerProps {
  compact: number;
}

export const TableContainer = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;

  padding-top: 2rem;

  .tableContainer {
    display: block;
    max-width: calc(
      100vw - ${(props) => (props.compact ? '130px' : '316px')} - 4rem - 2rem
    );

    background: #f7f7f8;
    border: 1px solid #d4d4d4;
    border-radius: 8px;
    margin: 1rem;

    overflow-x: auto;
    overflow-y: hidden;

    white-space: nowrap;

    @media (max-width: 1023px) {
      max-width: calc(100vw - 3rem - 2rem);
    }

    @media (max-width: 767px) {
      display: block;
      max-width: calc(100vw - 3rem - 2rem);
      overflow-x: scroll;
      overflow-y: hidden;

      white-space: nowrap;
    }

    @media (max-width: 480px) {
      max-width: calc(100vw - 1rem - 2rem);
    }
  }

  > div {
    table {
      width: 100%;
      border-spacing: 0;

      thead {
        background: ${(props) => props.theme['blue-gray-100']};
        color: ${(props) => props.theme['blue-gray-800']};

        tr {
          height: 2rem;

          font-family: 'Mulish';
          font-style: normal;
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.125rem;

          th {
            text-align: start;

            padding: 0.5rem;

            &:first-child {
              padding-left: 2rem;
            }
            &:last-child {
              padding-right: 2rem;
            }

            @media (max-width: 480px) {
              &:first-child {
                padding-left: 0.5rem;
              }
              &:last-child {
                padding-right: 0.5rem;
              }
            }
          }
        }
      }

      tbody {
        color: ${(props) => props.theme['blue-gray-600']};

        tr {
          height: 3rem;

          &:nth-child(odd) {
            background: ${(props) => props.theme.white};
          }
          &:nth-child(even) {
            background: ${(props) => props.theme['blue-gray-50']};
          }

          td {
            padding: 0.5rem;

            font-family: 'Mulish';
            font-style: normal !important;
            font-weight: 500;
            font-size: 1rem;
            line-height: 1.125rem;

            border-bottom: 1px solid ${(props) => props.theme['blue-gray-100']};

            &:first-child {
              padding-left: 2rem;
            }
            &:last-child {
              padding-right: 2rem;
            }

            @media (max-width: 480px) {
              &:first-child {
                padding-left: 0.5rem;
              }
              &:last-child {
                padding-right: 0.5rem;
              }
            }
          }
        }
      }
      tfoot {
        tr {
          th {
          }
        }
      }
    }
  }
`;
