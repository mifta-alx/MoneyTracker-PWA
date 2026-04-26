<script lang="ts" setup>
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/vue";
import { formatPrice } from "~/lib/utils";
import type { AccountData } from "~/types/accounts";

const props = defineProps<{
  loading?: boolean;
  open?: boolean;
  account: AccountData & { id?: string };
}>();

const emit = defineEmits(["close", "delete"]);
</script>

<template>
  <BottomSheet :open="props.open" @close="emit('close')" class="z-70">
    <template #content>
      <div class="flex flex-col justify-center items-center">
        <div
          class="size-14 bg-red/20 rounded-2xl text-red-500 flex items-center justify-center"
        >
          <HugeiconsIcon :icon="Delete02Icon" :size="28" color="currentColor" />
        </div>
        <h2 class="text-2xl font-bold tracking-tight mt-3.5">
          Remove Account?
        </h2>
        <p class="text-center text-sm text-foreground/50 mt-1.5">
          Remove
          <span class="font-semibold text-foreground">{{
            account.name ?? "Unknown Account"
          }}</span>
          ({{ ACCOUNT_TYPES[account.type] ?? "Unknown Account Type" }}) from
          account?<br />All transactions linked to this account will also be
          removed.
        </p>
        <div
          class="mt-4.5 bg-white rounded-3xl w-full p-4 flex flex-row justify-between items-center gap-4 border border-muted-foreground/20"
        >
          <div class="flex gap-3 items-center">
            <div
              class="flex size-10 rounded-xl items-center justify-center text-xl"
              :class="[
                BG_COLOR[account.color] || BG_COLOR.default,
                TEXT_COLOR[account.color] || TEXT_COLOR.default,
              ]"
            >
              <HugeiconsIcon
                :icon="
                  ICON_OPTIONS.find((item) => item.name === account.icon)?.icon
                "
                :size="20"
                color="currentColor"
                :strokeWidth="1.5"
              />
            </div>
            <div class="text-start">
              <p
                class="text-foreground tracking-tight font-semibold text-base line-clamp-1"
              >
                {{ account.name || "New account" }}
              </p>
              <p class="text-[11px] text-foreground/70 tracking-wide">
                {{ formatPrice(account.balance || 0) }}
              </p>
            </div>
          </div>
          <div
            class="bg-red/20 rounded-full py-1 px-3 text-xs h-fit text-red font-semibold tracking-tight"
          >
            <span>To remove</span>
          </div>
        </div>
        <div class="flex flex-col gap-2 mt-4.5 w-full">
          <Button
            variant="danger"
            @click="emit('delete', account.id)"
            :loading="loading"
            >Yes, Remove account</Button
          >
          <Button
            @click="emit('close')"
            variant="secondary"
            :loading="loading"
          >
            Cancel
          </Button>
        </div>
      </div>
    </template>
  </BottomSheet>
</template>
