'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userInviteSchema, UserInviteSchema } from '@/schemas/user-invite.schema';
import { Button, TextField } from '@components/ui';
import { useCreateInvitation } from '@/hooks/queries/useInvitations';

export function UserInvite() {
  const { mutate: createInvitation, isPending } = useCreateInvitation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<UserInviteSchema>({
    resolver: zodResolver(userInviteSchema),
  });

  async function onSubmit(data: UserInviteSchema) {
    createInvitation(data);
  }
  return (
    <div className={'h-full flex flex-col gap-4'}>
      <h3 className={'font-semibold tracking-widest'}>Invitar a un usuario</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-4'}>
        <TextField id={'email'} label={'Correo electrónico'} {...register('email')} error={errors.email?.message} />
        <Button loading={isSubmitting || isLoading || isPending} type={'submit'}>
          Invitar
        </Button>
      </form>
    </div>
  );
}
