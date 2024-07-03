import { PrismaService } from '@/shared/database/prisma.service';
import { EnvService } from '@/shared/env/env.service';
import { MailTemplate } from '@/shared/mail/mail.interface';
import { MailService } from '@/shared/mail/mail.service';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

import { CreateInviteInput } from './dto/create-invite.input';

@Injectable()
export class InvitesService {
  constructor(
    private prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly env: EnvService,
  ) {}
  async create(input: CreateInviteInput, organizationId: string, authorId: string) {
    const inviteExists = await this.prisma.invite.findUnique({
      where: { email_organizationId: { email: input.email, organizationId } },
    });

    if (inviteExists) {
      throw new GraphQLError('Invite already exists', {
        extensions: {
          code: 401,
        },
      });
    }

    const organization = await this.prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!organization) {
      throw new GraphQLError('Organization not found', {
        extensions: {
          code: 400,
        },
      });
    }

    const author = await this.prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!author) {
      throw new GraphQLError('Author not found', {
        extensions: {
          code: 400,
        },
      });
    }

    const invite = await this.prisma.invite.create({
      data: {
        email: input.email,
        role: input.role,
        organization: {
          connect: {
            id: organizationId,
          },
        },
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });

    const inviteUser = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    await this.mailService.sendMail({
      to: {
        name: inviteUser?.name || 'Anonimo',
        email: inviteUser?.email || input.email,
      },
      subject: 'Você foi convidado para uma organização',
      template: {
        name: inviteUser ? MailTemplate.InviteUser : MailTemplate.InviteNewUser,
        data: {
          name: inviteUser?.name || '',
          org: {
            name: organization.name,
          },
          author: {
            name: author.name,
          },
          accept_invite_url: `${this.env.get('API_URL')}/invite/${invite.id}`,
          create_account_accept_invite_url: `${this.env.get('API_URL')}/auth/register?invite=${invite.id}`,
        },
      },
    });

    return invite;
  }

  async findById(id: string) {
    return this.prisma.invite.findUnique({
      where: { id },
    });
  }
}
