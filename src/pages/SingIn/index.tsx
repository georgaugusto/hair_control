import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import * as zod from 'zod';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import logoImg2x from '../../assets/logo-ignite.svg';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SingInFormData {
  email: string;
  password: string;
}

const signInFormSchema = zod.object({
  email: zod.string().email('Deve ser um e-mail válido').max(255),
  password: zod.string().max(255),
});

export function SingIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('@SolouChuva:token');
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
        const tokenJSON = JSON.stringify(response.data);
        localStorage.setItem('@hair:user-1.0.0', tokenJSON);

        navigate('/home', { replace: true });
      } catch (err) {
        console.log(err);
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
          <img src={logoImg2x} alt="logo Sol ou Chuva" />

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
    </Container>
  );
}
