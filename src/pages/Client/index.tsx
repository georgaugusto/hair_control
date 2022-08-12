import axios from 'axios';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { Table } from '../../components/Table';

import { ClientContainer, TableActions, ClientHeader } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { PencilLine, Trash } from 'phosphor-react';

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

  const delClient = useCallback(async (id: string) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      await axios.delete(
        `https://hair-control.gigalixirapp.com/api/clients/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    } finally {
      getAllClients();
    }
  }, []);

  useEffect(() => {
    getAllClients();
  }, []);

  function handleDeleteClient(id: string) {
    delClient(id);
  }

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
      columnHelper.accessor((row) => row.inserted_at, {
        id: 'insertedAt',
        header: () => <span>Data de Criação</span>,
        cell: (info) => {
          const transformDate = new Date(info.getValue()).toLocaleDateString(
            'pt-BR',
          );

          return <i>{transformDate}</i>;
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.id, {
        id: 'action',
        header: () => null,
        cell: (info) => {
          const test = info.getValue();
          return (
            <TableActions>
              <Link to={`/client/${info.getValue()}`}>
                <PencilLine size={20} />
              </Link>
              <span onClick={() => handleDeleteClient(test)}>
                <Trash size={20} />
              </span>
            </TableActions>
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
