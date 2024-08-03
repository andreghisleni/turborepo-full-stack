import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { deleteCookie, setCookie } from 'cookies-next';
import { gql } from '@apollo/client';
import { z } from 'zod';
import { client } from '@/services/apollo';

const REFRESH_TOKEN = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshSession(refreshToken: $refreshToken) {
      token
      refreshToken
    }
  }
`;

export async function POST(request: NextRequest) {
  const req = await request.json();

  try {
    const { refreshToken: rt } = z
      .object({
        refreshToken: z.string(),
      })
      .parse(req);

    const refreshResolverResponse = await client.mutate<{
      refreshSession: {
        token: string;
        refreshToken: string;
      };
    }>({
      mutation: REFRESH_TOKEN,
      variables: { refreshToken: rt },
    });

    const token = refreshResolverResponse.data?.refreshSession.token;
    const refreshTokenNew = refreshResolverResponse.data?.refreshSession.refreshToken;

    if (!token || !refreshTokenNew) {
      throw new Error('Empty token or refreshToken');
    }

    setCookie('token', token, {
      cookies,
    });

    setCookie('refreshToken', refreshTokenNew, {
      cookies,
    });
    return NextResponse.json({ token }, { status: 201 });
  } catch (error: any) {
    deleteCookie('token', {
      cookies,
    });
    deleteCookie('refreshToken', {
      cookies,
    });
    deleteCookie('user', {
      cookies,
    });
    deleteCookie('permissions', {
      cookies,
    });
    return new Response(error, { status: 400 });
  }
}
