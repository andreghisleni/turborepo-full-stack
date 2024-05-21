import { defineAbilityFor } from '@full-stack/authorization';
import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  role: 'ADMIN' | 'MEMBER';
};

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    return defineAbilityFor(user);
  }
}
