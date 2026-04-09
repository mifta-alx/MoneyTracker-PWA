import { type FetchResponse } from 'ofetch'

export const useApi = <T = any>(url: string, options: any = {}) => {
  const token = useCookie('access_token');
  const config = useRuntimeConfig();

  return $fetch<T>(url, {
    baseURL: config.public.baseUrl,
    ...options,
    headers: {
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
      ...options.headers,
    },
    // onResponseError({ response }: { response: FetchResponse<any> }) {
    //   if (response.status === 401) {
    //     token.value = null;
    //     navigateTo('/login');
    //   }
    // }
  });
};