<script setup lang="ts">
definePageMeta({
  layout: "main-layout",
});

import { useActionStore } from "~/stores/useActionStore";
import { formatNumberPrice } from "~/lib/utils";
import type { AccountData } from "~/types/accounts";
const isVisible = ref(false);

const actionStore = useActionStore();
const isSheetOpen = ref(false);
const accountStore = useAccounts();
const { fetchAccounts, saveAccount, updateAccount,fieldErrors, deleteAccount, accounts, totalBalance, loading } = accountStore;

const openAccountSheet = () => {
  isSheetOpen.value = true;
};

onMounted(() => {
  actionStore.setAction(openAccountSheet);
  fetchAccounts();
});

onUnmounted(() => {
  actionStore.resetAction();
});

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

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

const handleSaveAccount = async () => {
  try {
    let res;
    if (formData.value.id) {
      res = await updateAccount(formData.value, formData.value.id);
    } else {
      res = await saveAccount(formData.value);
    }
    if (res) {
      isSheetOpen.value = false;
      fetchAccounts();
    }
  } catch (err: any) {
    if (err.message === "Validation failed") {
      return;
    }
    alert("Save account gagal: " + err.message);
  }
};

const closeAccountSheet = () => {
  isSheetOpen.value = false;
  resetForm();
};

const accountItemRefs = ref<any[]>([]);

const closeAllSwipes = () => {
  accountItemRefs.value.forEach((item) => {
    if (item?.closeSwipe) item.closeSwipe();
  });
};

const handleDeleteAccount = async (id: string) => {
  if (confirm("Are you sure you want to delete this account?")) {
    try {
      await deleteAccount(id);
      fetchAccounts();
    } catch (err) {
      alert("Failed to delete");
    }
  }
};

const handleOpenEditAccount = (account: AccountData) => {
  formData.value = { ...account };
  openAccountSheet();
};
</script>

<template>
  <div>
    <Header title="Accounts" />
    <div class="flex flex-col gap-4">
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
      <h6 class="tracking-tighter text-foreground font-semibold">
        My Accounts
      </h6>
      <div
        class="flex flex-col gap-4 overflow-y-auto h-full -mx-5"
        @scroll="closeAllSwipes"
      >
        <template v-for="(account, index) in accounts" :key="account.id">
          <AccountsItem
            :account="account"
            @edit="handleOpenEditAccount"
            :hide="!isVisible"
            @delete="handleDeleteAccount(account.id)"
            :ref="(el) => (accountItemRefs[index] = el)"
            @swipe-start="closeAllSwipes"
          />
        </template>
      </div>

      <AccountsSheet
        :data="formData"
        :open="isSheetOpen"
        @save="handleSaveAccount"
        @close="closeAccountSheet"
        :fieldErrors="fieldErrors"
      />
    </div>
  </div>
</template>
