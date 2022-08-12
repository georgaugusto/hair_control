import axios from 'axios';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as zod from 'zod';

import { Input } from '../../../components/Input';

import { CreateClientContainer } from './styles';
import { useCallback } from 'react';
import { Button } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';

interface IClientForm {
  name: string;
  cpf: string;
  rg: string;
  address: string;
  district: string;
  phone: string;
}

const clientPropsForm = {
  name: '',
  cpf: '',
  rg: '',
  address: '',
  district: '',
  phone: '',
};

const createClientFormValidationSchema = zod.object({
  name: zod.string().min(1, 'Nome Obrigatório.'),
  cpf: zod.string().min(14, 'Deve ser um CPF válido.'),
  rg: zod.string().min(12, 'Deve ser um RG válido.'),
  address: zod.string().min(1, 'Endereço Obrigatório.'),
  district: zod.string().min(1, 'Bairro Obrigatório.'),
  phone: zod.string().min(15, 'Deve ser um Telefone válido.'),
});

export function CreateClient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClientForm>({
    resolver: zodResolver(createClientFormValidationSchema),
    defaultValues: clientPropsForm,
  });

  const navigate = useNavigate();

  const signInUser = useCallback(
    async (values: IClientForm) => {
      try {
        const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

        await axios.post(
          'https://hair-control.gigalixirapp.com/api/clients',
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
        navigate('/client', { replace: true });
      }
    },
    [navigate],
  );

  const handleforgotSignIn: SubmitHandler<IClientForm> = async (data) => {
    await signInUser(data);
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
          <Input
            type="text"
            label="RG"
            placeholder="RG"
            mask={'RG'}
            error={errors.rg}
            {...register('rg')}
          />
        </div>
        <div>
          <Input
            type="text"
            label="Endereço"
            placeholder="Endereço"
            error={errors.address}
            {...register('address')}
          />
          <Input
            type="text"
            label="Bairro"
            placeholder="Bairro"
            error={errors.district}
            {...register('district')}
          />
          <Input
            type="text"
            label="Telefone"
            mask={'phone'}
            placeholder="Telefone"
            error={errors.phone}
            {...register('phone')}
          />
        </div>

        <div>
          <ArrowLeft
            size={32}
            onClick={() => navigate('/client', { replace: true })}
          />
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </CreateClientContainer>
  );
}
