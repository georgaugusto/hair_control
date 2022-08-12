import axios from 'axios';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { Table } from '../../components/Table';

import {
  CollaboratorContainer,
  TableActions,
  CollaboratorHeader,
} from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { PencilLine, Trash } from 'phosphor-react';

interface ICollaborator {
  cpf: string;
  email: string;
  id: string;
  inserted_at: string;
  name: string;
  total_commission: number;
  total_received: number;
}

const collaboratorProps = {
  cpf: '',
  email: '',
  id: '',
  inserted_at: '',
  name: '',
  total_commission: 0,
  total_received: 0,
};

export function Collaborator() {
  const columnHelper = createColumnHelper<ICollaborator>();
  const navigate = useNavigate();

  const [collaborator, setCollaborator] = useState<ICollaborator[]>([
    collaboratorProps,
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllCollaborators = useCallback(async () => {
    setLoading(true);
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      const response = await axios.get(
        'https://hair-control.gigalixirapp.com/api/employees',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCollaborator(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const delCollaborators = useCallback(async (id: string) => {
    try {
      console.log(`del clients id:${id}`);
      // const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      // await axios.delete(
      //   `https://hair-control.gigalixirapp.com/api/clients/${id}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );
    } catch (err) {
      console.log(err);
    } finally {
      getAllCollaborators();
    }
  }, []);

  useEffect(() => {
    getAllCollaborators();
  }, []);

  function handleDeleteCollaborators(id: string) {
    delCollaborators(id);
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.cpf, {
        id: 'cpf',
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
        header: () => <span>CPF</span>,
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        header: () => <span>Nome</span>,
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.email, {
        id: 'email',
        header: () => <span>Email</span>,
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.total_commission, {
        id: 'total_commission',
        header: () => <span>Comissão Total</span>,
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
      }),

      columnHelper.accessor((row) => row.total_received, {
        id: 'total_received',
        header: () => <span>Total Recebido</span>,
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.inserted_at, {
        id: 'inserted_at',
        header: () => <span>Data de Criação</span>,
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.id, {
        id: 'action',
        header: () => null,
        cell: (info) => (
          <TableActions>
            <Link to={`/collaborator/${info.getValue()}`}>
              <PencilLine size={20} />
            </Link>
            <span onClick={() => handleDeleteCollaborators(info.getValue())}>
              <Trash size={20} />
            </span>
          </TableActions>
        ),
      }),
    ],
    [],
  );

  return (
    <CollaboratorContainer>
      <CollaboratorHeader>
        <h3>Tabela de Colaboradores </h3>
        <Button
          onClick={() => navigate('/collaborator/create', { replace: true })}
        >
          Adiconar Colaborador
        </Button>
      </CollaboratorHeader>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Table data={collaborator} columns={columns} />
      )}
    </CollaboratorContainer>
  );
}
