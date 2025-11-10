import { Calendar, ClipboardList, FileText, UserStar } from 'lucide-react';

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
    label: 'Historial',
    single_label: 'Historial',
    href: '/dashboard/historial',
    Icon: FileText,
    slug: 'historial',
    role: ['evaluator'],
  },
  {
    label: 'Calendario',
    href: '/dashboard/calendario',
    Icon: Calendar,
    slug: 'calendario',
    role: ['evaluator'],
  },
  {
    label: 'Documentos',
    href: '/dashboard/documentos',
    Icon: FileText,
    slug: 'documentos',
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
