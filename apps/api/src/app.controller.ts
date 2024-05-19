import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { PoliciesGuard } from './casl/policies.guard';
import { CheckPolicies } from './casl/policies.types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies(ability => ability.can('create', 'Invite'))
  getHello(): string {
    return this.appService.getHello();
  }
}
