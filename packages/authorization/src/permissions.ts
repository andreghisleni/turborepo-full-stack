import { AbilityBuilder } from '@casl/ability';

import { User } from './models/user';
import { Role } from './roles';

import { AppAbility } from '.';

type PermissionsByRole = (user: User, builder: AbilityBuilder<AppAbility>) => void;

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can, cannot }) {
    can('manage', 'all');

    cannot(['transfer_ownership', 'update'], 'Organization');
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    });
  },
  MEMBER(user, { can }) {
    can('get', 'User');
  },
  // BILLING(_, { can }) {
  //   can('manage', 'Billing')
  // },
};
