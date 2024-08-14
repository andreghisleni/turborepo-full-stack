import { Invite } from '@/modules/invites/entities/invite.entity';
import { Member } from '@/modules/members/entities/member.entity';
import { User } from '@/modules/users/entities/user.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Organization {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  shouldAttachUsersByDomain: boolean;
  avatarUrl?: string;

  createdAt: Date;
  updatedAt: Date;

  owner: User;

  invites: Invite[];
  members: Member[];
}
