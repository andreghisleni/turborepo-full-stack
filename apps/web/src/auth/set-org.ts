import { api } from '@/services/api';
import { getCookie } from 'cookies-next';

import { cookies } from 'next/headers';

export async function setOrganizationSlug(slug: string) {
  const token = getCookie('token', {
    cookies,
  });

  return api.post('/auth/organization', { slug, token });
}
