import { Member } from '@/modules/members/entities/member.entity';
import { Organization } from '@/modules/organizations/entities/organization.entity';
import { User } from '@/modules/users/entities/user.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Session {
  id: string;

  user: User;

  member: Member;

  organization: Organization;

  createdAt: Date;
  updatedAt: Date;
}
