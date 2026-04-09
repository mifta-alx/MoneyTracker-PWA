<script setup lang="ts">
interface Props {
  label?: string;
  modelValue: string | number;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
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
  maxlength?: string | number;
  error?: string;
  autocomplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
 id: () => useId(),
});

const emit = defineEmits(["update:modelValue"]);

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <label
      v-if="label"
      :for="id"
      class="text-sm font-semibold tracking-tight text-foreground/80"
    >
      {{ label }}
    </label>

    <div class="relative flex items-center group">
      <div
        v-if="$slots.left"
        class="absolute left-4 z-0 flex items-center justify-center text-muted-foreground/50 group-focus-within:text-primary transition-colors pointer-events-none"
      >
        <slot name="left" />
      </div>

      <input
        :id="id"
        :name="name"
        :type="type"
        :inputmode="inputmode"
        :value="modelValue"
        @input="onInput"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="w-full bg-white border border-muted-foreground/10 rounded-2xl py-4 transition-all outline-none text-sm font-normal placeholder:text-muted-foreground/30 focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
        :class="[$slots.left ? 'pl-12' : 'pl-5', $slots.right ? 'pr-12' : 'pr-5', error ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/10' : '']"
      />

      <div v-if="$slots.right" class="absolute right-4 z-10 flex items-center justify-center text-muted-foreground/50 group-focus-within:text-primary transition-colors">
        <slot name="right" />
      </div>
    </div>

    <div v-if="error" class="text-red-400 text-sm font-medium">{{ error }}</div>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
