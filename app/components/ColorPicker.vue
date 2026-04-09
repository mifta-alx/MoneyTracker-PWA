<script setup lang="ts">
const modelValue = defineModel<string>({ default: "default" });
</script>

<template>
  <div class="grid grid-cols-10 gap-2">
    <label
      v-for="color in COLOR_OPTIONS"
      :key="color.name"
      class="relative flex items-center justify-center cursor-pointer group"
    >
      <input
        type="radio"
        name="color-picker"
        :value="color.name"
        v-model="modelValue"
        class="sr-only"
      />

      <div
        class="size-8 rounded-full border transition-all duration-300 shrink-0"
        :class="[
          color.value,
          modelValue === color.name
            ? 'scale-110 border-white ring-2 ring-muted-foreground/20'
            : 'border-transparent opacity-80',
        ]"
      />

      <Icon
        v-if="modelValue === color.name"
        name="lucide:check"
        class="absolute text-white text-sm"
        mode="svg"
        stroke-width="4"
      />
    </label>
  </div>
</template>
