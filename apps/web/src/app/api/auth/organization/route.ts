import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { deleteCookie, setCookie } from 'cookies-next';
import { gql } from '@apollo/client';
import { z } from 'zod';
import { client } from '@/services/apollo';

const VALIDATE_ORGANIZATION = gql`
  mutation validateOrganization($slug: String!) {
    updateSession(slug: $slug) {
      member {
        id
        role
      }
    }
  }
`;

export async function POST(request: NextRequest) {
  const req = await request.json();

  try {
    const { slug } = z
      .object({
        slug: z.string(),
      })
      .parse(req);

    const refreshResolverResponse = await client.mutate<{
      updateSession: {
        member: {
          id: string;
          role: string;
        };
      };
    }>({
      mutation: VALIDATE_ORGANIZATION,
      variables: { slug },
    });

    setCookie('member-role', JSON.stringify(refreshResolverResponse.data?.updateSession.member), {
      cookies,
    });

    return NextResponse.json(
      { member: refreshResolverResponse.data?.updateSession.member },
      { status: 201 },
    );
  } catch (error: any) {
    deleteCookie('member-role', {
      cookies,
    });
    return new Response(error, { status: 400 });
  }
}
