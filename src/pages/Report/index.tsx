import { useCallback, useEffect, useMemo, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Zod, * as zod from 'zod';
import Select from 'react-select';

import { Loading } from '../../components/Loading';
import { Table } from '../../components/Table';

import {
  ReportContainer,
  ReportFilter,
  ReportInputFilter,
  ReportButtonsFilter,
} from './styles';
import { ErrorMessage } from '../Sale/styles';
import { Button } from '../../components/Button';

interface ISales {
  id: string;
  inserted_at: string;
  name_client: string;
  name_employee: string;
  payment_method: string;
  price_service: number;
  title_service: string;
}

interface IReportForm {
  clientName: string;
  employeeName: string;
  serviceName: string;
  paymentMethod: string;
}

interface ICollaborator {
  cpf: string;
  email: string;
  id: string;
  inserted_at: string;
  name: string;
  total_commission: number;
  total_received: number;
}

interface IApiMethods {
  getAllSales: boolean;
  getAllClients: boolean;
  getAllCollaborators: boolean;
  getAllServices: boolean;
}

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

interface IServices {
  id: string;
  title: string;
  price: number;
}

const salesProps = {
  id: '',
  inserted_at: '',
  name_client: '',
  name_employee: '',
  payment_method: '',
  price_service: 0,
  title_service: '',
};

const collaboratorProps = {
  cpf: '',
  email: '',
  id: '',
  inserted_at: '',
  name: '',
  total_commission: 0,
  total_received: 0,
};

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

const servicesProps = {
  id: '',
  title: '',
  price: 0,
};

const reportPropsForm = {
  clientName: '',
  employeeName: '',
  serviceName: '',
  paymentMethod: '',
};

const apiMethodsProps = {
  getAllSales: false,
  getAllClients: false,
  getAllCollaborators: false,
  getAllServices: false,
};

const paymentMethod = [
  { value: 'dinheiro', label: 'Dinheiro' },
  { value: 'cartão', label: 'Cartão' },
  { value: 'pix', label: 'Pix' },
  { value: 'fiado', label: 'Fiado' },
];

const reportFormValidationSchema = Zod.object({
  employeeName: zod.string().optional(),
  clientName: zod.string().optional(),
  serviceName: zod.string().optional(),
  paymentMethod: zod.string().optional(),
});

export function Report() {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IReportForm>({
    resolver: zodResolver(reportFormValidationSchema),
    defaultValues: reportPropsForm,
  });

  const columnHelper = createColumnHelper<ISales>();

  const [sales, setSales] = useState<ISales[]>([salesProps]);
  const [collaborator, setCollaborator] = useState<ICollaborator[]>([
    collaboratorProps,
  ]);
  const [client, setClient] = useState<IClient[]>([clientProps]);
  const [services, setServices] = useState<IServices[]>([servicesProps]);

  const [width, setWidth] = useState<number>(0);
  const [apiError, setApiError] = useState<IApiMethods>(apiMethodsProps);
  const [loading, setLoading] = useState<IApiMethods>(apiMethodsProps);

  const transformCollaboratorIntoLabel = (item: ICollaborator) => ({
    value: item.name,
    label: item.name,
  });

  const transformClientIntoLabel = (item: IClient) => ({
    value: item.name,
    label: item.name,
  });

  const transformServicesIntoLabel = (item: IServices) => ({
    value: item.title,
    label: item.title,
  });

  const collaboratorArraySelect = collaborator.map(
    transformCollaboratorIntoLabel,
  );

  const clientArraySelect = client.map(transformClientIntoLabel);

  const servicesArraySelect = services.map(transformServicesIntoLabel);

  const getAllSales = useCallback(async (filter?: IReportForm) => {
    setLoading((prevState) => ({ ...prevState, getAllSales: true }));
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      const response = await axios.get(
        `https://hair-control.gigalixirapp.com/api/sales?${
          filter?.employeeName === '' || filter?.employeeName === undefined
            ? ''
            : `employee_name=${filter?.employeeName} `
        }${
          filter?.clientName === '' || filter?.clientName === undefined
            ? ''
            : `client_name=${filter?.clientName} `
        }${
          filter?.serviceName === '' || filter?.serviceName === undefined
            ? ''
            : `service_name=${filter?.serviceName} `
        }${
          filter?.paymentMethod === '' || filter?.paymentMethod === undefined
            ? ''
            : `payment_method=${filter?.paymentMethod} `
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSales(response.data);
    } catch {
      setLoading((prevState) => ({ ...prevState, getAllSales: false }));
    } finally {
      setLoading((prevState) => ({ ...prevState, getAllSales: false }));
    }
  }, []);

  const getAllCollaborators = useCallback(async () => {
    setLoading((prevState) => ({ ...prevState, getAllCollaborators: true }));
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
    } catch {
      setApiError((prevState) => ({
        ...prevState,
        getAllCollaborators: false,
      }));
    } finally {
      setLoading((prevState) => ({ ...prevState, getAllCollaborators: false }));
    }
  }, []);

  const getAllClients = useCallback(async () => {
    setLoading((prevState) => ({ ...prevState, getAllClients: true }));
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
      setApiError((prevState) => ({ ...prevState, getAllClients: true }));
    } finally {
      setLoading((prevState) => ({ ...prevState, getAllClients: false }));
    }
  }, []);

  const getAllServices = useCallback(async () => {
    setLoading((prevState) => ({ ...prevState, getAllServices: true }));
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
      setApiError((prevState) => ({
        ...prevState,
        getAllServices: true,
      }));
    } finally {
      setLoading((prevState) => ({ ...prevState, getAllServices: false }));
    }
  }, []);

  useEffect(() => {
    getAllSales();
    getAllCollaborators();
    getAllClients();
    getAllServices();
  }, []);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    handleResize();
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.name_client, {
        id: 'nameClient',
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
        header: () => <span>Cliente</span>,
      }),
      columnHelper.accessor((row) => row.name_employee, {
        id: 'nameEmployee',
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
        header: () => <span>Colaborador</span>,
      }),
      columnHelper.accessor((row) => row.title_service, {
        id: 'titleService',
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
        header: () => <span>Serviço</span>,
      }),
      columnHelper.accessor((row) => row.price_service, {
        id: 'priceService',
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
        header: () => <span>Preço</span>,
      }),
      columnHelper.accessor((row) => row.payment_method, {
        id: 'paymentMethod',
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
        header: () => <span>Método de pagamento</span>,
      }),
      columnHelper.accessor((row) => row.inserted_at, {
        id: 'insertedAt',
        cell: (info) => {
          const date = new Date(info.getValue());

          return (
            <i>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</i>
          );
        },
        footer: (info) => info.column.id,
        header: () => <span>Data</span>,
      }),
    ],
    [width],
  );

  const handleFilterForm: SubmitHandler<IReportForm> = async (data) => {
    await getAllSales(data);
    // await createSale(data);
  };

  return (
    <ReportContainer>
      <h3>Tabela de Vendas</h3>
      <form onSubmit={handleSubmit(handleFilterForm)}>
        <ReportFilter>
          <ReportInputFilter>
            <div>
              <label htmlFor="clientName">Cliente</label>
              <Controller
                name="clientName"
                control={control}
                render={({ field: { onChange, value } }) => {
                  const clientValue = clientArraySelect.find(
                    (c) => c.value === value,
                  );
                  return (
                    <Select
                      name="clientName"
                      placeholder="Selecione um cliente"
                      isClearable
                      options={clientArraySelect}
                      value={clientValue || null}
                      onChange={(val) => onChange(val?.value)}
                      isLoading={loading.getAllClients}
                    />
                  );
                }}
              />
            </div>
            <div>
              <label htmlFor="employeeName">Colaborador</label>
              <Controller
                name="employeeName"
                control={control}
                render={({ field: { onChange, value } }) => {
                  const collaboratorValue = collaboratorArraySelect.find(
                    (c) => c.value === value,
                  );
                  return (
                    <Select
                      name="employeeName"
                      placeholder="Selecione um colaborador"
                      isClearable
                      options={collaboratorArraySelect}
                      value={collaboratorValue || null}
                      onChange={(val) => onChange(val?.value)}
                      isLoading={loading.getAllCollaborators}
                    />
                  );
                }}
              />
            </div>
            <div>
              <label htmlFor="serviceName">Serviço</label>
              <Controller
                name="serviceName"
                control={control}
                render={({ field: { onChange, value } }) => {
                  const servicesValue = servicesArraySelect.find(
                    (c) => c.value === value,
                  );
                  return (
                    <Select
                      name="serviceName"
                      placeholder="Selecione um serviço"
                      isClearable
                      options={servicesArraySelect}
                      value={servicesValue || null}
                      onChange={(val) => onChange(val?.value)}
                      isLoading={loading.getAllServices}
                    />
                  );
                }}
              />
            </div>
            <div>
              <label htmlFor="paymentMethod">Método de pagamento</label>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field: { onChange, value } }) => {
                  const paymentValue = paymentMethod.find(
                    (c) => c.value === value,
                  );
                  return (
                    <Select
                      name="paymentMethod"
                      placeholder="Selecione um método de pagamento"
                      isClearable
                      options={paymentMethod}
                      value={paymentValue || null}
                      onChange={(val) => onChange(val?.value)}
                    />
                  );
                }}
              />
            </div>
          </ReportInputFilter>

          <ReportButtonsFilter>
            <Button
              onClick={() => {
                reset();
                getAllSales();
              }}
            >
              Limpar
            </Button>
            <Button loading={loading.getAllCollaborators} type="submit">
              Filtrar
            </Button>
          </ReportButtonsFilter>
        </ReportFilter>
      </form>

      {apiError.getAllSales ? (
        <p>Erro no servidor</p>
      ) : loading.getAllSales ? (
        <Loading loading={loading.getAllSales} />
      ) : (
        <Table data={sales} columns={columns} />
      )}
    </ReportContainer>
  );
}
