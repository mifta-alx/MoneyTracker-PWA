<script setup lang="ts">
const props = defineProps<{ 
  modelValue: string 
}>();
const emit = defineEmits(['update:modelValue']);

provide("activeTab", computed(() => props.modelValue));
provide("setActiveTab", (val: string) => emit('update:modelValue', val));
</script>

<template>
  <div class="w-full">
    <slot />
  </div>
</template>