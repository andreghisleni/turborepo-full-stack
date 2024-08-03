import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { hasCookie, setCookie } from 'cookies-next';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  const hasToken = hasCookie('token', { cookies });

  if (!hasToken) {
    return new Response('Unauthorized', { status: 401 });
  }

  const req = await request.json();

  try {
    const { token, refreshToken } = z
      .object({
        token: z.string(),
        refreshToken: z.string(),
      })
      .parse(req);

    setCookie('token', token, {
      cookies,
    });

    setCookie('refreshToken', refreshToken, {
      cookies,
    });
    return NextResponse.json({}, { status: 201 });
  } catch (error: any) {
    return new Response(error, { status: 400 });
  }
}
