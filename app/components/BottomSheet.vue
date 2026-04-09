<script setup>
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "vaul-vue";

const isOpen = defineModel("open");
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
            <div class="sticky -top-1 z-10 bg-white py-3 px-5">
              <DrawerTitle class="text-xl font-bold tracking-tighter">
                <slot name="title" />
              </DrawerTitle>
              <DrawerDescription class="sr-only">
                <slot name="description" />
              </DrawerDescription>
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
