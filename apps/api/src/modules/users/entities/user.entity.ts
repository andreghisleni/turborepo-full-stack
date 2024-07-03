import { Organization } from '@/modules/organizations/entities/organization.entity';
import { Session } from '@/modules/sessions/entities/session.entity';
import { application } from '@full-stack/authorization';
import { ObjectType, HideField, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  id: string;

  name: string;
  email: string;
  avatarUrl?: string;

  @HideField()
  passwordHash: string;

  @Field(() => String)
  role: application.Role;

  createdAt: Date;
  updatedAt: Date;

  passwordUpdatedAt: Date;

  activatedAt?: Date;
  blockedAt?: Date;

  tokens: string; // TODO: Create token entity
  ips: string; // TODO: Create ip entity

  invites: string; // TODO: Create invite entity
  member_on: string; // TODO: Create organization entity
  owns_organizations: Organization[];

  sessions: Session[];
}
