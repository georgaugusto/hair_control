import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
} from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

interface IUserIdentificationProps {
  exp: number;
  iat: number;
  token: string;
}

const userIdentificationProps = {
  exp: 0,
  iat: 0,
  token: '',
};

type IdentificationProps = {
  userIdentification: IUserIdentificationProps;
  setUserIdentification: Dispatch<SetStateAction<IUserIdentificationProps>>;
};

const DEFAULT_VALUE = {
  userIdentification: userIdentificationProps,
  setUserIdentification: () => {},
};

interface IdentificationContextProviderProps {
  children: ReactNode;
}

const IdentificationContext = createContext<IdentificationProps>(DEFAULT_VALUE);

function IdentificationContextProvider({
  children,
}: IdentificationContextProviderProps) {
  const [userIdentification, setUserIdentification] =
    useLocalStorage<IUserIdentificationProps>(
      '@hair:user-1.0.0',
      userIdentificationProps,
    );

  const contextValue = useMemo(
    () => ({
      userIdentification,
      setUserIdentification,
    }),
    [userIdentification, setUserIdentification],
  );

  return (
    <IdentificationContext.Provider value={contextValue}>
      {children}
    </IdentificationContext.Provider>
  );
}

export { IdentificationContextProvider };
export default IdentificationContext;