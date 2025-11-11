import { ClipboardList, UserStar } from 'lucide-react';

export const navItems = [
  {
    label: 'Postulantes',
    single_label: 'Postulante',
    href: '/dashboard',
    Icon: UserStar,
    slug: 'postulantes',
    role: ['evaluator'],
  },
  {
    label: 'Evaluaciones',
    single_label: 'Evaluación',
    href: '/dashboard/evaluaciones',
    Icon: ClipboardList,
    slug: 'evaluaciones',
    role: ['evaluator'],
  },
  {
    label: 'Usuarios',
    href: '/dashboard/usuarios',
    Icon: UserStar,
    slug: 'usuarios',
    role: ['admin'],
  },
  {
    label: 'Mis evaluaciones',
    href: '/dashboard/apply-evaluaciones',
    Icon: ClipboardList,
    slug: 'mis-evaluaciones',
    role: ['participant'],
  },
];

export function getRoleNavItems(role: string) {
  return navItems.filter((item) => item.role?.includes(role));
}
