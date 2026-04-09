<script setup lang="ts">
definePageMeta({
  layout: "main-layout",
});
</script>

<template>
  <div>
    <div class="flex flex-col">
      <h4 class="text-2xl tracking-tighter">Good morning,</h4>
      <h4 class="text-3xl tracking-tighter font-semibold">Steve Harrington!</h4>
      <h6 class="mt-5 tracking-tighter text-foreground/50">Total Balance</h6>
      <div class="flex flex-row gap-3 items-center">
        <h4 class="text-2xl font-medium tracking-tighter text-foreground/50">
          Rp<span class="ms-1 text-[40px] text-foreground">186.750.000</span>
        </h4>
        <Icon name="ri:eye-fill" class="text-xl" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
