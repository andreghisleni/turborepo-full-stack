import { organization, application } from '@full-stack/authorization';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CaslAbilityFactory {
  createForUserOrg(user: organization.User) {
    return organization.defineAbilityFor(user);
  }

  createForUserApp(user: application.User) {
    return application.defineAbilityFor(user);
  }
}
