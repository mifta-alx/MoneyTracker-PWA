<script setup lang="ts">
import type { AccountData } from "~/types/accounts";

definePageMeta({
  layout: "main-layout",
});

const accountForm = reactive<AccountData>({
  name: "",
  balance: 0,
  color: "bg-foreground",
  icon: "wallet",
});
</script>

<template>
  <div>
    <Header title="Accounts" />
    <div class="flex flex-col gap-4">
      <div class="mt-4">
        <h6 class="tracking-tighter text-foreground/50 text-center">
          Total Balance
        </h6>
        <div class="flex flex-row gap-3 items-center justify-center">
          <h4 class="text-2xl font-medium tracking-tighter text-foreground/50">
            Rp<span class="ms-1 text-[40px] text-foreground">186.750.000</span>
          </h4>
          <Icon name="ri:eye-fill" class="text-xl" />
        </div>
      </div>
      <h7 class="tracking-tighter text-foreground font-semibold"
        >My Accounts</h7
      >
      <div class="bg-white rounded-2xl w-full p-4 flex flex-col gap-4">
        <div class="flex justify-between gap-4 flex-row">
          <div class="flex gap-3 items-center">
            <div
              class="flex size-8 rounded-lg bg-primary/20 text-primary items-center justify-center text-xl"
            >
              <Icon name="hugeicons:money-03" />
            </div>
            <p
              class="text-foreground tracking-tight font-semibold text-xl line-clamp-1"
            >
              BCA
            </p>
          </div>
          <p class="text-[10px] text-foreground/70 tracking-wide">
            BANK ACCOUNT
          </p>
        </div>
        <div>
          <p class="text-sm tracking-tight text-foreground/70 font-medium">
            Balance
          </p>
          <p class="text-2xl tracking-tight text-foreground font-bold">
            Rp. 1.899.099
          </p>
        </div>
      </div>
      <AccountsSheet :data="accountForm" />
    </div>
  </div>
</template>
