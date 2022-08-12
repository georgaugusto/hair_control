import styled from 'styled-components';

const STATUS_COLORS = {
  yellow: 'yellow-500',
  red: 'red-500',
  green: 'green-500',
} as const;

// interface StatusProps {
//   statusColor: 'yellow' | 'red' | 'green'
// }

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS;
}

export const HistoryContainer = styled.header`
  flex: 1;

  display: flex;
  flex-direction: column;

  padding: 3.5rem;
  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`;

export const HistoryList = styled.header`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    min-width: 600px;

    border-collapse: collapse;

    th {
      text-align: left;

      font-size: 0.875rem;
      line-height: 1.6;

      color: ${(props) => props.theme['gray-100']};
      background: ${(props) => props.theme['gray-600']};

      padding: 1rem;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      font-size: 0.875rem;
      line-height: 1.6;

      background: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};

      padding: 1rem;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;
export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';

    width: 0.5rem;
    height: 0.5rem;

    border-radius: 9999px;

    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`;
