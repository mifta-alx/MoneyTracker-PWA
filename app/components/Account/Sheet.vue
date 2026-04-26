<script setup lang="ts">
import { formatNumberPrice, unformatPriceBase } from "~/lib/utils";
import type { AccountData } from "~/types/accounts";
import { HugeiconsIcon } from "@hugeicons/vue";
import { Delete02Icon } from "@hugeicons/core-free-icons";

const props = defineProps<{
  data: AccountData & { id?: string };
  loading?: boolean;
  loadingDelete?: boolean;
  open?: boolean;
  fieldErrors?: Record<string, string>;
}>();

const emit = defineEmits(["save", "close", "delete"]);

const handleUpdate = (val: string) => {
  props.data.balance = unformatPriceBase(val);
};
</script>

<template>
  <BottomSheet :open="props.open" :showClose="true" @close="emit('close')">
    <template #title>
      {{ data?.id ? "Customize Account" : "Create Account" }}
    </template>
    <template #description>
      {{
        data?.id ? "Customize the account information" : "Setup a new account"
      }}
    </template>

    <template #content>
      <div class="space-y-4 relative pb-10">
        <div
          class="bg-white rounded-3xl w-full p-4 flex flex-row justify-between gap-4 border border-muted-foreground/20"
        >
          <div class="flex gap-3 items-center w-full justify-between">
            <div class="flex gap-3 items-center">
              <div
                class="flex size-10 rounded-xl items-center justify-center text-xl"
                :class="[
                  BG_COLOR[data.color] || BG_COLOR.default,
                  TEXT_COLOR[data.color] || TEXT_COLOR.default,
                ]"
              >
                <HugeiconsIcon
                  :icon="
                    ICON_OPTIONS.find((item) => item.name === data.icon)?.icon
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
                  {{ data.name || "New account" }}
                </p>
                <p class="text-[11px] text-foreground/70 tracking-wide">
                  {{ ACCOUNT_TYPES[data.type] || "Account type" }}
                </p>
              </div>
            </div>

            <button
              v-if="data.id"
              @click="emit('delete', data)"
              variant="danger"
              class="text-red px-2 active:scale-[0.97] transition-all duration-300 ease-in-out"
            >
              <HugeiconsIcon
                :icon="Delete02Icon"
                :size="24"
                color="currentColor"
                :strokeWidth="1.5"
              />
            </button>
          </div>
        </div>
        <TextInput
          id="name"
          name="name"
          type="text"
          label="Account Name"
          placeholder="e.g. My Pocket"
          v-model="data.name"
          :error="fieldErrors?.name"
        />

        <div class="flex flex-col gap-3">
          <Label>Account Type</Label>
          <AccountTypePicker v-model="data.type" />
        </div>
        <TextInput
          id="balance"
          name="balance"
          label="Starting Balance"
          inputmode="numeric"
          placeholder="0"
          left-icon="Rp"
          maxlength="20"
          :model-value="formatNumberPrice(data.balance)"
          @update:model-value="handleUpdate"
          :error="fieldErrors?.balance"
        />
        <div class="flex gap-2 flex-col">
          <Label>Color</Label>
          <ColorPicker v-model="data.color" />
        </div>
        <div class="flex gap-2 flex-col">
          <Label>Icon</Label>
          <IconPicker v-model="data.icon" />
        </div>
        <div
          class="fixed bottom-0 left-0 right-0 bg-white px-5 py-2 flex gap-2 flex-col"
        >
          <Button @click="emit('save')" :loading="loading">
            {{ data.id ? "Apply Changes" : "Create Account" }}
          </Button>
        </div>
      </div>
    </template>
  </BottomSheet>
</template>
