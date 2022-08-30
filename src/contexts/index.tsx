import { ReactNode } from 'react';
import { IdentificationContextProvider } from './identification';
import { LayoutContextProvider } from './Layout';
import { HeaderTitleContextProvider } from './HeaderTitle';

interface GlobalContextProviderProps {
  children: ReactNode;
}

function GlobalContextProvider({ children }: GlobalContextProviderProps) {
  return (
    <>
      <IdentificationContextProvider>
        <LayoutContextProvider>
          <HeaderTitleContextProvider>{children}</HeaderTitleContextProvider>
        </LayoutContextProvider>
      </IdentificationContextProvider>
    </>
  );
}

export default GlobalContextProvider;
