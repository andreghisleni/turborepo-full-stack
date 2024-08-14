import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { env } from '@/env';
// import { getItem, setItem } from "@/utils/localstorage";
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const httpLink = createHttpLink({
  uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
  fetch,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  try {
    const token = getCookie('token', {
      cookies,
    });

    // console.log("token", token);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    return {
      headers: {
        ...headers,
        authorization: '',
      },
    };
  }

  // return the headers to the context so httpLink can read them
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});

export const clientWithOutAuth = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});

// const refreshToken = async () => {
//   try {

//     return token;
//   } catch (err) {
//     throw err;
//   }

//   throw new Error("Not implemented");
// };
