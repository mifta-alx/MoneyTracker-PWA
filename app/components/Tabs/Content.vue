<script setup lang="ts">
const props = defineProps<{
  options: string[];
}>();

const activeTab = inject("activeTab") as ComputedRef<string>;

const activeIndex = computed(() => {
  const current = activeTab?.value ?? props.options[0];
  return props.options.indexOf(current);
});
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${(activeIndex || 0) * 100}%)` }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
:deep(> *) {
  width: 100%;
  flex-shrink: 0;
}
</style>
