import { SessionsService } from '@/modules/sessions/sessions.service';
import { UsersService } from '@/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Session } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { add, isAfter } from 'date-fns';

import { CreateAuthInput } from './dto/create-auth.input';

interface IGenerateSession {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private sessionsService: SessionsService, private jwtService: JwtService) { } // eslint-disable-line

  async validateUser(data: CreateAuthInput) {
    // console.log('front', front);
    const user = await this.usersService.findByEmail(data.email);

    if (!user.activatedAt) {
      throw new UnauthorizedException('User not activated');
    }

    const validatePassword = compareSync(data.password, user.passwordHash);

    if (!validatePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // if (front === 'admin') {
    //   return this.generateSession({
    //     userId: user.id,
    //     front,
    //   });
    // }

    return this.generateSession({
      userId: user.id,
    });
  }

  private async generateSession({ userId }: IGenerateSession) {
    const checkSession = await this.sessionsService.findUserSession(userId);

    let session: Session;
    if (!checkSession) {
      session = await this.sessionsService.create({
        userId,
      });
    } else {
      session = checkSession;
    }

    const token = await this.generateToken(session.id);
    const refreshToken = await this.generateRefreshToken(session.id);

    return {
      session,
      token,
      refreshToken,
    };
  }

  private async generateToken(sessionId: string) {
    return this.jwtService.signAsync(
      {
        refreshToken: false,
      },
      {
        subject: sessionId,
        expiresIn: '10m',
      },
    );
  }

  private async generateRefreshToken(sessionId: string) {
    return this.jwtService.signAsync(
      {
        refreshToken: true,
      },
      {
        subject: sessionId,
        expiresIn: '10d',
      },
    );
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      ignoreExpiration: true,
    });

    if (!payload.refreshToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const expireIn = new Date(payload.exp * 1000);

    const session = await this.sessionsService.findById(payload.sub);

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    const token = await this.generateToken(session.id);

    let newRefreshToken: string | null = null;

    if (isAfter(add(new Date(), { days: 1 }), expireIn)) {
      newRefreshToken = await this.generateRefreshToken(session.id);
    }

    return {
      token,
      refreshToken: newRefreshToken || refreshToken,
      session,
    };
  }

  // TODO: Implement validateOrganization
}
