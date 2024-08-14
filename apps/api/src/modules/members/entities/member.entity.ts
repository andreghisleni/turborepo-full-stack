import { Organization } from '@/modules/organizations/entities/organization.entity';
import { Session } from '@/modules/sessions/entities/session.entity';
import { User } from '@/modules/users/entities/user.entity';
import { organization } from '@full-stack/authorization';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Member {
  id: string;

  @Field(() => String)
  role: organization.Role;

  organization: Organization;

  user: User;

  sessions: Session[];
}
