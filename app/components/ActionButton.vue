<script setup lang="ts">
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/vue";
import { useActionStore } from "~/stores/useActionStore";

const store = useActionStore();

const handleClick = () => {
  if (store.actionFunction) {
    store.actionFunction();
  } else {
    return;
  }
};
</script>

<template>
  <div>
    <button
      @click="handleClick"
      class="flex flex-col items-center justify-center text-3xl text-white bg-primary rounded-full size-16 shrink-0 shadow-lg shadow-primary/30"
    >
      <HugeiconsIcon
        :icon="PlusSignIcon"
        :size="24"
        color="currentColor"
        :strokeWidth="2"
      />
    </button>
  </div>
</template>
