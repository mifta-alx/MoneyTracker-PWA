<script lang="ts" setup>
import type { AccountItem } from "~/types/accounts";

const props = defineProps<{
  accounts: AccountItem[];
  loading?: boolean;
  isVisible: boolean;
}>();

const emit = defineEmits(["delete", "edit"]);
const accountItemRefs = ref<any[]>([]);

const closeAllSwipes = () => {
  accountItemRefs.value.forEach((item) => {
    if (item?.closeSwipe) item.closeSwipe();
  });
};

const hasOpenSwipe = () => {
  return accountItemRefs.value
    .filter(Boolean)
    .some((item) => item.isOpened === true);
};

defineExpose({ closeAllSwipes, hasOpenSwipe });
</script>
<template>
  <div class="pb-25">
    <div v-if="loading" class="flex flex-col gap-2 overflow-y-auto h-full">
      <div
        v-for="i in 10"
        :key="i"
        class="rounded-xl w-full h-18 animate-pulse bg-muted-foreground/10"
      />
    </div>
    <div
      v-else
      class="flex flex-col gap-2 overflow-y-auto h-full -mx-5"
      @scroll="closeAllSwipes"
    >
      <template v-for="(account, index) in accounts" :key="account.id">
        <AccountItem
          :account="account"
          :hide="!isVisible"
          @edit="emit('edit', account)"
          @delete="emit('delete', account)"
          @swipe-start="closeAllSwipes"
          :ref="(el) => (accountItemRefs[index] = el)"
        />
      </template>
    </div>
  </div>
</template>
