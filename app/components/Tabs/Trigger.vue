<script setup lang="ts">
const props = defineProps<{ value: string }>();
const activeTab = inject<Ref<string>>("activeTab");
const setActiveTab = inject<(v: string) => void>("setActiveTab");

const isActive = computed(() => activeTab?.value === props.value);
</script>

<template>
  <button
    type="button"
    :data-value="value"
    @click="setActiveTab?.(value)"
    class="flex-1 py-3 text-sm font-semibold tracking-tight rounded-full transition-colors duration-300 relative z-10 outline-none"
    :class="[isActive ? 'text-foreground' : 'text-muted-foreground/50']"
  >
    <slot />
  </button>
</template>