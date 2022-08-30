import { useCallback, useMemo, useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Link, useNavigate } from 'react-router-dom';
import { DotsThreeOutline } from 'phosphor-react';
import axios from 'axios';

import { Table } from '../../components/Table';
import { Button } from '../../components/Button';

import { ClientContainer, TableActions, ClientHeader } from './styles';

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
  const [width, setWidth] = useState<number>(0);

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
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllClients();
  }, []);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    handleResize();
  }, []);

  const columns = useMemo(
    () =>
      width <= 768
        ? [
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
                  {info
                    .getValue()
                    .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
                </i>
              ),
              footer: (info) => info.column.id,
            }),
            columnHelper.accessor((row) => row.id, {
              id: 'action',
              header: () => null,
              cell: (info) => {
                return (
                  <TableActions>
                    <Link to={`/client/${info.getValue()}`}>
                      <DotsThreeOutline size={20} />
                    </Link>
                  </TableActions>
                );
              },
            }),
          ]
        : [
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
                  {info
                    .getValue()
                    .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
                </i>
              ),
              footer: (info) => info.column.id,
            }),
            columnHelper.accessor((row) => row.cpf, {
              id: 'cpf',
              cell: (info) => (
                <i>
                  {info
                    .getValue()
                    .replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4')}
                </i>
              ),
              footer: (info) => info.column.id,
              header: () => <span>CPF</span>,
            }),
            columnHelper.accessor((row) => row.rg, {
              id: 'rg',
              cell: (info) => (
                <i>
                  {info
                    .getValue()
                    .replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4')}
                </i>
              ),
              footer: (info) => info.column.id,
              header: () => <span>RG</span>,
            }),
            columnHelper.accessor((row) => row.address, {
              id: 'address',
              cell: (info) => <i>{info.getValue()}</i>,
              footer: (info) => info.column.id,
              header: () => <span>Endereço</span>,
            }),
            columnHelper.accessor((row) => row.id, {
              id: 'action',
              header: () => null,
              cell: (info) => {
                return (
                  <TableActions>
                    <Link to={`/client/${info.getValue()}`}>
                      <DotsThreeOutline size={20} />
                    </Link>
                  </TableActions>
                );
              },
            }),
          ],
    [width],
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
