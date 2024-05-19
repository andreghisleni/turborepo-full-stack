import { AppAbility } from '@full-stack/authorization';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CaslAbilityFactory, User } from './casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from './policies.types';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];

    // const { user } = context.switchToHttp().getRequest();
    const user = { id: '1', role: 'ADMIN' } as User;

    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every(handler => {
      const result = this.execPolicyHandler(handler, ability);

      if (!result) {
        throw new ForbiddenException('You are not allowed to perform this action');
      }

      return result;
    });
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
