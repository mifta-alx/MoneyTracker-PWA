<script setup>
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/vue";
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "vaul-vue";
const props = defineProps({
  showClose: {
    type: Boolean,
    default: false,
  },
});
const isOpen = defineModel("open");
const slots = useSlots();

const hasHeader = computed(() => {
  return !!(slots.title || slots.description || props.showClose);
});
</script>

<template>
  <DrawerRoot v-model:open="isOpen">
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>

    <DrawerPortal>
      <DrawerOverlay class="fixed inset-0 bg-foreground/40 z-50" />

      <DrawerContent
        class="bg-white flex flex-col rounded-t-4xl max-h-[92%] mt-24 fixed bottom-0 left-0 right-0 z-60 outline-none"
      >
        <div
          class="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-muted-foreground/20 mt-4 mb-2"
        />
        <div class="flex-1 overflow-y-auto no-scrollbar">
          <div class="max-w-md mx-auto relative">
            <div v-if="hasHeader" class="sticky -top-1 z-10 bg-white py-3 px-5">
              <div class="flex flex-row justify-between items-start">
                <div class="flex flex-col">
                  <DrawerTitle class="text-xl font-bold tracking-tighter">
                    <slot name="title" />
                  </DrawerTitle>
                  <DrawerDescription
                    class="text-xs text-muted-foreground/70 font-medium"
                  >
                    <slot name="description" />
                  </DrawerDescription>
                </div>
                <button
                  v-if="showClose"
                  class="text-muted-foreground/60 bg-muted-foreground/5 rounded-xl p-2"
                  @click="isOpen = false"
                >
                  <HugeiconsIcon
                    :icon="Cancel01Icon"
                    :size="20"
                    color="currentColor"
                    :strokeWidth="2"
                  />
                </button>
              </div>
            </div>

            <div class="mt-4 pb-6 px-5">
              <slot name="content" />
            </div>
          </div>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
