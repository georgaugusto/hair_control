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
  name: string;
  phone: string;
  cpf: string;
  rg: string;
  address: string;
  district: string;
  inserted_at: string;
}

const clientProps = {
  id: '',
  name: '',
  phone: '',
  cpf: '',
  rg: '',
  address: '',
  district: '',
  inserted_at: '',
};

export function Client() {
  const navigate = useNavigate();

  const columnHelper = createColumnHelper<IClient>();

  const [client, setClient] = useState<IClient[]>([clientProps]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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
      setError(true);
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
        cell: (info) => (
          <i>
            {info.getValue().replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
          </i>
        ),
        footer: (info) => info.column.id,
      }),
      // columnHelper.accessor((row) => row.cpf, {
      //   id: 'cpf',
      //   cell: (info) => <i>{info.getValue()}</i>,
      //   footer: (info) => info.column.id,
      //   header: () => <span>CPF</span>,
      // }),
      // columnHelper.accessor((row) => row.rg, {
      //   id: 'rg',
      //   cell: (info) => <i>{info.getValue()}</i>,
      //   footer: (info) => info.column.id,
      //   header: () => <span>RG</span>,
      // }),
      // columnHelper.accessor((row) => row.address, {
      //   id: 'address',
      //   cell: (info) => <i>{info.getValue()}</i>,
      //   footer: (info) => info.column.id,
      //   header: () => <span>Endereço</span>,
      // }),
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

      {error ? (
        <p>Erro no servidor</p>
      ) : loading ? (
        <p>Carregando...</p>
      ) : (
        <Table data={client} columns={columns} />
      )}
    </ClientContainer>
  );
}
