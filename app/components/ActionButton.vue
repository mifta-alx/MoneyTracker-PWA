<script setup lang="ts">
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
      <Icon name="hugeicons:plus-sign" stroke-width="1.5" />
    </button>
  </div>
</template>
