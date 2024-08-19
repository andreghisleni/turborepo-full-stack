import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import jwt from 'jsonwebtoken';
import { env } from '@/env';
import { setHeader, stringifyHeaders } from './response';

import { createRouteMatcher } from './routeMatcher';
import { withLogger } from './debugLogger';
import { receivedRequestForIgnoredRoute } from './errors';
import { constants } from './constants';
import { getCookie } from './utils';
import { refreshToken } from '..';

export const DEFAULT_CONFIG_MATCHER = ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'];

export const DEFAULT_IGNORED_ROUTES = [`/((?!api|trpc))(_next.*|.+\\.[\\w]+$)`];

export const DEFAULT_API_ROUTES = ['/api/(.*)', '/trpc/(.*)'];

type IgnoredRoutesParam =
  | Array<RegExp | string>
  | RegExp
  | string
  | ((req: NextRequest) => boolean);

type AuthMiddlewareParams = {
  ignoredRoutes?: IgnoredRoutesParam;

  debug?: boolean;
};

export interface AuthMiddleware {
  (params?: AuthMiddlewareParams): NextMiddleware;
}

const authMiddleware: AuthMiddleware = (...args: unknown[]) => {
  const [params = {}] = args as [AuthMiddlewareParams?];
  const { ignoredRoutes, ...options } = params;

  const isIgnoredRoute = createRouteMatcher(ignoredRoutes || DEFAULT_IGNORED_ROUTES);

  return withLogger('authMiddleware', logger => async (_req: NextRequest, _evt: NextFetchEvent) => {
    if (options.debug) {
      logger.enable();
    }
    const nextRequest = _req;

    logger.debug('URL debug', {
      url: nextRequest.nextUrl.href,
      method: nextRequest.method,
      headers: stringifyHeaders(nextRequest.headers),
      nextUrl: nextRequest.nextUrl.href,
    });

    logger.debug('Options debug', {
      ...options,
    });

    if (isIgnoredRoute(nextRequest)) {
      logger.debug({ isIgnoredRoute: true });
      if (!params.ignoredRoutes) {
          console.warn(receivedRequestForIgnoredRoute(nextRequest.nextUrl.href, JSON.stringify(DEFAULT_CONFIG_MATCHER))); // eslint-disable-line
      }
      return setHeader(NextResponse.next(), constants.Headers2.AuthReason, 'ignored-route');
    }

    // TODO: implement token verification

    const token = getCookie(_req, 'token');

    const rt = getCookie(_req, 'refreshToken');
    const lastUrl = env.NEXT_PUBLIC_VERCEL_URL.concat(_req.nextUrl.pathname);

    // if don't have token or refresh token, redirect to sign-in
    if (!token || !rt) {
      logger.debug('No token or refresh token found');
      return NextResponse.redirect(new URL(`/auth/sign-in?callback=${lastUrl}`, lastUrl));
    }

    const tokenPayload = jwt.decode(token);
    const refreshTokenPayload = jwt.decode(rt);

    if (!tokenPayload || !refreshTokenPayload) {
      logger.debug('No token or refresh token found');
      return NextResponse.redirect(new URL(`/auth/sign-in?callback=${lastUrl}`, lastUrl));
    }

    if (typeof tokenPayload === 'string' || typeof refreshTokenPayload === 'string') {
      logger.debug('Token or refresh token are invalid');
      return NextResponse.redirect(new URL(`/auth/sign-in?callback=${lastUrl}`, lastUrl));
    }

    const tokenPayloadType = tokenPayload as {
      exp: number;
    };

    const refreshTokenPayloadType = refreshTokenPayload as {
      exp: number;
    };

    // if token and refresh token are expired, redirect to sign-in
    if (
      tokenPayloadType.exp - Date.now() / 1000 <= 0 &&
      refreshTokenPayloadType.exp - Date.now() / 1000 <= 0
    ) {
      logger.debug('Token and refresh token are expired');
      return NextResponse.redirect(new URL(`/auth/sign-in?callback=${lastUrl}`, lastUrl));
    }

    // if token is expired but refresh token is not, refresh token
    if (
      tokenPayloadType.exp - Date.now() / 1000 <= 0 &&
      refreshTokenPayloadType.exp - Date.now() / 1000 > 0
    ) {
      logger.debug('Token is expired but refresh token is not');
      await refreshToken({
        refreshToken: rt,
      });
    }

    const finalRes = NextResponse.next();

    logger.debug(() => ({
      mergedHeaders: stringifyHeaders(finalRes.headers),
    }));

    const isAdminPages = nextRequest.nextUrl.pathname.startsWith('/admin');

    if (isAdminPages) {
      logger.debug('Admin page detected');

      const userRole = getCookie(_req, 'user-role');

      if (!userRole) {
        logger.debug('No userRole found');
        return NextResponse.redirect(new URL('/auth/sign-in', _req.nextUrl.href));
      }

      const { role } = JSON.parse(userRole);

      logger.debug('Session', { role });

      if (role !== 'ADMIN') {
        logger.debug('User is not an admin');
        return NextResponse.redirect(new URL('/unauthorized', _req.nextUrl.href));
      }
    }

    const result = NextResponse.next();

    return result;
  });
};

export { authMiddleware };
