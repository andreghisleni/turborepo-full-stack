import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { deleteCookie } from 'cookies-next';

export async function GET(_request: NextRequest) {
  // const req = await request.json();

  try {
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

    return NextResponse.redirect(new URL('/auth/sign-in', _request.nextUrl.href));
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}
