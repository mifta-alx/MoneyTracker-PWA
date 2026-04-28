<script lang="ts" setup>
import { HugeiconsIcon } from "@hugeicons/vue";
import {
  Cancel01Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";

interface Props {
  open: boolean;
  color: string;
  icon: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["save", "close"]);
const localColor = ref(props.color);
const localIcon = ref(props.icon);

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      localColor.value = props.color;
      localIcon.value = props.icon;
    }
  },
);

const handleSave = () => {
  emit("save", { color: localColor.value, icon: localIcon.value });
};

const handleClose = () => {
  emit("close");
};
</script>
<template>
  <BottomSheet :open="open" :showClose="true" @close="handleClose">
    <template #title>Icon & Color</template>
    <template #description>Personalize how this icon looks</template>

    <template #content>
      <div class="space-y-6 pb-12">
        <div class="flex justify-center py-4">
          <div
            class="size-24 rounded-4xl flex items-center justify-center text-3xl transition-all duration-300"
            :class="[BG_COLOR[localColor], TEXT_COLOR[localColor]]"
          >
            <HugeiconsIcon
              :icon="ICON_OPTIONS.find((i) => i.name === localIcon)?.icon"
              :size="48"
              :strokeWidth="1.5"
            />
          </div>
        </div>

        <div class="flex gap-3 flex-col">
          <Label class="text-xs text-muted-foreground uppercase tracking-widest"
            >Color</Label
          >
          <ColorPicker v-model="localColor" />
        </div>

        <div class="flex gap-3 flex-col">
          <Label class="text-xs text-muted-foreground uppercase tracking-widest"
            >Icon</Label
          >
          <IconPicker v-model="localIcon" />
        </div>
        <div
          class="fixed bottom-0 flex flex-row left-0 right-0 bg-white px-5 py-3 gap-2"
        >
          <UiButton @click="handleSave"> Save appearance </UiButton>
        </div>
      </div>
    </template>
  </BottomSheet>
</template>
