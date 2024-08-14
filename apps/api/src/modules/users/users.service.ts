import { PrismaService } from '@/shared/database/prisma.service';
import { EnvService } from '@/shared/env/env.service';
import { MailTemplate } from '@/shared/mail/mail.interface';
import { MailService } from '@/shared/mail/mail.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';

import { CreateUserInput } from './dto/create-user.input';
import { FilterUserInput } from './dto/filter-input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private readonly mailService: MailService, private readonly env: EnvService) { } // eslint-disable-line

  async create({ password, ...createUserInput }: CreateUserInput) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserInput.email },
    });

    if (userExists) {
      throw new GraphQLError('User already exists', {
        extensions: {
          code: 401,
        },
      });
    }

    const totalUsers = await this.prisma.user.count();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...createUserInput,
        passwordHash: hashedPassword,
        activatedAt: totalUsers === 0 ? new Date() : null,
        role: totalUsers === 0 ? 'ADMIN' : 'DEFAULT',
      },
    });

    await this.mailService.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Usuário criado com sucesso',
      template: {
        name: MailTemplate.NewUser,
        data: {
          name: user.name,
        },
      },
    });

    return user;
  }

  async findAll(filter: FilterUserInput) {
    return this.prisma.user.findMany({
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

  async findTotalUsers(filter: FilterUserInput) {
    return this.prisma.user.count({
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
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new GraphQLError('User not found', {
        extensions: {
          code: 400,
        },
      });
    }

    return user;
  }
  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new GraphQLError('User not found', {
        extensions: {
          code: 400,
        },
      });
    }

    return user;
  }

  async update(id: string, { ...updateUserInput }: UpdateUserInput) {
    // let hashedPassword;

    // if (password && password !== new_password && new_password === check_new_password) {
    //   hashedPassword = await bcrypt.hash(new_password, 10);

    //   return this.prisma.user.update({
    //     where: { id },
    //     data: {
    //       ...updateUserInput,
    //       password_hash: hashedPassword,
    //     },
    //   });
    // }
    // if (password && ((password !== new_password && new_password !== check_new_password) || password === new_password)) {
    //   throw new GraphQLError('Passwords do not match', {
    //     extensions: {
    //       code: 400,
    //     },
    //   });
    // }
    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserInput,
      },
    });
  }

  async updateAvatar(id: string, avatarUrl: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        avatarUrl,
      },
    });
  }

  async activate(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new GraphQLError('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        activatedAt: new Date(),
      },
    });
  }

  async block(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new GraphQLError('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        blockedAt: new Date(),
      },
    });
  }

  async sendForgotPasswordEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new GraphQLError('User not found', {
        extensions: {
          code: 400,
        },
      });
    }

    if (!user.activatedAt) {
      throw new GraphQLError('User is not activated', {
        extensions: {
          code: 401,
        },
      });
    }

    if (user.blockedAt) {
      throw new GraphQLError('User is blocked', {
        extensions: {
          code: 401,
        },
      });
    }

    const token = await this.prisma.token.create({
      data: {
        userId: user.id,
        type: 'PASSWORD_RECOVER',
      },
    });

    await this.mailService.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Recuperação de senha',
      template: {
        name: MailTemplate.ForgotPassword,
        data: {
          name: user.name,
          reset_url: `${this.env.get('WEB_URL')}/auth/reset-password/${token.id}`,
        },
      },
    });

    return true;
  }

  async resetPassword({ tokenId, password }: ResetPasswordInput) {
    const token = await this.prisma.token.findUnique({
      where: { id: tokenId },
    });

    if (!token) {
      throw new GraphQLError('Token not found, or token already used', {
        extensions: {
          code: 400,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.update({
      where: { id: token.userId },
      data: {
        passwordHash: hashedPassword,
      },
    });

    await this.prisma.token.delete({
      where: { id: tokenId },
    });
    return true;
  }

  async updateRole({ userId, role }: UpdateRoleInput) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        role: role.toUpperCase() as 'ADMIN' | 'DEFAULT',
      },
    });
  }

  async owns_organizations(id: string) {
    return this.prisma.user
      .findUnique({
        where: { id },
      })
      .owns_organizations();
  }

  async sessions(id: string) {
    return this.prisma.user
      .findUnique({
        where: { id },
      })
      .sessions();
  }

  async member_on(id: string) {
    return this.prisma.user
      .findUnique({
        where: { id },
      })
      .member_on();
  }

  async invites(id: string) {
    return this.prisma.user
      .findUnique({
        where: { id },
      })
      .invites();
  }
}
