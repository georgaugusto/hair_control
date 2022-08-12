import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

type HeaderTitleProps = {
  headerTitle: string;
  setHeaderTitle: Dispatch<SetStateAction<string>>;
};

interface HeaderTitleContextProviderProps {
  children: ReactNode;
}

const DEFAULT_VALUE = {
  headerTitle: '',
  setHeaderTitle: () => {},
};

const HeaderTitleContext = createContext<HeaderTitleProps>(DEFAULT_VALUE);

function HeaderTitleContextProvider({
  children,
}: HeaderTitleContextProviderProps) {
  const [headerTitle, setHeaderTitle] = useState(DEFAULT_VALUE.headerTitle);

  const contextValue = useMemo(
    () => ({
      headerTitle,
      setHeaderTitle,
    }),
    [headerTitle, setHeaderTitle],
  );

  return (
    <HeaderTitleContext.Provider value={contextValue}>
      {children}
    </HeaderTitleContext.Provider>
  );
}

export { HeaderTitleContextProvider };
export default HeaderTitleContext;
