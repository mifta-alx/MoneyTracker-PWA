export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')
  const publicRoutes = ['/login']

  if (to.path === '/login' && (accessToken.value || refreshToken.value)) {
    return navigateTo('/')
  }


  if (!accessToken.value && !refreshToken.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }
})