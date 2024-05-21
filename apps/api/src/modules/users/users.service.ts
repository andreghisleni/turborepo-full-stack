import { PrismaService } from '@/shared/database/prisma.service';
import { MailTemplate } from '@/shared/mail/mail.interface';
import { MailService } from '@/shared/mail/mail.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private readonly mailService: MailService) { } // eslint-disable-line

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

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findTotalUsers() {
    return this.prisma.user.count();
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
}
