import { useCallback, useContext, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Zod, * as zod from 'zod';
import Select from 'react-select';

import IdentificationContext from '../../contexts/identification';
import { useModal } from '../../hooks/useModal';

import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { SuccessModal } from '../../components/Modal/SuccessModal';
import { FailureModal } from '../../components/Modal/FailureModal';

import { SaleContainer, SaleHeader, ErrorMessage } from './styles';

interface ISaleForm {
  paymentMethod: string;
  employeeId: string;
  serviceId: string;
  clientId: string;
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

interface ICollaborator {
  cpf: string;
  email: string;
  id: string;
  inserted_at: string;
  name: string;
  total_commission: number;
  total_received: number;
}

interface IServices {
  id: string;
  title: string;
  price: number;
}

interface IApiMethods {
  getAllClients: boolean;
  getAllCollaborators: boolean;
  getAllServices: boolean;
  createSale: boolean;
}

const salePropsForm = {
  paymentMethod: '',
  employeeId: '',
  serviceId: '',
  clientId: '',
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

const collaboratorProps = {
  cpf: '',
  email: '',
  id: '',
  inserted_at: '',
  name: '',
  total_commission: 0,
  total_received: 0,
};

const servicesProps = {
  id: '',
  title: '',
  price: 0,
};

const apiMethodsProps = {
  getAllClients: false,
  getAllCollaborators: false,
  getAllServices: false,
  createSale: false,
};

const paymentMethod = [
  { value: 'Dinheiro', label: 'Dinheiro' },
  { value: 'Cartão', label: 'Cartão' },
  { value: 'Pix', label: 'Pix' },
];

const saleFormValidationSchema = Zod.object({
  paymentMethod: zod.string().min(1, 'Colaborador obrigatório.'),
  employeeId: zod.string().min(1, 'Cliente obrigatório.'),
  serviceId: zod.string().min(1, 'Serviço obrigatório.'),
  clientId: zod.string().min(1, 'Método de pagamento obrigatório.'),
});

export function Sale() {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ISaleForm>({
    resolver: zodResolver(saleFormValidationSchema),
    defaultValues: salePropsForm,
  });

  const { userIdentification } = useContext(IdentificationContext);
  const { isShown, toggle } = useModal();

  const [client, setClient] = useState<IClient[]>([clientProps]);
  const [collaborator, setCollaborator] = useState<ICollaborator[]>([
    collaboratorProps,
  ]);
  const [services, setServices] = useState<IServices[]>([servicesProps]);
  const [apiError, setApiError] = useState<IApiMethods>(apiMethodsProps);
  const [loading, setLoading] = useState<IApiMethods>(apiMethodsProps);

  const transformClientIntoLabel = (item: IClient) => ({
    value: item.id,
    label: item.name,
  });

  const transformCollaboratorIntoLabel = (item: ICollaborator) => ({
    value: item.id,
    label: item.name,
  });

  const transformServicesIntoLabel = (item: IServices) => ({
    value: item.id,
    label: item.title,
  });

  const collaboratorArraySelect = collaborator.map(
    transformCollaboratorIntoLabel,
  );
  const clientArraySelect = client.map(transformClientIntoLabel);

  const servicesArraySelect = services.map(transformServicesIntoLabel);

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
        getAllCollaborators: true,
      }));
    } finally {
      setLoading((prevState) => ({ ...prevState, getAllCollaborators: false }));
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
    getAllClients();
    getAllCollaborators();
    getAllServices();
  }, []);

  useEffect(() => {
    if (userIdentification.userId) {
      setValue('employeeId', userIdentification.userId);
    }
  }, [userIdentification, setValue]);

  const createSale = useCallback(
    async (values: ISaleForm) => {
      setLoading((prevState) => ({ ...prevState, createSale: true }));
      try {
        const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

        await axios.post(
          'https://hair-control.gigalixirapp.com/api/sales',
          {
            payment_method: values.paymentMethod,
            employee_id: values.employeeId,
            service_id: values.serviceId,
            client_id: values.clientId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch {
        setApiError((prevState) => ({
          ...prevState,
          createSale: true,
        }));
        reset();
        toggle();
      } finally {
        setLoading((prevState) => ({ ...prevState, createSale: false }));
        reset();
        toggle();
      }
    },
    [reset],
  );

  const handleforgotSignIn: SubmitHandler<ISaleForm> = async (data) => {
    await createSale(data);
  };

  return (
    <SaleContainer>
      <SaleHeader>
        <h3>Cadastro de Vendas</h3>
      </SaleHeader>

      <form onSubmit={handleSubmit(handleforgotSignIn)}>
        <div>
          <div>
            <label htmlFor="employeeId">Colaborador</label>
            <Controller
              name="employeeId"
              control={control}
              render={({ field: { onChange, value } }) => {
                const collaboratorValue = collaboratorArraySelect.find(
                  (c) => c.value === value,
                );
                return (
                  <Select
                    name="employeeId"
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
            <ErrorMessage isErrored={!!errors.employeeId}>
              {!!errors.employeeId && <span>{errors.employeeId?.message}</span>}
            </ErrorMessage>
          </div>

          <div>
            <label htmlFor="clientId">Cliente</label>
            <Controller
              name="clientId"
              control={control}
              render={({ field: { onChange, value } }) => {
                const clientValue = clientArraySelect.find(
                  (c) => c.value === value,
                );
                return (
                  <Select
                    name="clientId"
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
            <ErrorMessage isErrored={!!errors.clientId}>
              {!!errors.clientId && <span>{errors.clientId?.message}</span>}
            </ErrorMessage>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="serviceId">Serviço</label>
            <Controller
              name="serviceId"
              control={control}
              render={({ field: { onChange, value } }) => {
                const servicesValue = servicesArraySelect.find(
                  (c) => c.value === value,
                );
                return (
                  <Select
                    name="serviceId"
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
            <ErrorMessage isErrored={!!errors.serviceId}>
              {!!errors.serviceId && <span>{errors.serviceId?.message}</span>}
            </ErrorMessage>
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
                    isDisabled
                    options={paymentMethod}
                    value={paymentValue || null}
                    onChange={(val) => onChange(val?.value)}
                  />
                );
              }}
            />
            <ErrorMessage isErrored={!!errors.paymentMethod}>
              {!!errors.paymentMethod && (
                <span>{errors.paymentMethod?.message}</span>
              )}
            </ErrorMessage>
          </div>
        </div>

        <div>
          <Button onClick={() => reset()}>Limpar</Button>
          <Button loading={loading.createSale} type="submit">
            Cadastrar
          </Button>
        </div>
      </form>

      <Modal
        isShown={isShown}
        hide={toggle}
        modalContent={
          apiError.createSale ? (
            <FailureModal
              onConfirm={() => {
                toggle();
              }}
              message="Não foi possivel criar a venda!"
            />
          ) : (
            <SuccessModal
              onConfirm={() => {
                toggle();
              }}
              message="Venda criada com sucesso!"
            />
          )
        }
      />
    </SaleContainer>
  );
}
