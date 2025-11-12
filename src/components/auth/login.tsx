'use client';
import { Button, TextField } from '@components/ui';
import { useState } from 'react';
import { Eye, LucideMail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { authSchema, AuthSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/queries/useLogin';

export function Login() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const router = useRouter();
  const { mutate: login } = useLogin({ onSuccess: () => router.push('/dashboard') });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  async function onSubmit(data: AuthSchema) {
    login(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'border border-gray-300 backdrop-blur-2xl p-8 rounded-md shadow-md flex flex-col gap-4'}>
      <TextField label={'Correo electrónico'} id={'email'} RightIcon={LucideMail} {...register('email')} error={errors.email?.message} />
      <TextField
        label={'Contraseña'}
        id={'password'}
        type={visiblePassword ? 'text' : 'password'}
        iconActive={visiblePassword}
        RightIcon={Eye}
        iconClick={() => setVisiblePassword(!visiblePassword)}
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type={'submit'} loading={isSubmitting || isLoading}>
        Iniciar Sesión
      </Button>
    </form>
  );
}
