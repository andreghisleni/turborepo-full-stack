import { api } from '@/services/api';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await api.post<{
      token: string;
      refreshToken: string;
      session: {
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
            };
          }[];
        };
      };
    }>('/auth/sign-in', {
      email,
      password,
    });

    return {
      errors: null,
      data: response.data,
    };
  } catch (error: any) {
    return {
      errors: error.response.data,
    };
  }
};

export const getSession = async () => {
  try {
    const response = await api.get('/auth/session');

    return {
      user: response.data,
      errors: null,
    };
  } catch (error: any) {
    return {
      user: null,
      errors: error.response.data,
    };
  }
};

export const signOut = async () => {
  try {
    await api.post('/auth/sign-out');

    return {
      errors: null,
    };
  } catch (error: any) {
    return {
      errors: error.response.data,
    };
  }
};

export const updateToken = async ({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}) => {
  try {
    await api.post('/auth/token', {
      token,
      refreshToken,
    });

    return {
      errors: null,
    };
  } catch (error: any) {
    return {
      errors: error.response.data,
    };
  }
};

export const refreshToken = async ({ refreshToken: rt }: { refreshToken: string }) => {
  try {
    const response = await api.post('/auth/token/refresh', {
      refreshToken: rt,
    });

    return {
      token: response.data.token,
      errors: null,
    };
  } catch (error: any) {
    return {
      token: null,
      errors: error.response,
    };
  }
};
