import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import axios from 'axios';
import * as zod from 'zod';

import { useModal } from '../../../hooks/useModal';

import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { SuccessModal } from '../../../components/Modal/SuccessModal';

import { CreateClientContainer, CreateClientTableFooter } from './styles';

interface IClientForm {
  name: string;
  cpf: string;
  rg: string;
  address: string;
  district: string;
  phone: string;
}

interface IClient {
  address: string;
  cpf: string;
  district: string;
  id: string;
  inserted_at: string;
  name: string;
  phone: string;
  rg: string;
}

const clientPropsForm = {
  name: '',
  cpf: '',
  rg: '',
  address: '',
  district: '',
  phone: '',
};

const clientProps = {
  address: '',
  cpf: '',
  district: '',
  id: '',
  inserted_at: '',
  name: '',
  phone: '',
  rg: '',
};

const createClientFormValidationSchema = zod.object({
  name: zod.string().min(1, 'Nome Obrigatório.'),
  cpf: zod.string().min(14, 'Deve ser um CPF válido.'),
  rg: zod.string().min(12, 'Deve ser um RG válido.'),
  address: zod.string().min(1, 'Endereço Obrigatório.'),
  district: zod.string().min(1, 'Bairro Obrigatório.'),
  phone: zod.string().min(15, 'Deve ser um Telefone válido.'),
});

export function ViewClient() {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IClientForm>({
    resolver: zodResolver(createClientFormValidationSchema),
    defaultValues: clientPropsForm,
  });

  const { isShown, toggle } = useModal();
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState<IClient>(clientProps);
  const [edit, setEdit] = useState(false);

  const getClient = useCallback(async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      const response = await axios.get(
        `https://hair-control.gigalixirapp.com/api/clients/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setClient(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      // navigate('/client', { replace: true });
    }
  }, []);

  const putClient = useCallback(
    async (values: IClientForm) => {
      try {
        const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

        await axios.put(
          `https://hair-control.gigalixirapp.com/api/clients/${clientId}`,
          {
            name: values.name,
            cpf: values.cpf,
            rg: values.rg,
            address: values.address,
            district: values.district,
            phone: values.phone,
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

  const delClient = useCallback(async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);
      await axios.delete(
        `https://hair-control.gigalixirapp.com/api/clients/${clientId}`,
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
    getClient();
  }, []);

  useEffect(() => {
    if (client) {
      setValue('name', client.name);
      setValue(
        'cpf',
        client.cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4'),
      );
      setValue(
        'rg',
        client.rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4'),
      );
      setValue('address', client.address);
      setValue('district', client.district);
      setValue(
        'phone',
        client.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
      );
    }
  }, [client]);

  const handleforgotSignIn: SubmitHandler<IClientForm> = async (data) => {
    const newData = {
      address: data.address,
      cpf: data.cpf.replace(/\D/g, ''),
      district: data.district,
      name: data.name,
      phone: data.phone.replace(/\D/g, ''),
      rg: data.rg.replace(/\D/g, ''),
    };

    await putClient(newData);
  };

  return (
    <CreateClientContainer>
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
            label="RG"
            placeholder="RG"
            mask={'RG'}
            disabled={!edit}
            error={errors.rg}
            {...register('rg')}
          />
        </div>
        <div>
          <Input
            type="text"
            label="Endereço"
            placeholder="Endereço"
            disabled={!edit}
            error={errors.address}
            {...register('address')}
          />
          <Input
            type="text"
            label="Bairro"
            placeholder="Bairro"
            disabled={!edit}
            error={errors.district}
            {...register('district')}
          />
          <Input
            type="text"
            label="Telefone"
            mask={'phone'}
            placeholder="Telefone"
            disabled={!edit}
            error={errors.phone}
            {...register('phone')}
          />
        </div>

        <CreateClientTableFooter>
          <ArrowLeft
            size={24}
            onClick={() => navigate('/client', { replace: true })}
          />
          <div>
            {edit ? (
              <> </>
            ) : (
              <Button onClick={() => delClient()} color="red">
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
        </CreateClientTableFooter>
      </form>

      <Modal
        isShown={isShown}
        hide={toggle}
        modalContent={
          <SuccessModal
            onConfirm={() => {
              toggle();
              setEdit(false);
              navigate('/client', { replace: true });
            }}
            message={
              edit
                ? 'Cliente Alterado com sucesso!'
                : 'Cliente excluído com sucesso!'
            }
          />
        }
      />
    </CreateClientContainer>
  );
}
