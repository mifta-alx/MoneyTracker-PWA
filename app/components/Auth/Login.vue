<script setup lang="ts">
const { login, loginWithGoogle, loading, fieldErrors } = useAuth();
const props = defineProps(["formData"]);
const emit = defineEmits(["success"]);
const rememberMe = ref(false);

const onLogin = async () => {
  try {
    const res = await login(
      props.formData.email,
      props.formData.password,
      rememberMe.value,
    );
    if (res) {
      emit("success");
    }
  } catch (err: any) {
    alert("Login gagal: " + err.message);
  }
};

const showPassword = ref(false);

const handleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <form @submit.prevent="onLogin" class="space-y-4 py-4 px-5">
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
    <div class="flex items-center justify-between mt-6">
      <label class="flex items-center space-x-2 cursor-pointer">
        <input
          v-model="rememberMe"
          type="checkbox"
          class="w-4 h-4 rounded border-gray-300 text-[#7D9384] focus:ring-[#7D9384]"
        />
        <span class="text-xs font-medium text-gray-600">Remember me</span>
      </label>
      <a href="#" class="text-xs font-medium text-[#7D9384]"
        >Forgot Password?</a
      >
    </div>
    <button
      type="submit"
      :disabled="loading"
      class="w-full bg-primary text-white py-4 rounded-full font-bold"
    >
      {{ loading ? "Memproses..." : "Login" }}
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
