import { ReactNode } from 'react';

import useCan from '../../hooks/useCan';

interface CanProps {
  children: ReactNode;
  profiles?: number[];
}

export function Can({ children, profiles }: CanProps) {
  const userCanSeeComponent = useCan({ profiles });

  if (!userCanSeeComponent) {
    return null;
  }
  return <> {children}</>;
}
