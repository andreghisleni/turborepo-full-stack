import { User } from '@/modules/users/entities/user.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Session {
  id: string;

  user: User;

  organization: string; // TODO: Create organization entity

  createdAt: Date;
  updatedAt: Date;
}
