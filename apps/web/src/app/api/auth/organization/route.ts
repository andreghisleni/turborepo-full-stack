import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { deleteCookie, setCookie } from 'cookies-next';
import { gql } from '@apollo/client';
import { z } from 'zod';
import { client } from '@/services/apollo';

const VALIDATE_ORGANIZATION = gql`
  mutation validateOrganization($slug: String!) {
    validateOrganization(slug: $slug) {
      member{
      
      }
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
        session: {
          user: {
            id: string;
            name: string;
            email: string;
            role: string;
            member_on: {
              id: string;
              organization: {
                id: string;
                slug: string;
              };
            }[];
          };
        };
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

    setCookie(
      'user-role',
      JSON.stringify(refreshResolverResponse.data?.refreshSession.session.user),
      {
        cookies,
      },
    );
    setCookie('user', JSON.stringify(refreshResolverResponse.data?.refreshSession.session.user), {
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
    deleteCookie('user-role', {
      cookies,
    });
    return new Response(error, { status: 400 });
  }
}
