import { gql } from '@apollo/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';

import { setCookie } from 'cookies-next';
import { client } from '@/services/apollo';

const SIGN_IN = gql`
  mutation SING_IN($email: String!, $password: String!) {
    createSession(data: { email: $email, password: $password }) {
      token
      refreshToken
      session {
        id
        user {
          id
          name
          email
          role
        }
      }
    }
  }
`;

export async function POST(request: NextRequest) {
  const req = await request.json();

  try {
    const { email, password } = z
      .object({
        email: z.string().email(),
        password: z.string(),
      })
      .parse(req);

    const { data: d } = await client.mutate<{
      createSession: {
        token: string;
        refreshToken: string;
        session: {
          user: {
            id: string;
            name: string;
            email: string;
            role: string;
          };
        };
      };
    }>({
      mutation: SIGN_IN,
      variables: {
        email,
        password,
      },
    });

    if (!d || !d.createSession) {
      throw new Error('Invalid credentials');
    }

    const {
      token,
      refreshToken,
      session: { user },
    } = d.createSession;

    if (!token || !refreshToken || !user) {
      throw new Error('Invalid credentials');
    }

    setCookie('token', token, {
      cookies,
    });
    setCookie('refreshToken', refreshToken, {
      cookies,
    });
    setCookie('user', JSON.stringify(user), {
      cookies,
      expires: new Date(Date.now() + 1000 * 60 * 1), // 1 minute
    });

    return NextResponse.json(d.createSession, { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}
