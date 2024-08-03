import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { RequestLike } from './types';

export function setCustomAttributeOnRequest(req: RequestLike, key: string, value: string): void {
  Object.assign(req, { [key]: value });
}

export function getCustomAttributeFromRequest(
  req: RequestLike,
  key: string,
): string | null | undefined {
  return key in req ? req[key] : undefined;
}

export function getHeader(req: RequestLike, name: string): string | null | undefined {
  if (isNextRequest(req)) {
    return req.headers.get(name);
  }

  // If no header has been determined for IncomingMessage case, check if available within private `socket` headers
  // When deployed to vercel, req.headers for API routes is a `IncomingHttpHeaders` key-val object which does not follow
  // the Headers spec so the name is no longer case-insensitive.
  return (
    req.headers[name] ||
    req.headers[name.toLowerCase()] ||
    (req.socket as any)?._httpMessage?.getHeader(name) // eslint-disable-line no-underscore-dangle
  );
}

export function getCookie(req: RequestLike, name: string): string | undefined {
  if (isNextRequest(req)) {
    // Nextjs broke semver in the 13.0.0 -> 13.0.1 release, so even though
    // this should be RequestCookie in all updated apps. In order to support apps
    // using v13.0.0 still, we explicitly add the string type
    // https://github.com/vercel/next.js/pull/41526
    const reqCookieOrString = req.cookies.get(name) as
      | ReturnType<NextRequest['cookies']['get']>
      | string
      | undefined;
    if (!reqCookieOrString) {
      return undefined;
    }
    return typeof reqCookieOrString === 'string' ? reqCookieOrString : reqCookieOrString.value;
  }
  return req.cookies[name];
}

function isNextRequest(val: unknown): val is NextRequest {
  try {
    const { headers, nextUrl, cookies } = (val || {}) as NextRequest;
    return (
      typeof headers?.get === 'function' &&
      typeof nextUrl?.searchParams.get === 'function' &&
      typeof cookies?.get === 'function'
    );
  } catch (e) {
    return false;
  }
}

const OVERRIDE_HEADERS = 'x-middleware-override-headers';
const MIDDLEWARE_HEADER_PREFIX = 'x-middleware-request' as string;

export const setRequestHeadersOnNextResponse = (
  res: NextResponse | Response,
  req: Request,
  newHeaders: Record<string, string>,
) => {
  if (!res.headers.get(OVERRIDE_HEADERS)) {
    // Emulate a user setting overrides by explicitly adding the required nextjs headers
    // https://github.com/vercel/next.js/pull/41380
    res.headers.set(OVERRIDE_HEADERS, [...req.headers.keys()] as any);
    req.headers.forEach((val, key) => {
      res.headers.set(`${MIDDLEWARE_HEADER_PREFIX}-${key}`, val);
    });
  }

  // Now that we have normalised res to include overrides, just append the new header
  Object.entries(newHeaders).forEach(([key, val]) => {
    res.headers.set(OVERRIDE_HEADERS, `${res.headers.get(OVERRIDE_HEADERS)},${key}`);
    res.headers.set(`${MIDDLEWARE_HEADER_PREFIX}-${key}`, val);
  });
};

export const injectSSRStateIntoObject = <O, T>(obj: O, authObject: T) => {
  // Serializing the state on dev env is a temp workaround for the following issue:
  // https://github.com/vercel/next.js/discussions/11209|Next.js
  const __clerk_ssr_state = (process.env.NODE_ENV !== "production" ? JSON.parse(JSON.stringify({ ...authObject })) : { ...authObject }) as T; // eslint-disable-line
  return { ...obj, __clerk_ssr_state };
};

export const apiEndpointUnauthorizedNextResponse = () => {
  return NextResponse.json(null, { status: 401, statusText: 'Unauthorized' });
};

export const isCrossOrigin = (from: string | URL, to: string | URL) => {
  const fromUrl = new URL(from);
  const toUrl = new URL(to);
  return fromUrl.origin !== toUrl.origin;
};
