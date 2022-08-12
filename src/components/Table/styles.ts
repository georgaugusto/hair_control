import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;

  .tableContainer {
    overflow-x: auto;
    overflow-y: hidden;

    white-space: nowrap;

    @media (max-width: 1023px) {
      max-width: calc(100vw - 3rem);
    }

    @media (max-width: 767px) {
      display: block;
      max-width: calc(100vw - 3rem);
      overflow-x: scroll;
      overflow-y: hidden;

      white-space: nowrap;
    }

    @media (max-width: 480px) {
      max-width: calc(100vw - 1rem);
    }
  }

  > div {
    table {
      width: 100%;
      border-spacing: 0;

      thead {
        background: ${(props) => props.theme['blue-50']};
        color: ${(props) => props.theme['blue-gray-600']};

        tr {
          height: 4rem;

          border: 1px solid ${(props) => props.theme['blue-gray-100']};

          th {
            text-align: start;

            padding: 0.5rem;

            &:first-child {
              padding-left: 2rem;
            }
            &:last-child {
              padding-right: 2rem;
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

            border-bottom: 1px solid ${(props) => props.theme['blue-gray-100']};

            &:first-child {
              padding-left: 2rem;
            }
            &:last-child {
              padding-right: 2rem;
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
