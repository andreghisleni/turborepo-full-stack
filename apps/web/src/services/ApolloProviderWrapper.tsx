'use client';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { env } from '@/env';
import { getCookie } from 'cookies-next';
import { PropsWithChildren } from 'react';

export const httpLink = createHttpLink({
  uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
  fetch,
});

const authMiddleware = setContext(async (operation, { headers }) => {
  // const { token } = await fetch('/api/auth/token').then(res => res.json())

  const token = getCookie('token');

  // console.log("token", token);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``,
    },
  };
});

export const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
