<script setup lang="ts">
import { formatNumberPrice, unformatPriceBase } from "~/lib/utils";
import type { AccountData } from "~/types/accounts";
import { HugeiconsIcon } from "@hugeicons/vue";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

const props = defineProps<{
  data: AccountData & { id?: string };
  loading?: boolean;
  open?: boolean;
  fieldErrors?: Record<string, string>;
}>();

const emit = defineEmits(["save", "close"]);

const handleUpdate = (val: string) => {
  props.data.balance = unformatPriceBase(val);
};


</script>

<template>
  <BottomSheet :open="props.open" @close="emit('close')">
    <template #title>
      <div class="flex flex-row justify-between items-center">
        Customize Account
        <button class="text-muted-foreground/60 bg-muted-foreground/10 rounded-xl p-2" @click="emit('close')">
          <HugeiconsIcon
            :icon="Cancel01Icon"
            :size="20"
            color="currentColor"
            :strokeWidth="2"
          />
        </button>
      </div>
    </template>
    <template #description>
        Customize the account information
    </template>

    <template #content>
      <div class="space-y-4 relative pb-10">
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
          <div
            class="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-5 px-5"
          >
            <button
              v-for="type in ACCOUNT_TYPES"
              :key="type.value"
              @click="data.type = type.value"
              type="button"
              :class="[
                'px-4 snap-center shrink-0 flex flex-row gap-2 items-center justify-center py-3 rounded-xl border transition-all duration-300 ease-in-out',
                data.type === type.value
                  ? 'border-primary/70 bg-primary/10 text-primary'
                  : 'border-muted-foreground/20 bg-muted-foreground/5 text-muted-foreground/50',
              ]"
            >
              <HugeiconsIcon
                :icon="type.icon"
                :size="20"
                color="currentColor"
                :strokeWidth="1.5"
              />
              <span class="text-xs font-semibold whitespace-nowrap">
                {{ type.label }}
              </span>
            </button>
          </div>
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
        <div class="fixed bottom-0 left-0 right-0 bg-white px-5 py-2">
          <button
            @click="emit('save')"
            :disabled="loading"
            class="w-full bg-primary text-white py-4 rounded-2xl font-bold"
          >
            {{ loading ? 'Saving...' : (data.id ? 'Update Account' : 'Save Account') }}
          </button>
        </div>
      </div>
    </template>
  </BottomSheet>
</template>
