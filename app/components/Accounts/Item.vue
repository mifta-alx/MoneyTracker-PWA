<script setup lang="ts">
import { formatPrice } from "~/lib/utils";
import type { AccountItem } from "~/types/accounts";
import { HugeiconsIcon } from "@hugeicons/vue";
import { usePointerSwipe } from "@vueuse/core";
import { Delete02Icon } from "@hugeicons/core-free-icons";

const props = defineProps<{
  account: AccountItem;
  hide?: boolean;
}>();
const emit = defineEmits(["delete", "swipe-start", "edit"]);

const target = ref<HTMLElement | null>(null);
const deleteBtnWidth = 60;
const isOpen = ref(false);
const close = () => {
  isOpen.value = false;
};
defineExpose({ closeSwipe: close });

const { distanceX, isSwiping } = usePointerSwipe(target, {
  onSwipeStart: () => {
    emit("swipe-start");
  },
  onSwipeEnd: () => {
    if (distanceX.value > deleteBtnWidth / 2) {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  },
});

const translateX = computed(() => {
  if (isSwiping.value) {
    const x =
      distanceX.value > 0 ? -Math.min(distanceX.value, deleteBtnWidth + 20) : 0;
    return x;
  }
  return isOpen.value ? -deleteBtnWidth : 0;
});

const btnScale = computed(() => {
  const progress = Math.min(Math.abs(translateX.value) / deleteBtnWidth, 1);
  return 0.5 + progress * 0.5;
});

const btnOpacity = computed(() => {
  const progress = Math.min(Math.abs(translateX.value) / deleteBtnWidth, 1);
  return progress;
});
</script>

<template>
  <div class="relative overflow-hidden px-5">
    <div
      class="absolute right-0 top-0 bottom-0 flex items-center justify-end pr-5"
      :style="{ width: `${deleteBtnWidth}px` }"
    >
      <button
        type="button"
        class="group flex flex-col items-end justify-center w-full h-full"
        :class="{ 'transition-all duration-300 ease-in-out': !isSwiping }"
        :style="{ transform: `scale(${btnScale})`, opacity: btnOpacity }"
        @click="emit('delete')"
      >
        <div class="flex flex-col items-center justify-center">
          <div
            class="flex items-center justify-center size-11 bg-red-500 group-active:bg-red-600 group-active:scale-[0.97] transition-all duration-300 ease-in-out rounded-full"
          >
            <HugeiconsIcon :icon="Delete02Icon" :size="20" color="white" />
          </div>
          <span
            class="text-xs font-medium mt-1 tracking-tight text-muted-foreground/70"
            >Delete</span
          >
        </div>
      </button>
    </div>

    <button 
      type="button"
      @click="emit('edit', props.account)"
      ref="target"
      class="bg-white rounded-2xl w-full p-4 flex flex-row justify-between gap-4 h-18"
      :class="{ 'duration-300': !isSwiping }"
      :style="{ transform: `translateX(${translateX}px)` }"
    >
      <div class="flex gap-3 items-center">
        <div
          class="flex size-8 rounded-full items-center justify-center text-xl"
          :class="[
            BG_COLOR[props.account.color] || BG_COLOR.default,
            TEXT_COLOR[props.account.color] || TEXT_COLOR.default,
          ]"
        >
          <HugeiconsIcon
            :icon="
              ICON_OPTIONS.find((item) => item.name === props.account.icon)
                ?.icon
            "
            :size="18"
            color="currentColor"
            :strokeWidth="1.5"
          />
        </div>
        <div class="text-start">
          <p
            class="text-foreground tracking-tight font-semibold text-sm line-clamp-1"
          >
            {{ props.account.name }}
          </p>
          <p class="text-[11px] text-foreground/70 tracking-wide">
            {{ ACCOUNT_TYPES.find((item) => item.value === props.account.type)?.label || "Unknown" }}
          </p>
        </div>
      </div>
      <div>
        <p class="text-[10px] tracking-tight text-foreground/70 text-right">
          Current balance
        </p>
        <p
          class="text-foreground font-bold text-right duration-300 ease-in-out transition-opacity"
          :class="
            hide ? 'tracking-[0.2rem] text-base' : 'tracking-tight text-sm'
          "
        >
          {{ hide ? "••••" : formatPrice(props.account.balance) }}
        </p>
      </div>
    </button>
  </div>
</template>
