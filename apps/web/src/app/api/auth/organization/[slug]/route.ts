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
        organization {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;

const roteProps = z.object({
  params: z.object({
    slug: z.string(),
  }),
});

type RoteProps = z.infer<typeof roteProps>;

export async function GET(request: NextRequest, props: RoteProps) {
  try {
    const {
      params: { slug },
    } = roteProps.parse(props);

    const refreshResolverResponse = await client.mutate<{
      updateSession: {
        member: {
          id: string;
          role: string;
          organization: {
            id: string;
            name: string;
            avatarUrl: string;
          };
        };
      };
    }>({
      mutation: VALIDATE_ORGANIZATION,
      variables: { slug },
    });

    setCookie(
      'member-role',
      JSON.stringify({ ...refreshResolverResponse.data?.updateSession.member, slug }),
      {
        cookies,
      },
    );

    setCookie(
      'organization',
      JSON.stringify(refreshResolverResponse.data?.updateSession.member.organization),
      {
        cookies,
      },
    );

    return NextResponse.redirect(new URL(`/app/${slug}`, request.url));
  } catch (error: any) {
    deleteCookie('member-role', {
      cookies,
    });
    deleteCookie('organization', {
      cookies,
    });

    return new Response(error, { status: 400 });
  }
}
