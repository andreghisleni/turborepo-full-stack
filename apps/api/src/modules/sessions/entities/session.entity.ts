import { Member } from '@/modules/members/entities/member.entity';
import { User } from '@/modules/users/entities/user.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Session {
  id: string;

  user: User;

  member: Member;

  createdAt: Date;
  updatedAt: Date;
}
