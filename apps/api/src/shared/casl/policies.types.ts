import { application, organization } from '@full-stack/authorization';
import { SetMetadata } from '@nestjs/common';

interface IPolicyOrgHandler {
  handle(ability: organization.AppAbility): boolean;
}

type PolicyOrgHandlerCallback = (ability: organization.AppAbility) => boolean;

export type PolicyOrgHandler = IPolicyOrgHandler | PolicyOrgHandlerCallback;

export const CHECK_POLICIES_ORG_KEY = 'check_policy_org';
export const CheckPoliciesOrg = (...handlers: PolicyOrgHandler[]) =>
  SetMetadata(CHECK_POLICIES_ORG_KEY, handlers);

interface IPolicyAppHandler {
  handle(ability: application.AppAbility): boolean;
}

type PolicyAppHandlerCallback = (ability: application.AppAbility) => boolean;

export type PolicyAppHandler = IPolicyAppHandler | PolicyAppHandlerCallback;

export const CHECK_POLICIES_APP_KEY = 'check_policy_app';
export const CheckPoliciesApp = (...handlers: PolicyAppHandler[]) =>
  SetMetadata(CHECK_POLICIES_APP_KEY, handlers);
