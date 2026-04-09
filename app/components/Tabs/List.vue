<script setup lang="ts">
const props = defineProps<{
  options: string[];
}>();

const activeTab = inject("activeTab") as ComputedRef<string>;
const setActiveTab = inject<(v: string) => void>("setActiveTab");

const activeIndex = computed(() => {
  const current = activeTab?.value ?? props.options[0];
  return props.options.indexOf(current);
});

const pillWidth = computed(() => 100 / props.options.length);

</script>

<template>
  <div
    class="relative flex p-1 bg-muted-foreground/10 rounded-full w-full isolate"
  >
    <button
      v-for="option in options"
      :key="option"
      type="button"
      @click="setActiveTab?.(option)"
      class="flex-1 py-3 text-sm font-semibold tracking-tight rounded-full transition-colors duration-300 relative z-10 outline-none capitalize"
      :class="[
        activeTab === option ? 'text-foreground' : 'text-muted-foreground/50',
      ]"
    >
      {{ option }}
    </button>

    <div
      class="absolute inset-y-1 left-1 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out -z-10"
      :style="{
        width: `calc(${pillWidth}% - 8px)`,
        transform: `translateX(${activeIndex * 104}%)`,
      }"
    />
  </div>
</template>
