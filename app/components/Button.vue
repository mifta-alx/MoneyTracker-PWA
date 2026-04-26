<script lang="ts" setup>
interface Props {
  variant?: "primary" | "danger" | "secondary" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  loading: false,
  disabled: false,
  type: "button",
});

const emit = defineEmits(["click"]);

const variantClasses = {
  primary: "bg-primary text-white active:scale-[0.98]",
  danger: "bg-red text-white active:scale-[0.98]",
  secondary: "bg-muted-foreground/10 text-muted-foreground/80 active:scale-[0.98]",
  ghost:
    "bg-transparent text-muted-foreground border border-muted-foreground/20",
};

const handleClick = (event: MouseEvent) => {
  if (!props.loading && !props.disabled) {
    emit("click", event);
  }
};
</script>
<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="handleClick"
    class="w-full h-13 flex flex-row gap-2 justify-center items-center py-3.5 rounded-[20px] font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
    :class="variantClasses[variant]"
  >
    <Spinner v-if="loading" :size="20" />

    <template v-else>
      <slot name="icon" />
      <slot />
    </template>
  </button>
</template>
