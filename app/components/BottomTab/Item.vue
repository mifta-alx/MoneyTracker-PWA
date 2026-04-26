<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue';

const props = defineProps({
  href: { type: String, required: true },
  icon: { type: Object, required: true },
});

const route = useRoute();
const isActive = computed(() => route.path === props.href);
</script>

<template>
  <NuxtLink
    :to="href"
    :class="[
      isActive
        ? 'flex-2 bg-white shadow-sm text-primary'
        : 'flex-1 text-foreground/40',
    ]"
    class="relative rounded-full h-full flex items-center justify-center gap-1.5 transition-[flex,background-color] duration-300 ease-in-out overflow-hidden"
  >
    <HugeiconsIcon
      :icon="icon"
      :size="24"
      color="currentColor"
      :stroke-width="isActive ? 2 : 1.5"
    />
    <div
      class="grid transition-[grid-template-columns,opacity] duration-300 ease-in-out"
      :class="
        isActive ? 'grid-cols-[1fr] opacity-100' : 'grid-cols-[0fr] opacity-0'
      "
    >
      <span class="text-xs font-semibold whitespace-nowrap overflow-hidden">
        <slot />
      </span>
    </div>
  </NuxtLink>
</template>
