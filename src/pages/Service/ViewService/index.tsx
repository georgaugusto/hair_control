import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import * as zod from 'zod';
import { ArrowLeft } from 'phosphor-react';

import { useModal } from '../../../hooks/useModal';

import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { SuccessModal } from '../../../components/Modal/SuccessModal';

import { ServiceContainer, ServiceAtions } from './styles';
import { FailureModal } from '../../../components/Modal/FailureModal';

interface IServiceForm {
  title: string;
  price: string;
}

interface IService {
  title: string;
  price: number;
}

interface IApiMethods {
  getService: boolean;
  putService: boolean;
  delService: boolean;
}

const servicePropsForm = {
  title: '',
  price: '',
};

const serviceProps = {
  title: '',
  price: 0,
};

const apiMethodsProps = {
  getService: false,
  putService: false,
  delService: false,
};

const createServiceFormValidationSchema = zod.object({
  title: zod.string().min(1, 'Nome do serviço obrigatório.'),
  price: zod.string().min(1, 'Preço do serviço obrigatório.'),
});

export function ViewService() {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IServiceForm>({
    resolver: zodResolver(createServiceFormValidationSchema),
    defaultValues: servicePropsForm,
  });

  const { isShown, toggle } = useModal();
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState<IService>(serviceProps);
  const [edit, setEdit] = useState(false);
  const [apiError, setApiError] = useState<IApiMethods>(apiMethodsProps);
  const [loading, setLoading] = useState<IApiMethods>(apiMethodsProps);

  const getService = useCallback(async () => {
    setLoading((prevState) => ({ ...prevState, getService: true }));
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      const response = await axios.get(
        `https://hair-control.gigalixirapp.com/api/services/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setService(response.data);
    } catch {
      setApiError((prevState) => ({ ...prevState, getService: true }));
    } finally {
      setLoading((prevState) => ({ ...prevState, getService: false }));
    }
  }, []);

  const putService = useCallback(
    async (values: IServiceForm) => {
      setLoading((prevState) => ({ ...prevState, putService: true }));
      try {
        const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);
        await axios.put(
          `https://hair-control.gigalixirapp.com/api/services/${serviceId}`,
          {
            title: values.title,
            price: Number(values.price),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch {
        setApiError((prevState) => ({ ...prevState, putService: true }));
      } finally {
        setLoading((prevState) => ({
          ...prevState,
          putService: false,
        }));
        toggle();
      }
    },
    [navigate],
  );

  const delService = useCallback(async () => {
    setLoading((prevState) => ({ ...prevState, delService: true }));
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);
      await axios.delete(
        `https://hair-control.gigalixirapp.com/api/services/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch {
      setApiError((prevState) => ({ ...prevState, delService: true }));
    } finally {
      setLoading((prevState) => ({ ...prevState, delService: false }));
      toggle();
    }
  }, []);

  useEffect(() => {
    getService();
  }, []);

  useEffect(() => {
    if (service) {
      const price = service.price / 100;
      setValue('title', service.title);
      setValue(
        'price',
        price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
      );
    }
  }, [service]);

  const handleSubmitService: SubmitHandler<IServiceForm> = async (data) => {
    const newData = {
      title: data.title,
      price: data.price.toString().replace(/\D/g, ''),
    };

    await putService(newData);
  };

  return (
    <ServiceContainer>
      <form onSubmit={handleSubmit(handleSubmitService)}>
        <div>
          <Input
            type="text"
            label="Nome do Serviço"
            placeholder="Nome do Serviço"
            disabled={!edit}
            error={errors.title}
            {...register('title')}
          />
          <Input
            type="text"
            label="Preço"
            placeholder="Preço"
            mask={'money'}
            disabled={!edit}
            error={errors.price}
            {...register('price')}
          />
        </div>

        <ServiceAtions>
          <ArrowLeft
            size={24}
            onClick={() => navigate('/service', { replace: true })}
          />
          <div>
            {edit ? (
              <> </>
            ) : (
              <Button onClick={() => delService()} color="red">
                Deletar
              </Button>
            )}

            {edit ? (
              <>
                <Button
                  onClick={() => {
                    setEdit(!edit);
                    clearErrors();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  color="green"
                  type="submit"
                  loading={loading.putService || loading.delService}
                >
                  Salvar
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setEdit(!edit)}
                loading={loading.getService}
              >
                Editar
              </Button>
            )}
          </div>
        </ServiceAtions>
      </form>

      <Modal
        isShown={isShown}
        hide={toggle}
        modalContent={
          apiError.getService ? (
            <SuccessModal
              onConfirm={() => {
                toggle();
              }}
              message="Opss erro no servidor!"
            />
          ) : apiError.putService || apiError.delService ? (
            <FailureModal
              onConfirm={() => {
                toggle();
              }}
              message={
                edit
                  ? 'Não foi possivel alterar o Serviço!'
                  : 'Não foi possivel excluído o Serviço!'
              }
            />
          ) : (
            <SuccessModal
              onConfirm={() => {
                toggle();
                setEdit(false);
                navigate('/service', { replace: true });
              }}
              message={
                edit
                  ? 'Serviço Alterado com sucesso!'
                  : 'Serviço excluído com sucesso!'
              }
            />
          )
        }
      />
    </ServiceContainer>
  );
}
