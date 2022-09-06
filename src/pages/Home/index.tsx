import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';

import IdentificationContext from '../../contexts/identification';
import { useModal } from '../../hooks/useModal';

import { HomeContainer } from './styles';

export function Home() {
  const { userIdentification, setUserIdentification } = useContext(
    IdentificationContext,
  );
  const { isShown, toggle } = useModal();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getCollaborator = useCallback(async () => {
    setLoading(true);
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      const response = await axios.get(
        `https://hair-control.gigalixirapp.com/api/employees/${userIdentification.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const name: string = response.data.name;

      setUserIdentification({ ...userIdentification, name });
    } catch {
      setError(true);
      toggle();
    } finally {
      setLoading(false);
    }
  }, []);

  const getSale = useCallback(async () => {
    setLoading(true);
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      const response = await axios.get(
        `https://hair-control.gigalixirapp.com/api/sales`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
    } catch {
      setError(true);
      toggle();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCollaborator();
    getSale();
  }, []);

  return (
    <HomeContainer>
      <h1>Pagina Inicial</h1>
    </HomeContainer>
  );
}
