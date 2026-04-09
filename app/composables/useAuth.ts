export const useAuth = () => {
  const loading = ref(false);
  const error = ref(null);
  const fieldErrors = ref<Record<string, string>>({});
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl;

  const login = async (email: string, password: string, rememberMe: boolean) => {
    const token = useCookie('access_token', {
      watch: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined
    });

    const refreshToken = useCookie('refresh_token', {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    loading.value = true;
    error.value = null;
    fieldErrors.value = {};

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          fieldErrors.value = data.errors;
          throw new Error(data.message);
        }
        throw new Error(data.message || 'Login failed, please try again later!');
      }

      token.value = data.data.accessToken;
      refreshToken.value = data.data.refreshToken;

      return data
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  };

  const register = async (email: string, name: string, password: string, confirmPassword: string) => {
    loading.value = true;
    error.value = null;
    fieldErrors.value = {};

    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          password,
          confirm_password: confirmPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          fieldErrors.value = data.errors;
          throw new Error(data.message);
        }
        throw new Error(data.message || 'Something went wrong!');
      }

      return data
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  };

  const loginWithGoogle = async () => {
    loading.value = true;
    // try {
    //   const { error } = await client.auth.signInWithOAuth({
    //     provider: 'google',
    //     options: {
    //       redirectTo: window.location.origin,
    //       queryParams: {
    //         access_type: 'offline',
    //         prompt: 'select_account',
    //       }
    //     },
    //   });
    //   if (error) throw error;
    // } catch (err: any) {
    //   alert(err.message);
    // } finally {
    //   loading.value = false;
    // }
  };

  const logout = () => {
    const token = useCookie('auth_token');
    token.value = null;
    return navigateTo("/login");
  };

  return { loading, login, register, loginWithGoogle, logout, fieldErrors };
};