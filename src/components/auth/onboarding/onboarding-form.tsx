'use client';
import { Button, TextField } from '@components/ui';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { onboardingSchema, OnboardingSchema } from '@/schemas/onboarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Eye } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

export function OnboardingForm({ token }: { token: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
  });

  async function onSubmit(data: OnboardingSchema) {
    try {
      const response = await axios.post('/api/auth/invitations/onboarding', {
        ...data,
        token: token,
      });
      if (response.status === 200) {
        router.push('/dashboard');
        toast('¡Bienvenid@!', { toastId: 'onboarding-success' });
      }
    } catch (error) {
      toast.error('Error al crear la cuenta', { toastId: 'onboarding-error' });
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'grid grid-cols-1  xl:grid-cols-2 gap-4 bg-slate-50 p-8 m-4 rounded-md shadow-md border border-gray-300'}>
      <TextField label={'Nombre'} error={errors.name?.message} {...register('name')} />
      <TextField label={'Apellido'} error={errors.lastName?.message} {...register('lastName')} />
      <TextField
        label={'Contraseña'}
        type={showPassword ? 'text' : 'password'}
        autoComplete="new-password"
        iconActive={showPassword}
        RightIcon={Eye}
        iconClick={() => setShowPassword(!showPassword)}
        error={errors.password?.message}
        {...register('password')}
      />
      <TextField
        label={'Repetir contraseña'}
        type={showPasswordRepeat ? 'text' : 'password'}
        autoComplete="new-password"
        iconActive={showPasswordRepeat}
        RightIcon={Eye}
        iconClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
        error={errors.password_repeat?.message}
        {...register('password_repeat')}
      />
      <Button type={'submit'} className={'w-full'} loading={isSubmitting || isLoading}>
        Comenzar
      </Button>
    </form>
  );
}
