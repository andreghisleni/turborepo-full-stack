'use client';

import { refreshToken } from '@/auth';
import { GetMyProfileQuery, useGetMyProfileQuery } from '@/generated/graphql';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

interface AuthContextData {
  user?: GetMyProfileQuery['profile']; // eslint-disable-line
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const { addToast, removeToast } = useToast();
  const router = useRouter();

  // const [data, setData] = useState<AuthState | null>(null);
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);

  const { data: da, refetch } = useGetMyProfileQuery({
    fetchPolicy: 'network-only',
  });

  // const getData = useCallback(async () => {
  //   const d = await getSession();

  //   console.log("data", d); // eslint-disable-line

  //   setData({
  //     user: d.user,
  //   });
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  const verifyTokenTime = useCallback(async () => {
    const token = getCookie('token');

    if (!token) {
      return;
    }
    const jwtPayload = JSON.parse(window.atob(token.split('.')[1]));

    // if token is less than 8 minutes, refresh token
    if (jwtPayload.exp - Date.now() / 1000 < 60 * 8 && !isRefreshingToken) {
      setIsRefreshingToken(true);

      const rt = getCookie('refreshToken');

      if (!rt) {
        console.log("refresh token not found"); // eslint-disable-line
        return;
      }

      await refreshToken({
        refreshToken: rt,
      });

      console.log("refresh token"); // eslint-disable-line

      setIsRefreshingToken(false);
      refetch();
    }
  }, [isRefreshingToken, refetch]);

  useEffect(() => {
    // refresh token if time is less than 10 minutes
    verifyTokenTime();

    const interval = setInterval(
      () => {
        verifyTokenTime();
      },
      1000 * 60 * 1,
    ); // 1 minute

    return () => {
      clearInterval(interval);
    };
  }, [verifyTokenTime]);

  function signOut() {
    deleteCookie('token');
    deleteCookie('refreshToken');
    deleteCookie('user');
    deleteCookie('user-role');

    router.push('/api/auth/sign-out');
  }

  return (
    <AuthContext.Provider
      value={{
        user: da?.profile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
