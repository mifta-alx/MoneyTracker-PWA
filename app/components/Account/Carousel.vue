<template>
  <div class="w-screen overflow-hidden">

    <div
        ref="scrollContainer"
        class="grid grid-flow-col auto-cols-[75%] overflow-x-auto snap-x snap-mandatory no-scrollbar gap-2 px-5"
        @scroll="handleScroll"
    >
      <div
          v-for="(acc, index) in accounts"
          :key="index"
          class="snap-center rounded-3xl p-6 text-white h-[180px] flex flex-col justify-between"
          :class="acc.color"
      >
        <div class="flex flex-col">
          <span class="text-sm opacity-80">{{ acc.name }}</span>
          <span class="text-2xl font-bold mt-1">{{ (acc.balance) }}</span>
        </div>
        <div class="flex justify-between items-end">
          <span class="text-xs uppercase tracking-widest opacity-60">{{ acc.type }}</span>
          <Icon name="lucide:wallet" mode="svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  accounts: Array
})

const activeIndex = ref(0)
const scrollContainer = ref(null)

const handleScroll = (event) => {
  const container = event.target
  const scrollPosition = container.scrollLeft
  const cardWidth = container.offsetWidth * 0.85 // Sesuai w-[85%]

  // Hitung index mana yang paling dekat dengan posisi scroll
  const index = Math.round(scrollPosition / (cardWidth + 16)) // 16 adalah gap-4
  if (activeIndex.value !== index) {
    activeIndex.value = index
  }
}
</script>
