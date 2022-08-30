import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import * as zod from 'zod';
import axios from 'axios';
import { ArrowLeft } from 'phosphor-react';

import { useModal } from '../../../hooks/useModal';

import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { SuccessModal } from '../../../components/Modal/SuccessModal';

import { CreateServiceContainer, ServiceAtions } from './styles';

interface IServiceForm {
  title: string;
  price: number;
}

const servicePropsForm = {
  title: '',
  price: 0,
};

const createServiceFormValidationSchema = zod.object({
  title: zod.string().min(1, 'Nome do serviço obrigatório.'),
  price: zod.string().min(1, 'Preço do serviço obrigatório.'),
});

export function CreateService() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IServiceForm>({
    resolver: zodResolver(createServiceFormValidationSchema),
    defaultValues: servicePropsForm,
  });

  const navigate = useNavigate();
  const { isShown, toggle } = useModal();

  const createService = useCallback(async (values: IServiceForm) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      await axios.post(
        'https://hair-control.gigalixirapp.com/api/services',
        {
          title: values.title,
          price: values.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    } finally {
      toggle();
    }
  }, []);

  const handleSubmitService: SubmitHandler<IServiceForm> = async (data) => {
    const newData = {
      title: data.title,
      price: Number(data.price.toString().replace(/\D/g, '')),
    };

    await createService(newData);
  };

  return (
    <CreateServiceContainer>
      <form onSubmit={handleSubmit(handleSubmitService)}>
        <div>
          <Input
            type="text"
            label="Nome do Serviço"
            placeholder="Nome do Serviço"
            error={errors.title}
            {...register('title')}
          />
          <Input
            type="text"
            label="Preço"
            placeholder="Preço"
            mask={'money'}
            error={errors.price}
            {...register('price')}
          />
        </div>

        <ServiceAtions>
          <ArrowLeft
            size={24}
            onClick={() => navigate('/service', { replace: true })}
          />
          <Button type="submit">Cadastrar</Button>
        </ServiceAtions>
      </form>

      <Modal
        isShown={isShown}
        hide={toggle}
        modalContent={
          <SuccessModal
            onConfirm={() => {
              toggle();
              navigate('/service', { replace: true });
            }}
            message="Serviço criado com sucesso!"
          />
        }
      />
    </CreateServiceContainer>
  );
}
