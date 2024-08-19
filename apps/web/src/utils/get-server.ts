import { getCookie } from 'cookies-next';

import { cookies } from 'next/headers';

export type UserServer = {
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

export function getUserServer() {
  const user = getCookie('user', { cookies });

  if (!user) {
    return undefined;
  }
  try {
    const session = JSON.parse(user) as UserServer;

    return session;
  } catch (error) {
    return undefined;
  }
}

export type OrganizationServer = {
  id: string;
  name: string;
  slug: string;
  avatarUrl: string;
};

export function getOrganizationServer() {
  const organization = getCookie('organization', { cookies });

  if (!organization) {
    return undefined;
  }
  try {
    const session = JSON.parse(organization) as OrganizationServer;

    return session;
  } catch (error) {
    return undefined;
  }
}
