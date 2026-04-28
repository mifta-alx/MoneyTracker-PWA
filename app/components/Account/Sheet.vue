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

const emit = defineEmits(["save", "close", "delete", "request-appearance"]);

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
      <div class="space-y-4 relative pb-12">
        <div
          @click="emit('request-appearance')"
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
            <p class="font-medium tracking-tight text-sm text-primary">
              Change icon
            </p>
          </div>
        </div>
        <TextInput
          id="name"
          name="name"
          type="text"
          label="Account Name"
          placeholder="e.g. BCA, DANA, Gopay"
          v-model="data.name"
          :error="fieldErrors?.name"
        />
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
        >
          <template #left>
            <p class="font-medium">Rp</p>
          </template>
        </TextInput>
        <div class="flex flex-col gap-3">
          <Label>Type</Label>
          <UiTypePicker
            v-model="data.type"
            :options="ACCOUNT_TYPES || []"
          />
        </div>
        <div
          class="flex items-center justify-between p-4 bg-muted/5 rounded-3xl border border-muted-foreground/10"
        >
          <div class="flex flex-col gap-0.5">
            <p class="text-sm font-semibold text-foreground">
              Exclude from Total
            </p>
            <p class="text-[11px] text-muted-foreground leading-tight pr-4">
              This account and its transactions will be excluded from your total balance and spending statistics.
            </p>
          </div>

          <UiSwitch v-model="data.is_excluded" />
        </div>
        <div
          class="fixed bottom-0 flex flex-row left-0 right-0 bg-white px-5 py-3 gap-2"
        >
          <UiButton @click="emit('save')" :loading="loading">
            {{ data.id ? "Apply changes" : "Create account" }}
          </UiButton>
          <UiButton
            v-if="data.id"
            @click="emit('delete', data)"
            variant="secondary"
            class="w-14 grow-0 text-primary"
            ><HugeiconsIcon
              :icon="Delete02Icon"
              :size="20"
              color="currentColor"
              :strokeWidth="1.8"
          /></UiButton>
        </div>
      </div>
    </template>
  </BottomSheet>
</template>
