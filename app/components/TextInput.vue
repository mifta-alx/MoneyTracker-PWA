<script setup lang="ts">
interface Props {
  label?: string;
  modelValue: string | number;
  placeholder?: string;
  type?: string;
  inputmode?:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";
  leftIcon?: string;
  rightIcon?: string;
  maxlength?:string | number;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
});
const emit = defineEmits(["update:modelValue"]);
const isIcon = (val: string) => val.includes(":");

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <label
      v-if="label"
      class="text-sm font-semibold tracking-tight text-foreground/80"
    >
      {{ label }}
    </label>

    <div class="relative flex items-center group">
      <div
        v-if="leftIcon"
        class="absolute left-4 z-10 flex items-center justify-center min-w-6 text-muted-foreground/50 group-focus-within:text-primary transition-colors pointer-events-none"
      >
        <Icon v-if="isIcon(leftIcon)" :name="leftIcon" mode="svg" size="20" />
        <span v-else class="text-sm font-bold tracking-tight">{{
          leftIcon
        }}</span>
      </div>

      <input
        :inputmode="inputmode"
        :value="modelValue"
        @input="onInput"
        :maxlength="maxlength"
        :placeholder="placeholder"
        class="w-full bg-background border-2 border-transparent rounded-2xl py-3.5 transition-all outline-none text-base font-normal placeholder:text-muted-foreground/30 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
        :class="[leftIcon ? 'pl-12' : 'pl-5', rightIcon ? 'pr-12' : 'pr-5']"
      />

      <div
        v-if="rightIcon"
        class="absolute right-4 z-10 flex items-center justify-center min-w-6 text-muted-foreground/50 group-focus-within:text-primary transition-colors pointer-events-none"
      >
        <Icon v-if="isIcon(rightIcon)" :name="rightIcon" mode="svg" size="20" />
        <span v-else class="text-sm font-bold tracking-tight">{{
          rightIcon
        }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
