<script setup lang="ts">
const toastStore = useToastStore();
const { show, message, type } = storeToRefs(toastStore);
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <main class="px-5 flex-1">
      <ToastIsland
        :show="show"
        :message="message"
        :type="type"
        @close="show = false"
      />
      <slot />
    </main>
    <BottomTabNav />
  </div>
</template>
