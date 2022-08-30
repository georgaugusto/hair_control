import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'phosphor-react';
import axios from 'axios';
import * as zod from 'zod';

import { useModal } from '../../../hooks/useModal';

import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { SuccessModal } from '../../../components/Modal/SuccessModal';

import { CollaboratorContainer, CollaboratorAtions } from './styles';

interface ICollaboratorForm {
  name: string;
  cpf: string;
  email: string;
  total_commission: number;
  total_received: number;
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

const collaboratorPropsForm = {
  name: '',
  cpf: '',
  email: '',
  total_commission: 0,
  total_received: 0,
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

const createCollaboratorFormValidationSchema = zod.object({
  name: zod.string().min(1, 'Nome Obrigatório.'),
  cpf: zod.string().min(14, 'Deve ser um CPF válido.'),
  email: zod.string().min(12, 'Deve ser um E-mail válido.'),
});

export function ViewCollaborator() {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ICollaboratorForm>({
    resolver: zodResolver(createCollaboratorFormValidationSchema),
    defaultValues: collaboratorPropsForm,
  });

  const { isShown, toggle } = useModal();
  const { collaboratorId } = useParams();
  const navigate = useNavigate();

  const [collaborator, setCollaborator] =
    useState<ICollaborator>(collaboratorProps);

  const [edit, setEdit] = useState(false);

  const getCollaborator = useCallback(async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      const response = await axios.get(
        `https://hair-control.gigalixirapp.com/api/employees/${collaboratorId}`,
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
      //
    }
  }, []);

  const putCollaborator = useCallback(
    async (values: ICollaboratorForm) => {
      try {
        const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);
        await axios.put(
          `https://hair-control.gigalixirapp.com/api/employees/${collaboratorId}`,
          {
            name: values.name,
            cpf: values.cpf,
            email: values.email,
            total_commission: values.total_commission,
            total_received: values.total_received,
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
    },
    [navigate],
  );

  const delCollaborator = useCallback(async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);
      await axios.delete(
        `https://hair-control.gigalixirapp.com/api/employees/${collaboratorId}`,
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

  useEffect(() => {
    getCollaborator();
  }, []);

  useEffect(() => {
    if (collaborator) {
      setValue('name', collaborator.name);
      setValue(
        'cpf',
        collaborator.cpf.replace(
          /(\d{3})?(\d{3})?(\d{3})?(\d{2})/,
          '$1.$2.$3-$4',
        ),
      );
      setValue('email', collaborator.email);
      setValue('total_commission', collaborator.total_commission);
      setValue('total_received', collaborator.total_received);
      setValue('inserted_at', collaborator.inserted_at);
    }
  }, [collaborator]);

  const handleforgotSignIn: SubmitHandler<ICollaboratorForm> = async (data) => {
    const newData = {
      name: data.name,
      cpf: data.cpf.replace(/\D/g, ''),
      email: data.email,
      total_commission: data.total_commission,
      total_received: data.total_received,
      inserted_at: data.inserted_at,
    };

    await putCollaborator(newData);
  };

  return (
    <CollaboratorContainer>
      <form onSubmit={handleSubmit(handleforgotSignIn)}>
        <div>
          <Input
            type="text"
            label="Nome Completo"
            placeholder="Nome Completo"
            disabled={!edit}
            error={errors.name}
            {...register('name')}
          />
          <Input
            type="text"
            label="CPF"
            placeholder="CPF"
            mask={'CPF'}
            disabled={!edit}
            error={errors.cpf}
            {...register('cpf')}
          />
          <Input
            type="text"
            label="E-mail"
            placeholder="E-mail"
            disabled={!edit}
            error={errors.email}
            {...register('email')}
          />
        </div>
        <div>
          <Input
            type="text"
            label="Comissão Total"
            placeholder="Comissão Total"
            disabled={true}
            error={errors.total_commission}
            {...register('total_commission')}
          />
          <Input
            type="text"
            label="Total Recebido"
            placeholder="Total Recebido"
            disabled={true}
            error={errors.total_received}
            {...register('total_received')}
          />
          <Input
            type="text"
            label="Data de Criação"
            placeholder="Data de Criação"
            disabled={true}
            error={errors.inserted_at}
            {...register('inserted_at')}
          />
        </div>

        <CollaboratorAtions>
          <ArrowLeft
            size={24}
            onClick={() => navigate('/collaborator', { replace: true })}
          />
          <div>
            {edit ? (
              <> </>
            ) : (
              <Button onClick={() => delCollaborator()} color="red">
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
                <Button color="green" type="submit">
                  Salvar
                </Button>
              </>
            ) : (
              <Button onClick={() => setEdit(!edit)}>Editar</Button>
            )}
          </div>
        </CollaboratorAtions>
      </form>

      <Modal
        isShown={isShown}
        hide={toggle}
        modalContent={
          <SuccessModal
            onConfirm={() => {
              toggle();
              setEdit(false);
              navigate('/collaborator', { replace: true });
            }}
            message={
              edit
                ? 'Colaborador Alterado com sucesso!'
                : 'Colaborador excluído com sucesso!'
            }
          />
        }
      />
    </CollaboratorContainer>
  );
}
