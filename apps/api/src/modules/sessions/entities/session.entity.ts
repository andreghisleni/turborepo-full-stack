import { User } from '@/modules/users/entities/user.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Session {
  id: string;

  user: User;

  member: string; // TODO: Create Member entity

  createdAt: Date;
  updatedAt: Date;
}
