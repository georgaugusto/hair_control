import axios from 'axios';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { Table } from '../../components/Table';

import { ClientContainer, TableActions, ClientHeader } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { User } from 'phosphor-react';

interface IClient {
  id: string;
  inserted_at: string;
  name: string;
  phone: string;
}

const clientProps = {
  id: '',
  inserted_at: '',
  name: '',
  phone: '',
};

export function Client() {
  const navigate = useNavigate();

  const columnHelper = createColumnHelper<IClient>();

  const [client, setClient] = useState<IClient[]>([clientProps]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllClients = useCallback(async () => {
    setLoading(true);
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      const response = await axios.get(
        'https://hair-control.gigalixirapp.com/api/clients',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setClient(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllClients();
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
        header: () => <span>Nome</span>,
      }),
      columnHelper.accessor((row) => row.phone, {
        id: 'phone',
        header: () => <span>Telefone</span>,
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.id, {
        id: 'action',
        header: () => null,
        cell: (info) => {
          return (
            <TableActions>
              <Link to={`/client/${info.getValue()}`}>
                <User size={20} />
              </Link>
            </TableActions>
            // <TableActions>
            //   <Link to={`/client/${info.getValue()}`}>
            //     <PencilLine size={20} />
            //   </Link>
            //   <span onClick={() => handleDeleteClient(info.getValue())}>
            //     <Trash size={20} />
            //   </span>
            // </TableActions>
          );
        },
      }),
    ],
    [],
  );

  return (
    <ClientContainer>
      <ClientHeader>
        <h3>Tabela de Clientes</h3>
        <Button onClick={() => navigate('/client/create', { replace: true })}>
          Adiconar Cliente
        </Button>
      </ClientHeader>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Table data={client} columns={columns} />
      )}
    </ClientContainer>
  );
}
