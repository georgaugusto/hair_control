import { useCallback, useMemo, useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Link, useNavigate } from 'react-router-dom';
import { DotsThreeOutline } from 'phosphor-react';
import axios from 'axios';

import { Button } from '../../components/Button';
import { Table } from '../../components/Table';

import { ServicesContainer, ServicesHeader, TableActions } from './styles';
import { Modal } from '../../components/Modal';
import { FailureModal } from '../../components/Modal/FailureModal';
import { useModal } from '../../hooks/useModal';

interface IServices {
  id: string;
  title: string;
  price: number;
}

const servicesProps = {
  id: '',
  title: '',
  price: 0,
};

export function Service() {
  const columnHelper = createColumnHelper<IServices>();
  const navigate = useNavigate();
  const { isShown, toggle } = useModal();

  const [services, setServices] = useState<IServices[]>([servicesProps]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getAllServices = useCallback(async () => {
    setLoading(true);
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      const response = await axios.get(
        'https://hair-control.gigalixirapp.com/api/services',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setServices(response.data);
    } catch {
      setError(true);
      toggle();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllServices();
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.title, {
        id: 'name',
        header: () => <span>Nome</span>,
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.price, {
        id: 'total_commission',
        header: () => <span>Preço</span>,
        cell: (info) => {
          const price = info.getValue() / 100;
          return (
            <i>
              {price.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </i>
          );
        },
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.id, {
        id: 'action',
        header: () => null,
        cell: (info) => {
          return (
            <TableActions>
              <Link to={`/service/${info.getValue()}`}>
                <DotsThreeOutline size={20} />
              </Link>
            </TableActions>
          );
        },
      }),
    ],
    [],
  );

  return (
    <ServicesContainer>
      <ServicesHeader>
        <h3>Tabela de Serviços </h3>
        <Button onClick={() => navigate('/service/create', { replace: true })}>
          Adiconar Serviço
        </Button>
      </ServicesHeader>

      {error ? (
        <p>Erro no servidor</p>
      ) : loading ? (
        <p>Carregando...</p>
      ) : (
        <Table data={services} columns={columns} />
      )}

      <Modal
        isShown={isShown}
        hide={toggle}
        modalContent={
          <FailureModal
            onConfirm={() => {
              toggle();
            }}
            message="Opss erro no servidor!"
          />
        }
      />
    </ServicesContainer>
  );
}
