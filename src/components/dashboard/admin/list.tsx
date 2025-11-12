import { UsersList } from '@components/dashboard/admin/users-list';
import { InvitationList } from '@components/dashboard/admin/invitation-list';

export function List() {
  return (
    <div className={'grid grid-cols-1 xl:grid-cols-2 gap-20  w-full'}>
      <UsersList />
      <InvitationList />
    </div>
  );
}
