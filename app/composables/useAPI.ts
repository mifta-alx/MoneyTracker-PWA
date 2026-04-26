import { type FetchResponse } from 'ofetch'

export const useApi = <T = any>(url: string, options: any = {}) => {
  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')
  const router = useRouter()
  const config = useRuntimeConfig();

  return $fetch<T>(url, {
    baseURL: config.public.baseUrl,
    ...options,
    headers: {
      ...(accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}),
      ...options.headers,
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        try {
          const res = await $fetch<{ access_token: string }>(`${config.public.baseUrl}/auth/refresh`, {
            method: 'POST',
            body: { refresh_token: refreshToken.value }
          })
        
          accessToken.value = res.access_token
          window.location.reload() 
        } catch (err) {
          accessToken.value = null
          refreshToken.value = null
          router.push('/login')
        }
      }
    }
  });
};