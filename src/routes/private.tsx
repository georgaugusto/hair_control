import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import IdentificationContext from '../contexts/identification';

interface PrivateRoutesProps {
  profiles?: number[];
}

interface UserProps {
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  sub: string;
  typ: string;
}

function PrivateRoutes({ profiles }: PrivateRoutesProps) {
  const location = useLocation();
  const { userIdentification } = useContext(IdentificationContext);

  const userCanAccess = () => {
    if (!userIdentification.token) {
      return false;
    }

    const user: UserProps = decode(userIdentification.token);

    if (Math.round(new Date().getTime() / 1000) >= user.exp) {
      window.localStorage.clear();

      <Navigate to="/" state={{ from: location }} replace />;
    }

    return true;
  };

  return userCanAccess() ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default PrivateRoutes;
