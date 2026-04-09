<script lang="ts" setup>
const { register, loading, loginWithGoogle, fieldErrors } = useAuth();
const props = defineProps(["formData"]);
const emit = defineEmits(["success"]);
const onRegister = async () => {
  try {
    const res = await register(
      props.formData.email, 
      props.formData.name, 
      props.formData.password, 
      props.formData.confirmPassword
    );
    if (res) {
      emit('success');
    }
  } catch (err: any) {
    if (err.message === "Validation failed") {
      return;
    }
    alert("Register gagal: " + err.message);
  }
};

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const handleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const handleShowConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>

<template>
  <form @submit.prevent="onRegister" class="space-y-4 py-4 px-5">
    <TextInput
      id="name"
      type="text"
      name="name"
      label="Full Name"
      v-model="props.formData.name"
      placeholder="Jhon Doe"
      :error="fieldErrors.name"
    >
      <template #left>
        <Icon name="lucide:user" size="18" />
      </template>
    </TextInput>

    <TextInput
      id="email"
      type="email"
      name="email"
      label="Email Address"
      v-model="props.formData.email"
      autocomplete="email"
      placeholder="example@mail.com"
      :error="fieldErrors.email"
    >
      <template #left>
        <Icon name="lucide:mail" size="18" />
      </template>
    </TextInput>

    <TextInput
      id="password"
      :type="showPassword ? 'text' : 'password'"
      name="password"
      label="Password"
      v-model="props.formData.password"
      placeholder="********"
      :error="fieldErrors.password"
    >
      <template #left>
        <Icon name="lucide:lock-keyhole" size="18" />
      </template>
      <template #right>
        <button
          type="button"
          @click="handleShowPassword"
          aria-label="ShowPassword"
        >
          <Icon :name="`lucide:${showPassword ? 'eye-off' : 'eye'}`" />
        </button>
      </template>
    </TextInput>
    <TextInput
      id="confirmPassword"
      :type="showConfirmPassword ? 'text' : 'password'"
      name="confirmPassword"
      label="Confirm password"
      v-model="props.formData.confirmPassword"
      placeholder="********"
      :error="fieldErrors.confirm_password"
    >
      <template #right>
        <button
          type="button"
          @click="handleShowConfirmPassword"
          aria-label="ShowPassword"
        >
          <Icon :name="`lucide:${showPassword ? 'eye-off' : 'eye'}`" />
        </button>
      </template>
    </TextInput>
    <button
      type="submit"
      :disabled="loading"
      class="w-full bg-primary text-white py-4 rounded-full font-bold"
    >
      {{ loading ? "Memproses..." : "Register" }}
    </button>
    <div class="relative flex py-2 items-center">
      <div class="grow border-t border-muted-foreground/20" />
      <span class="shrink-0 mx-4 text-xs text-muted-foreground/60"
        >Or login with</span
      >
      <div class="grow border-t border-muted-foreground/20" />
    </div>

    <button
      @click="loginWithGoogle"
      type="button"
      class="flex-1 w-full border border-muted-foreground/20 py-3 rounded-full flex items-center justify-center space-x-2 font-semibold text-sm tracking-tight"
    >
      <Icon name="logos:google-icon" mode="svg" />
      <span>Google</span>
    </button>
  </form>
</template>
