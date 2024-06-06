import { AbilityBuilder } from '@casl/ability';

import { User } from './models/user';
import { Role } from './roles';

import { AppAbility } from '.';

type PermissionsByRole = (user: User, builder: AbilityBuilder<AppAbility>) => void;

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can, cannot }) {
    can('manage', 'all');

    cannot(['update'], 'User');
    can(['update'], 'User', {
      id: { $eq: user.id },
    });

    cannot(['update-role'], 'User');
    can(['update-role'], 'User', {
      id: { $ne: user.id },
    });
  },
  DEFAULT(user, { can }) {
    can(['get'], 'User');

    can(['update'], 'User', {
      id: { $eq: user.id },
    });
  },
  // BILLING(_, { can }) {
  //   can('manage', 'Billing')
  // },
};
