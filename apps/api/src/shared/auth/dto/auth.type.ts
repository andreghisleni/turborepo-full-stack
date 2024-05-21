import { Session } from '@/modules/sessions/entities/session.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthType {
  @Field(() => Session)
  session: Session;

  @Field(() => String)
  token: string;

  @Field(() => String)
  refreshToken: string;
}
