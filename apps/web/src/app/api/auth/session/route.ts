import { gql } from '@apollo/client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { client } from '@/services/apollo';

const GET_SESSION = gql`
  query GET_SESSION {
    session {
      id
      user {
        id
        name
        email
        role
        member_on {
          id
          organization {
            id
            slug
            avatarUrl
            name
          }
        }
      }
    }
  }
`;

export async function getServerSession() {
  'use server';

  const has = hasCookie('user', { cookies });

  console.log('has', has); // eslint-disable-line no-console

  if (!has) {
    const {
      data: { session: newSession },
    } = await client.query<{
      session: {
        id: string;
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
              avatarUrl: string;
              name: string;
            };
          }[];
        };
      };
    }>({
      query: GET_SESSION,
    });

    setCookie('user', JSON.stringify(newSession.user), {
      cookies,
      expires: new Date(Date.now() + 1000 * 60 * 1), // 1 minute
    });

    return newSession.user;
  }

  const user = getCookie('user', {
    cookies,
  });

  if (!user) {
    return undefined;
  }

  return JSON.parse(user);
}

export async function GET() {
  const hasToken = hasCookie('token', { cookies });

  if (!hasToken) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const user = await getServerSession();

    if (!user) {
      return new Response('error.message', { status: 400 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.log('error', error); // eslint-disable-line no-console
    return new Response(error.message, { status: 400 });
  }
}
