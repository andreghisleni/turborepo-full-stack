import { SessionsService } from '@/modules/sessions/sessions.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly sessionsService: SessionsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { refreshToken: boolean; iat: number; exp: number; sub: string }) {
    if (payload.refreshToken) throw new UnauthorizedException('Unauthorized2');

    if (Date.now() >= payload.exp * 1000) throw new UnauthorizedException('Expired token');

    // console.log(payload);

    const session = await this.sessionsService.findById(payload.sub);

    if (!session) throw new UnauthorizedException('Unauthorized');

    const user = await this.sessionsService.user(session.id);

    if (session.memberId) {
      const member = await this.sessionsService.member(session.memberId);
      return {
        ...session,
        user,
        member,
      };
    }

    return {
      ...session,
      user,
    };
  }
}
