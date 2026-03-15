<script setup lang="ts">
import { formatNumberPrice, unformatPriceBase } from "~/lib/utils";
import type { AccountData } from "~/types/accounts";

const props = defineProps<{
  data: AccountData;
  loading?: boolean;
}>();

const emit = defineEmits(["save"]);

const handleUpdate = (val: string) => {
  props.data.balance = unformatPriceBase(val);
};
</script>

<template>
  <BottomSheet>
    <template #trigger>
      <button
        class="w-14 h-14 bg-emerald-500 text-white rounded-full shadow-xl flex items-center justify-center active:scale-90 transition-transform"
      >
        <Icon name="lucide:plus" class="text-3xl" mode="svg" stroke-width="3" />
      </button>
    </template>

    <template #title>Customize Account</template>

    <template #content>
      <div class="space-y-4 relative pb-10">
        <TextInput
          label="Account Name"
          placeholder="e.g. Mandiri Utama"
          v-model="data.name"
        />
        <TextInput
          label="Starting Balance"
          inputmode="numeric"
          placeholder="0"
          left-icon="Rp"
          maxlength="20"
          :model-value="formatNumberPrice(data.balance)"
          @update:model-value="handleUpdate"
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
            Simpan Transaksi
          </button>
        </div>
      </div>
    </template>
  </BottomSheet>
</template>
