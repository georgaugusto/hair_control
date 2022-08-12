import { ReactNode } from 'react';
import { LayoutContextProvider } from './Layout';
import { HeaderTitleContextProvider } from './HeaderTitle';

interface GlobalContextProviderProps {
  children: ReactNode;
}

function GlobalContextProvider({ children }: GlobalContextProviderProps) {
  return (
    <>
      <LayoutContextProvider>
        <HeaderTitleContextProvider>{children}</HeaderTitleContextProvider>
      </LayoutContextProvider>
    </>
  );
}

export default GlobalContextProvider;
