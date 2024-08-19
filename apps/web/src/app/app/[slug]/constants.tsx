import { Icon } from '@iconify/react';

import { organization } from '@full-stack/authorization';
import { SideNavItem, SideNavPropsApp, UserAvatarMenuItem } from '@/types';
import { UserServer } from '@/utils/get-server';

export const SIDENAV_ITEMS_ADMIN = ({
  org: { user: organizationUser },
  slug,
}: SideNavPropsApp & { slug: string }): SideNavItem[] => {
  const ability = organization.defineAbilityFor(organizationUser);

  return [
    {
      title: 'Home',
      path: `/app/${slug}`,
      icon: <Icon icon="lucide:home" width="24" height="24" />,
      exact: true,
      show: true,
    },
    {
      title: 'Membros',
      path: `/app/${slug}/members`,
      icon: <Icon icon="lucide:users" width="24" height="24" />,
      show: ability.can('get', 'Member'),
    },
    {
      title: 'Convites',
      path: `/app/${slug}/invites`,
      icon: <Icon icon="lucide:users" width="24" height="24" />,
      show: ability.can('get', 'Invite'),
    },
  ];
};

export const USER_AVATAR_MENU_ITEMS = ({ member_on, role }: UserServer): UserAvatarMenuItem[] => [
  ...(member_on.length > 1
    ? [
        {
          title: 'Selecionar organização',
          path: '/select-organization',
        },
      ]
    : []),
  ...(role === 'ADMIN'
    ? [
        {
          title: 'Painel Administrativo',
          path: '/admin',
        },
      ]
    : []),
];
