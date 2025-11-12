import { UserInvite } from '@components/dashboard/admin/user-invite';
import { List } from '@components/dashboard/admin/list';

export default function UsuariosPage() {
  return (
    <div className={'flex flex-col gap-8 px-8 justify-center items-start'}>
      <UserInvite />
      <List />
    </div>
  );
}
