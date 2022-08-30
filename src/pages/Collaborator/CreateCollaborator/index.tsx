import { useCallback } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import { useModal } from '../../../hooks/useModal';
import { Modal } from '../../../components/Modal';
import { SuccessModal } from '../../../components/Modal/SuccessModal';

import { CreateClientContainer, CreateClientTableFooter } from './styles';

interface IClientForm {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

const clientPropsForm = {
  name: '',
  cpf: '',
  email: '',
  password: '',
};

const createClientFormValidationSchema = zod.object({
  name: zod.string().min(1, 'Nome Obrigatório.'),
  cpf: zod.string().min(14, 'Deve ser um CPF válido.'),
  email: zod.string().email('Deve ser um E-mail válido.'),
  password: zod
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres.')
    .max(255),
});

export function CreateCollaborator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClientForm>({
    resolver: zodResolver(createClientFormValidationSchema),
    defaultValues: clientPropsForm,
  });

  const navigate = useNavigate();
  const { isShown, toggle } = useModal();

  const signInUser = useCallback(async (values: IClientForm) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      await axios.post(
        'https://hair-control.gigalixirapp.com/api/employees',
        {
          name: values.name,
          cpf: values.cpf,
          email: values.email,
          password: values.password,
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

  const handleforgotSignIn: SubmitHandler<IClientForm> = async (data) => {
    const newData = {
      cpf: data.cpf.replace(/\D/g, ''),
      email: data.email,
      name: data.name,
      password: data.password,
    };

    await signInUser(newData);
  };

  return (
    <CreateClientContainer>
      <form onSubmit={handleSubmit(handleforgotSignIn)}>
        <div>
          <Input
            type="text"
            label="Nome Completo"
            placeholder="Nome Completo"
            error={errors.name}
            {...register('name')}
          />
          <Input
            type="text"
            label="CPF"
            placeholder="CPF"
            mask={'CPF'}
            error={errors.cpf}
            {...register('cpf')}
          />
        </div>
        <div>
          <Input
            type="text"
            label="E-mail"
            placeholder="E-mail"
            error={errors.email}
            {...register('email')}
          />
          <Input
            type="text"
            label="Senha"
            placeholder="Senha"
            error={errors.password}
            {...register('password')}
          />
        </div>

        <CreateClientTableFooter>
          <ArrowLeft
            size={24}
            onClick={() => navigate('/collaborator', { replace: true })}
          />
          <Button type="submit">Cadastrar</Button>
        </CreateClientTableFooter>
      </form>

      <Modal
        isShown={isShown}
        hide={toggle}
        modalContent={
          <SuccessModal
            onConfirm={() => {
              toggle();
              navigate('/collaborator', { replace: true });
            }}
            message="Colaborador criado com sucesso!"
          />
        }
      />
    </CreateClientContainer>
  );
}
