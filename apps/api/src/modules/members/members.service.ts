import { PrismaService } from '@/shared/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

import { FilterMemberInput } from './dto/filter-input';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: FilterMemberInput) {
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
      },
    });
  }

  async findTotalMembers(filter: FilterMemberInput) {
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

  async user(memberId: string) {
    return this.prisma.member.findUnique({ where: { id: memberId } }).user();
  }

  async organization(memberId: string) {
    return this.prisma.member.findUnique({ where: { id: memberId } }).organization();
  }
}
