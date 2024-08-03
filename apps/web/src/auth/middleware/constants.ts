const Headers = {
  NextRewrite: 'x-middleware-rewrite',
  NextResume: 'x-middleware-next',
  NextRedirect: 'Location',
  NextUrl: 'next-url',
  NextAction: 'next-action',
} as const;

const Headers2 = {
  AuthToken: 'x-clerk-auth-token',
  AuthStatus: 'x-clerk-auth-status',
  AuthReason: 'x-clerk-auth-reason',
  AuthMessage: 'x-clerk-auth-message',
  ClerkUrl: 'x-clerk-clerk-url',
  EnableDebug: 'x-clerk-debug',
  ClerkRedirectTo: 'x-clerk-redirect-to',
  CloudFrontForwardedProto: 'cloudfront-forwarded-proto',
  Authorization: 'authorization',
  ForwardedPort: 'x-forwarded-port',
  ForwardedProto: 'x-forwarded-proto',
  ForwardedHost: 'x-forwarded-host',
  Accept: 'accept',
  Referrer: 'referer',
  UserAgent: 'user-agent',
  Origin: 'origin',
  Host: 'host',
  ContentType: 'content-type',
  SecFetchDest: 'sec-fetch-dest',
  Location: 'location',
} as const;

const ContentTypes = {
  Json: 'application/json',
} as const;

export const constants = {
  Headers,
  Headers2,
  ContentTypes,
} as const;
