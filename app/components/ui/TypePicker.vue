<script lang="ts" setup>
interface Props {
  options: Record<string, any> | any[];
  labelKey?: string;
  valueKey?: string;
  showNone?: boolean;
  noneLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  labelKey: "label",
  valueKey: "value",
  showNone: false,
  noneLabel: "None",
});

const modelValue = defineModel<string | number | null>();

const normalizedOptions = computed(() => {
  let baseOptions = [];

  if (Array.isArray(props.options)) {
    baseOptions = props.options.map((item) => ({
      value: typeof item === "object" ? item[props.valueKey] : item,
      label: typeof item === "object" ? item[props.labelKey] : item,
    }));
  } else {
    baseOptions = Object.entries(props.options).map(([key, value]) => ({
      value: key,
      label: value,
    }));
  }

  if (props.showNone) {
    return [{ value: "", label: props.noneLabel }, ...baseOptions];
  }

  return baseOptions;
});
</script>

<template>
  <div
    class="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-5 px-5"
  >
    <button
      v-for="option in normalizedOptions"
      :key="option.value"
      @click="modelValue = option.value"
      type="button"
      :class="[
        'px-4 snap-center shrink-0 flex flex-row gap-2 items-center justify-center py-2 rounded-full border transition-all duration-300 ease-in-out',
        modelValue === option.value
          ? 'bg-primary text-background'
          : 'border-muted-foreground/20 bg-muted/5 text-muted-foreground/80',
      ]"
    >
      <span class="text-xs font-semibold whitespace-nowrap">
        {{ option.label }}
      </span>
    </button>
  </div>
</template>
