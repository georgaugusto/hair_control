/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';

type LayoutProps = {
  navMobile: boolean;
  compact: boolean;
  subMenus: boolean;
  setNavMobile: Dispatch<SetStateAction<boolean>>;
  setCompact: Dispatch<SetStateAction<boolean>>;
  setSubMenus: Dispatch<SetStateAction<boolean>>;
};

interface LayoutContextProviderProps {
  children: ReactNode;
}

const LayoutContext = createContext<LayoutProps>({
  navMobile: false,
  compact: true,
  subMenus: false,
  setNavMobile: () => {},
  setCompact: () => {},
  setSubMenus: () => {},
});

function LayoutContextProvider({ children }: LayoutContextProviderProps) {
  const [width, setWidth] = useState<number>(0);
  const [navMobile, setNavMobile] = useState<boolean>(false);
  const [compact, setCompact] = useState<boolean>(true);
  const [subMenus, setSubMenus] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    if (width < 1023 && width !== 0) {
      setCompact(true);
      setNavMobile(false);
    }

    handleResize();
  }, []);

  const contextValue = useMemo(
    () => ({
      navMobile,
      compact,
      subMenus,
      setNavMobile,
      setCompact,
      setSubMenus,
    }),
    [navMobile, compact, subMenus],
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
}

export { LayoutContextProvider };
export default LayoutContext;
