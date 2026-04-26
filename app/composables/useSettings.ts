export const useSettings = () => {
  const isVisible = useCookie<boolean>('balance_visibility', {
    default: () => false,
    watch: true,
    maxAge: 60 * 60 * 24 * 30 
  })

  const toggleVisibility = () => {
    isVisible.value = !isVisible.value
  }

  return {
    isVisible,
    toggleVisibility
  }
}