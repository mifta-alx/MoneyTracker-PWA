<script lang="ts" setup>
const modelValue = defineModel<string>();
</script>

<template>
  <div
    class="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-5 px-5"
  >
    <button
      v-for="(label, key) in ACCOUNT_TYPES"
      :key="key"
      @click="modelValue = key as string"
      type="button"
      :class="[
        'px-4 snap-center shrink-0 flex flex-row gap-2 items-center justify-center py-2 rounded-full border transition-all duration-300 ease-in-out',
        modelValue === key
          ? 'border-primary/70 bg-primary/10 text-primary'
          : 'border-muted-foreground/20 bg-muted-foreground/5 text-muted-foreground/50',
      ]"
    >
      <span class="text-xs font-semibold whitespace-nowrap">
        {{ label }}
      </span>
    </button>
  </div>
</template>
