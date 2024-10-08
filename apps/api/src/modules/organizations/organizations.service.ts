import { PrismaService } from '@/shared/database/prisma.service';
import { EnvService } from '@/shared/env/env.service';
import { MailTemplate } from '@/shared/mail/mail.interface';
import { MailService } from '@/shared/mail/mail.service';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

import { UsersService } from '../users/users.service';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { FilterOrganizationInput } from './dto/filter-input';
import { UpdateOrganizationInput } from './dto/update-organization.input';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService, private readonly mailService: MailService, private readonly env: EnvService, private readonly usersService: UsersService) { } // eslint-disable-line

  async create(input: CreateOrganizationInput) {
    const organizationExists = await this.prisma.organization.findUnique({
      where: { slug: input.slug },
    });

    if (organizationExists) {
      throw new GraphQLError('Organization already exists', {
        extensions: {
          code: 401,
        },
      });
    }

    if (input.domain) {
      const domainExists = await this.prisma.organization.findUnique({
        where: { domain: input.domain },
      });

      if (domainExists) {
        throw new GraphQLError('Domain already exists', {
          extensions: {
            code: 401,
          },
        });
      }
    }

    const owner = await this.usersService.findById(input.ownerId);

    const organization = await this.prisma.organization.create({
      data: {
        name: input.name,
        slug: input.slug,
        domain: input.domain,
        shouldAttachUsersByDomain: input.shouldAttachUsersByDomain,
        owner: {
          connect: {
            id: owner.id,
          },
        },
      },
    });

    await this.prisma.member.create({
      data: {
        role: 'ADMIN',
        organization: {
          connect: {
            id: organization.id,
          },
        },
        user: {
          connect: {
            id: owner.id,
          },
        },
      },
    });

    await this.mailService.sendMail({
      to: {
        name: owner.name,
        email: owner.email,
      },
      subject: 'Usuário criado com sucesso',
      template: {
        name: MailTemplate.NewOrganization,
        data: {
          name: owner.name,
          organization: {
            name: organization.name,
          },
        },
      },
    });

    return organization;
  }

  async findAll(filter: FilterOrganizationInput) {
    return this.prisma.organization.findMany({
      orderBy: {
        name: 'asc',
      },
      skip: filter.page * filter.limit,
      take: filter.limit,
      where: {
        name: {
          contains: filter.name,
          mode: 'insensitive',
        },
      },
    });
  }

  async findTotalOrganizations(filter: FilterOrganizationInput) {
    return this.prisma.organization.count({
      orderBy: {
        name: 'asc',
      },
      where: {
        name: {
          contains: filter.name,
          mode: 'insensitive',
        },
      },
    });
  }

  async findById(id: string) {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
    });

    if (!organization) {
      throw new GraphQLError('Organization not found', {
        extensions: {
          code: 400,
        },
      });
    }

    return organization;
  }
  async findBySlug(slug: string) {
    const organization = await this.prisma.organization.findUnique({
      where: { slug },
    });

    if (!organization) {
      throw new GraphQLError('Organization not found', {
        extensions: {
          code: 400,
        },
      });
    }

    return organization;
  }

  async update(input: UpdateOrganizationInput) {
    return this.prisma.organization.update({
      where: { id: input.id },
      data: {
        name: input.name,
      },
    });
  }

  async owner(organizationId: string) {
    return this.prisma.organization.findUnique({ where: { id: organizationId } }).owner();
  }

  async members(organizationId: string) {
    return this.prisma.organization.findUnique({ where: { id: organizationId } }).members();
  }

  async invites(organizationId: string) {
    return this.prisma.organization.findUnique({ where: { id: organizationId } }).invites();
  }
}
