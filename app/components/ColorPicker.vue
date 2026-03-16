<script setup lang="ts">
const modelValue = defineModel<string>({ default: "bg-foreground" });

const colorOptions = [
  { name: "Default", value: "bg-foreground", bgClass: "bg-foreground" },
  { name: "Gray", value: "bg-gray", bgClass: "bg-gray" },
  { name: "Brown", value: "bg-brown", bgClass: "bg-brown" },
  { name: "Orange", value: "bg-orange", bgClass: "bg-orange" },
  { name: "Yellow", value: "bg-yellow", bgClass: "bg-yellow" },
  { name: "Green", value: "bg-green", bgClass: "bg-green" },
  { name: "Blue", value: "bg-blue", bgClass: "bg-blue" },
  { name: "Purple", value: "bg-purple", bgClass: "bg-purple" },
  { name: "Pink", value: "bg-pink", bgClass: "bg-pink" },
  { name: "Red", value: "bg-red-500", bgClass: "bg-red-500" },
];
</script>

<template>
  <div class="grid grid-cols-10 gap-2">
    <label
      v-for="color in colorOptions"
      :key="color.name"
      class="relative flex items-center justify-center cursor-pointer group"
    >
      <input
        type="radio"
        name="color-picker"
        :value="color.value"
        v-model="modelValue"
        class="sr-only"
      />

      <div
        class="size-8 rounded-full border transition-all duration-300 shrink-0"
        :class="[
          color.bgClass,
          modelValue === color.value
            ? 'scale-110 border-white ring-2 ring-muted-foreground/20'
            : 'border-transparent opacity-80',
        ]"
      ></div>

      <Icon
        v-if="modelValue === color.value"
        name="lucide:check"
        class="absolute text-white text-sm"
        mode="svg"
        stroke-width="4"
      />
    </label>
  </div>
</template>
