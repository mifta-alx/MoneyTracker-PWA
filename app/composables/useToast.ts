export const useToast = () => {
  const toastStore = useToastStore();
  
  return {
    toastSuccess: toastStore.success,
    toastError: toastStore.error,
  };
};