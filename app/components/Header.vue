<script setup lang="ts">
  const props = defineProps({
    title:String
  })
</script>

<template>
  <div class="sticky top-0 left-0 right-0 flex flex-row justify-center items-center gap-4 py-5">
    <h4 class="text-xl tracking-tighter font-semibold text-center">{{ props.title }}</h4>
  </div>
</template>