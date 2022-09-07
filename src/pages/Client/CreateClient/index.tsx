import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import axios from 'axios';
import * as zod from 'zod';

import { useModal } from '../../../hooks/useModal';

import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { SuccessModal } from '../../../components/Modal/SuccessModal';

import { CreateClientContainer, CreateClientTableFooter } from './styles';
import { FailureModal } from '../../../components/Modal/FailureModal';

interface IClientForm {
  name: string;
  cpf: string;
  rg: string;
  address: string;
  district: string;
  phone: string;
}

function isValidCPF(cpf: any) {
  if (typeof cpf !== 'string') return false;
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  cpf = cpf.split('').map((el: any) => +el);
  const rest = (count: any) =>
    ((cpf
      .slice(0, count - 12)
      .reduce(
        (soma: any, el: any, index: any) => soma + el * (count - index),
        0,
      ) *
      10) %
      11) %
    10;
  return rest(10) === cpf[9] && rest(11) === cpf[10];
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
  cpf: zod.string().refine((val) => isValidCPF(val), {
    message: 'Deve ser um CPF válido.',
  }),
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
  const { isShown, toggle } = useModal();

  const [apiError, setApiError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const createClient = useCallback(async (values: IClientForm) => {
    setLoading(true);
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
    } catch {
      setApiError(true);
    } finally {
      setLoading(false);
      toggle();
    }
  }, []);

  const handleSubmitClient: SubmitHandler<IClientForm> = async (data) => {
    const newData = {
      address: data.address,
      cpf: data.cpf.replace(/\D/g, ''),
      district: data.district,
      name: data.name,
      phone: data.phone.replace(/\D/g, ''),
      rg: data.rg.replace(/\D/g, ''),
    };

    await createClient(newData);
  };

  return (
    <CreateClientContainer>
      <form onSubmit={handleSubmit(handleSubmitClient)}>
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

        <CreateClientTableFooter>
          <ArrowLeft
            size={24}
            onClick={() => navigate('/client', { replace: true })}
          />
          <Button type="submit" loading={loading}>
            Cadastrar
          </Button>
        </CreateClientTableFooter>
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
              message="Não foi possivel criar o Cliente!"
            />
          ) : (
            <SuccessModal
              onConfirm={() => {
                toggle();
                navigate('/client', { replace: true });
              }}
              message="Cliente criado com sucesso!"
            />
          )
        }
      />
    </CreateClientContainer>
  );
}
