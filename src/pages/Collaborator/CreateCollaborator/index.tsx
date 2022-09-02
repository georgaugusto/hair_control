import { useCallback, useState } from 'react';
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

import { CreateCollaboratorContainer, CollaboratorAtions } from './styles';
import { FailureModal } from '../../../components/Modal/FailureModal';

interface ICollaboratorForm {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

const collaboratorPropsForm = {
  name: '',
  cpf: '',
  email: '',
  password: '',
};

const createCollaboratorFormValidationSchema = zod.object({
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
  } = useForm<ICollaboratorForm>({
    resolver: zodResolver(createCollaboratorFormValidationSchema),
    defaultValues: collaboratorPropsForm,
  });

  const navigate = useNavigate();
  const { isShown, toggle } = useModal();

  const [apiError, setApiError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const signInUser = useCallback(async (values: ICollaboratorForm) => {
    setLoading(true);
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
    } catch {
      setApiError(true);
    } finally {
      setLoading(false);
      toggle();
    }
  }, []);

  const handleforgotSignIn: SubmitHandler<ICollaboratorForm> = async (data) => {
    const newData = {
      cpf: data.cpf.replace(/\D/g, ''),
      email: data.email,
      name: data.name,
      password: data.password,
    };

    await signInUser(newData);
  };

  return (
    <CreateCollaboratorContainer>
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

        <CollaboratorAtions>
          <ArrowLeft
            size={24}
            onClick={() => navigate('/collaborator', { replace: true })}
          />
          <Button type="submit" loading={loading}>
            Cadastrar
          </Button>
        </CollaboratorAtions>
      </form>

      <Modal
        isShown={isShown}
        hide={toggle}
        modalContent={
          apiError ? (
            <FailureModal
              onConfirm={() => {
                toggle();
              }}
              message="Não foi possivel criar o Colaborador!"
            />
          ) : (
            <SuccessModal
              onConfirm={() => {
                toggle();
                navigate('/collaborator', { replace: true });
              }}
              message="Colaborador criado com sucesso!"
            />
          )
        }
      />
    </CreateCollaboratorContainer>
  );
}
