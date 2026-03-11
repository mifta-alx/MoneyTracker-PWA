<script setup lang="ts">
const props = defineProps({
  href: { type: String, required: true },
  icon: { type: String, default: "home" },
});

const route = useRoute();
const isActive = computed(() => route.path === props.href);
</script>

<template>
  <NuxtLink
      :to="href"
      :class="[
      isActive
        ? 'flex-2 bg-white shadow-sm text-foreground'
        : 'flex-1 text-foreground/40'
    ]"
      class="relative rounded-full h-full flex items-center justify-center gap-1.5 transition-[flex,background-color] duration-300 ease-in-out overflow-hidden"
  >
    <Icon :name="`hugeicons:${icon}`" class="text-2xl shrink-0" />

    <div
        class="grid transition-[grid-template-columns,opacity] duration-300 ease-in-out"
        :class="isActive ? 'grid-cols-[1fr] opacity-100' : 'grid-cols-[0fr] opacity-0'"
    >
      <span class="text-xs font-bold whitespace-nowrap overflow-hidden">
        <slot />
      </span>
    </div>
  </NuxtLink>
</template>
