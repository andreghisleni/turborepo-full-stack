import { Organization } from '@/modules/organizations/entities/organization.entity';
import { User } from '@/modules/users/entities/user.entity';
import { organization } from '@full-stack/authorization';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Invite {
  id: string;

  email: string;

  @Field(() => String)
  role: organization.Role;

  author?: User;
  organization: Organization;

  createdAt: Date;

  acceptedAt?: Date;
  rejectedAt?: Date;
}
