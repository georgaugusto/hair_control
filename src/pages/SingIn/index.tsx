import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import * as zod from 'zod';
import decode from 'jwt-decode';

import { useModal } from '../../hooks/useModal';
import IdentificationContext from '../../contexts/Identification';

import { Button } from './components/Button';
import { Input } from './components/Input';
import { Modal } from '../../components/Modal';
import { FailureModal } from '../../components/Modal/FailureModal';

import logoImg2x from '../../assets/logo-celia.svg';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SingInFormData {
  email: string;
  password: string;
}

interface IToken {
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  sub: string;
  typ: string;
}

const signInFormSchema = zod.object({
  email: zod.string().email('Deve ser um e-mail válido').max(255),
  password: zod.string().min(1, 'Senha Obrigatória.').max(255),
});

export function SingIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const { isShown, toggle } = useModal();
  const navigate = useNavigate();
  const { setUserIdentification } = useContext(IdentificationContext);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('@hair:user-1.0.0');
    if (token) navigate('/dashboard');
  }, [navigate]);

  const signInUser = useCallback(
    async (values: SingInFormData) => {
      setLoading(true);
      try {
        const response = await axios.post(
          'https://hair-control.gigalixirapp.com/api/employees/signin',
          {
            email: values.email,
            password: values.password,
          },
        );

        const tokenDecode: IToken = decode(response.data.token);

        setUserIdentification((state) => ({
          ...state,
          exp: tokenDecode?.exp,
          iat: tokenDecode?.iat,
          token: response.data.token,
        }));

        navigate('/home', { replace: true });
      } catch {
        toggle();
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );

  const handleforgotSignIn: SubmitHandler<SingInFormData> = async (data) => {
    await signInUser(data);
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg2x} alt="logo Célia e Cabeleireiros" />

          <form onSubmit={handleSubmit(handleforgotSignIn)}>
            <h1>Faça seu logon</h1>

            <Input
              type="text"
              placeholder="E-mail"
              error={errors.email}
              {...register('email')}
            />
            <Input
              type="password"
              placeholder="Password"
              error={errors.password}
              {...register('password')}
            />

            <Button loading={loading} type="submit">
              Entrar
            </Button>
          </form>
        </AnimationContainer>
      </Content>

      <Background />

      <Modal
        isShown={isShown}
        hide={toggle}
        modalContent={
          <FailureModal
            onConfirm={() => {
              toggle();
            }}
            message="Não foi possível fazer login!"
          />
        }
      />
    </Container>
  );
}
