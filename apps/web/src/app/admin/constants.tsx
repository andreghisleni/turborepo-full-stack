import { Icon } from '@iconify/react';

import { application } from '@full-stack/authorization';
import { SideNavItem, SideNavProps } from '@/types';

export const SIDENAV_ITEMS_ADMIN = ({ app: { user } }: SideNavProps): SideNavItem[] => {
  const ability = application.defineAbilityFor(user);

  return [
    {
      title: 'Home',
      path: '/admin',
      icon: <Icon icon="lucide:home" width="24" height="24" />,
      exact: true,
      show: true,
    },
    {
      title: 'Usuários',
      path: '/admin/users',
      icon: <Icon icon="lucide:users" width="24" height="24" />,
      show: ability.can('get', 'User'),
    },
    {
      title: 'Organizações',
      path: '/admin/organizations',
      icon: <Icon icon="lucide:building-2" width="24" height="24" />,
      show: ability.can('get', 'User'),
    },
  ];
};
