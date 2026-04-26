<script setup lang="ts">
definePageMeta({
  layout: "main-layout",
});

import { useActionStore } from "~/stores/useActionStore";
import { formatNumberPrice } from "~/lib/utils";
import type { AccountData } from "~/types/accounts";
const { isVisible, toggleVisibility } = useSettings();
const loadingDelete = ref(false);
const loadingSubmit = ref(false);

const actionStore = useActionStore();
const isSheetOpen = ref(false);
const isFromSheet = ref(false);
const isSuccessDelete = ref(false);
const isDeleteConfirmationOpen = ref(false);
const accountListRef = ref();

const {
  fetchAccounts,
  saveAccount,
  updateAccount,
  fieldErrors,
  deleteAccount,
  accounts,
  totalBalance,
  loading,
} = useAccounts();
const { toastSuccess, toastError } = useToast();

const formData = ref<AccountData & { id?: string }>({
  name: "",
  type: "bank",
  balance: 0,
  color: "default",
  icon: "wallet",
});

const resetForm = () => {
  formData.value = {
    name: "",
    type: "bank",
    balance: 0,
    color: "default",
    icon: "wallet",
  };
};

const openAccountSheet = () => {
  isSheetOpen.value = true;
  resetForm();
  closeAllSwipes();
};

onMounted(() => {
  actionStore.setAction(openAccountSheet);
  fetchAccounts();
});

onUnmounted(() => {
  actionStore.resetAction();
});

const handleSaveAccount = async () => {
  loadingSubmit.value = true;
  try {
    let res;
    if (formData.value.id) {
      res = await updateAccount(formData.value, formData.value.id);
      if (res) toastSuccess("Account updated successfully");
    } else {
      res = await saveAccount(formData.value);
      if (res) toastSuccess("Account created successfully");
    }
    if (res) {
      isSheetOpen.value = false;
      await fetchAccounts();
    }
  } catch (err: any) {
    if (err.message === "Validation failed") {
      return;
    }
    toastError(err.message || "Something went wrong");
  } finally {
    loadingSubmit.value = false;
  }
};

const closeAccountSheet = () => {
  isSheetOpen.value = false;
  resetForm();
};

const closeAllSwipes = () => {
  accountListRef.value?.closeAllSwipes();
};

const handleOpenDeleteConfirmation = (
  account: AccountData,
  fromSheet = false,
) => {
  isSuccessDelete.value = false;
  isFromSheet.value = fromSheet;

  if (fromSheet) {
    isSheetOpen.value = false;
    setTimeout(() => {
      formData.value = { ...account };
      isDeleteConfirmationOpen.value = true;
    }, 300);
  } else {
    formData.value = { ...account };
    isDeleteConfirmationOpen.value = true;
  }
};

const closeDeleteConfirmation = () => {
  isDeleteConfirmationOpen.value = false;

  if (!isSuccessDelete.value && isFromSheet.value) {
    setTimeout(() => {
      isSheetOpen.value = true;
    }, 300);
  }

  setTimeout(() => {
    isFromSheet.value = false;
    isSuccessDelete.value = false;
  }, 400);
};

const handleDeleteAccount = async (id: string) => {
  const targetId = typeof id === "string" ? id : formData.value.id;

  if (!targetId) {
    toastError("Account not found");
    return;
  }

  loadingDelete.value = true;
  try {
    await deleteAccount(targetId);
    isSuccessDelete.value = true;
    isDeleteConfirmationOpen.value = false;

    await fetchAccounts();

    toastSuccess("Account deleted successfully");
    resetForm();
    toastSuccess("Account deleted successfully");
  } catch (err) {
    toastError("Failed to delete account");
  } finally {
    loadingDelete.value = false;
  }
};

const handleOpenEditAccount = (account: AccountData) => {
  const isAnySwipeOpen = accountListRef.value?.hasOpenSwipe();
  if (isAnySwipeOpen) {
    closeAllSwipes();
    return;
  }
  formData.value = { ...account };
  isSheetOpen.value = true;
};
</script>

<template>
  <div>
    <Header title="Accounts" />
    <div class="flex flex-col">
      <div class="mt-2 flex items-center flex-col">
        <button
          @click="toggleVisibility"
          class="flex flex-row gap-1 items-center justify-center"
        >
          <h6 class="tracking-tighter text-foreground/50 text-center">
            Total Balance
          </h6>
          <Icon
            :name="isVisible ? 'ri:eye-fill' : 'ri:eye-off-fill'"
            class="transition-all duration-300 text-sm text-foreground ease-in-out"
          />
        </button>
        <div class="flex flex-row gap-1 items-center justify-center">
          <h4
            v-if="isVisible"
            class="text-2xl font-medium tracking-tighter text-foreground/50"
          >
            Rp<span
              class="ms-1 text-foreground"
              :class="isVisible ? 'text-[40px]' : 'text-xl'"
              >{{ formatNumberPrice(totalBalance) }}</span
            >
          </h4>
          <h4
            v-else
            class="text-2xl font-medium tracking-tighter text-foreground/50"
          >
            ••••••••
          </h4>
        </div>
      </div>
      <h6 class="tracking-tighter text-foreground font-semibold px-4 mb-3">
        My Accounts
      </h6>
      <AccountList
        ref="accountListRef"
        :accounts="accounts"
        :loading="loading"
        :is-visible="isVisible"
        @edit="handleOpenEditAccount"
        @delete="handleOpenDeleteConfirmation($event, false)"
      />

      <AccountSheet
        :data="formData"
        :open="isSheetOpen"
        @save="handleSaveAccount"
        @close="closeAccountSheet"
        @delete="handleOpenDeleteConfirmation($event, true)"
        :fieldErrors="fieldErrors"
        :loading-delete="loadingDelete"
        :loading="loadingSubmit"
      />

      <AccountDeleteConfirmation
        :account="formData"
        :open="isDeleteConfirmationOpen"
        @close="closeDeleteConfirmation"
        @delete="handleDeleteAccount"
        :loading="loadingDelete"
      />
    </div>
  </div>
</template>
