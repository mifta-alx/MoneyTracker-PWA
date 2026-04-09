<script setup lang="ts">
import { HugeiconsIcon } from "@hugeicons/vue";
const modelValue = defineModel<string>({ default: "wallet" });

</script>

<template>
  <div class="grid grid-cols-6 gap-2">
    <label
      v-for="icon in ICON_OPTIONS"
      :key="icon.name"
      class="relative flex items-center justify-center cursor-pointer group"
    >
      <input
        type="radio"
        name="icon-picker"
        :value="icon.value"
        v-model="modelValue"
        class="sr-only"
      />

      <div
        class="size-14 shrink-0 flex text-xl items-center justify-center rounded-xl border duration-300 ease-in-out transition-all"
        :class="[
          modelValue === icon.value
            ? 'border-primary/70 bg-primary/10 text-primary'
            : 'border-muted-foreground/20 bg-muted-foreground/5 text-muted-foreground/50',
        ]"
      >
        <HugeiconsIcon
          :icon="icon.icon"
          :size="20"
          color="currentColor"
          :strokeWidth="1.5"
        />
      </div>
    </label>
  </div>
</template>
