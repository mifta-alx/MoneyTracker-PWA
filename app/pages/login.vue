<script lang="ts" setup>
import { HugeiconsIcon } from "@hugeicons/vue";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
const form = {
  email: "",
  password: "",
};

const formRegister = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const handleLogin = () => {};
const handleRegister = () => {};
const currentTab = ref("login");
const tabOptions = ["login", "register"];

const onRegisterSuccess = () => {
  const savedEmail = formRegister.email;
  Object.assign(formRegister, {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  currentTab.value = "login";
  form.email = savedEmail;
  alert("Register success");
};

const onLoginSuccess = () => {
  Object.assign(form, {
    email: "",
    password: "",
  });
  navigateTo("/accounts");

  alert("Login success");
};
</script>

<template>
  <div class="bg-foreground min-h-screen flex flex-col">
    <div class="px-5 pt-8 pb-6 space-y-8">
      <button
        type="button"
        class="rounded-full flex items-center justify-center text-white shrink-0 size-10 border border-white/20 active:scale-95 duration-300 ease-in-out"
      >
        <HugeiconsIcon
          :icon="ArrowLeft02Icon"
          :size="24"
          color="currentColor"
          :strokeWidth="1.5"
        />
      </button>
      <div class="space-y-4">
        <h4 class="text-white font-semibold text-3xl tracking-tight">
          Go ahead and set up<br />
          your account
        </h4>
        <p class="text-white/50 text-sm tracking-tight">
          Sign in-up to enjoy the best managing experience
        </p>
      </div>
    </div>
    <div class="grow bg-white rounded-t-4xl py-5 text-gray-800">
      <div class="relative overflow-hidden min-h-100">
        <Tabs v-model="currentTab">
          <div class="px-5">
            <TabsList :options="tabOptions" />
          </div>
          <TabsContent :options="tabOptions">
            <TabsPanel value="login">
              <AuthLogin :form-data="form" @success="onLoginSuccess" />
            </TabsPanel>

            <TabsPanel value="register">
              <AuthRegister
                :form-data="formRegister"
                @success="onRegisterSuccess"
              />
            </TabsPanel>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
</template>
