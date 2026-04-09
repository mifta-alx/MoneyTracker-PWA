import type { AccountData, AccountItem, AccountsResponseData } from "~/types/accounts";
import type { ApiResponse } from "~/types/api";

export const useAccounts = () => {
  const loading = ref(false);
  const error = ref(null);
  const accounts = ref<AccountItem[]>([]);
  const fieldErrors = ref<Record<string, string>>({});
  const totalBalance = ref(0);

  const fetchAccounts = async () => {
    loading.value = true;
    try {
      const res = await useApi<ApiResponse<AccountsResponseData>>('/accounts')
      accounts.value = res.data.accounts;
      totalBalance.value = res.data.total_balance;
      return res.data;
    } catch (err: any) {
      const errorResponse = err.data as ApiResponse<null>
      throw new Error(errorResponse?.message || "Terjadi kesalahan")
    } finally {
      loading.value = false;
    }
  }

  const saveAccount = async (account: AccountData) => {
    loading.value = true;
    error.value = null;
    fieldErrors.value = {};

    try {
      const res = await useApi<ApiResponse<AccountItem>>('/accounts', {
        method: 'POST',
        body: account,
      })
      return res.data;
    } catch (err: any) {
      const errorData = err.response?._data as ApiResponse<null>;
      if (errorData?.errors) {
        console.info("errorDatass", errorData);
        fieldErrors.value = errorData.errors; 
      }
      throw new Error(errorData?.message || "Failed to save account!, please try again later.");
    } finally {
      loading.value = false;
    }
  }

  const updateAccount = async (account: AccountData, id: string) => {
    loading.value = true;
    error.value = null;
    fieldErrors.value = {};

    try {
      const res = await useApi<ApiResponse<AccountItem>>(`/accounts/${id}`, {
        method: 'PUT',
        body: account,
      })
      return res.data;
    } catch (err: any) {
      const errorData = err.response?._data as ApiResponse<null>;
      if (errorData?.errors) {
        console.info("errorDatass", errorData);
        fieldErrors.value = errorData.errors; 
      }
      throw new Error(errorData?.message || "Failed to update account!, please try again later.");
    } finally {
      loading.value = false;
    }
  }

  const deleteAccount = async (id: string) => {
    loading.value = true;
    error.value = null;
    fieldErrors.value = {};

    try {
      const res = await useApi<ApiResponse<null>>(`/accounts/${id}`, {
        method: 'DELETE',
      })
      return res.data;
    } catch (err: any) {
      const errorData = err.response?._data as ApiResponse<null>;
      throw new Error(errorData?.message || "Failed to delete account!, please try again later.");
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    accounts,
    totalBalance,
    fetchAccounts,
    fieldErrors,
    saveAccount,
    deleteAccount,
    updateAccount,
  }
}
