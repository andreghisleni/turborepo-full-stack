import { PrismaService } from '@/shared/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

import { FilterMemberInput } from './dto/filter-input';
import { UpdateMemberRoleInput } from './dto/update-role.input';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: FilterMemberInput, organizationId: string) {
    return this.prisma.member.findMany({
      orderBy: {
        user: {
          name: 'asc',
        },
      },
      skip: filter.page * filter.limit,
      take: filter.limit,
      where: {
        user: {
          name: {
            contains: filter.name,
            mode: 'insensitive',
          },
        },
        organizationId,
      },
    });
  }

  async findTotalMembers(filter: FilterMemberInput, organizationId: string) {
    return this.prisma.member.count({
      orderBy: {
        user: { name: 'asc' },
      },
      where: {
        user: {
          name: {
            contains: filter.name,
            mode: 'insensitive',
          },
        },
        organizationId,
      },
    });
  }

  async findById(id: string) {
    const member = await this.prisma.member.findUnique({
      where: { id },
    });

    if (!member) {
      throw new GraphQLError('Member not found', {
        extensions: {
          code: 400,
        },
      });
    }

    return member;
  }

  async updateRole({ memberId, role }: UpdateMemberRoleInput, userId: string) {
    const user = await this.prisma.member.findUnique({ where: { id: memberId } }).user();

    if (user?.id === userId) {
      throw new GraphQLError('You cannot change your own role', {
        extensions: {
          code: 400,
        },
      });
    }

    return this.prisma.member.update({
      where: { id: memberId },
      data: {
        role: role.toUpperCase() as 'ADMIN' | 'MEMBER' | 'BILLING',
      },
    });
  }

  async user(memberId: string) {
    return this.prisma.member.findUnique({ where: { id: memberId } }).user();
  }

  async organization(memberId: string) {
    return this.prisma.member.findUnique({ where: { id: memberId } }).organization();
  }
}
