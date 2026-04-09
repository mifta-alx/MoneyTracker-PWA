<script setup lang="ts">
defineProps<{ value: string }>();
</script>

<template>
  <div class="w-full shrink-0">
    <slot />
  </div>
</template>