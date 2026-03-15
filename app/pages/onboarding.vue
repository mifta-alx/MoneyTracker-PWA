<template>
  <div class="min-h-screen bg-white text-slate-900 p-6 flex flex-col">
    <div class="w-full bg-slate-100 h-1.5 rounded-full mb-10">
      <div
          class="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
          :style="{ width: `${(step / 3) * 100}%` }"
      ></div>
    </div>

    <div class="flex-1">
      <Transition name="fade" mode="out-in">
        <div v-if="step === 1" key="step1">
          <h1 class="text-2xl font-bold mb-2">Halo! Siapa namamu?</h1>
          <p class="text-slate-500 mb-6">Kenalan dulu biar makin akrab.</p>
          <input
              v-model="form.name"
              type="text"
              placeholder="Contoh: Budi Sudarsono"
              class="w-full border-b-2 border-slate-200 focus:border-emerald-500 outline-none text-xl py-2 transition-colors"
          />
        </div>

        <div v-else-if="step === 2" key="step2">
          <h1 class="text-2xl font-bold mb-2">Berapa saldo awalmu?</h1>
          <p class="text-slate-500 mb-6">Masukkan saldo dari dompet atau bank utamamu.</p>
          <div class="relative">
            <span class="absolute left-0 top-2 text-xl font-semibold">Rp</span>
            <input
                v-model="form.initialBalance"
                type="number"
                class="w-full border-b-2 border-slate-200 focus:border-emerald-500 outline-none text-xl py-2 pl-10 transition-colors"
            />
          </div>
          <input
              v-model="form.accountName"
              placeholder="Nama Akun (misal: BCA, Jago, Dompet)"
              class="w-full mt-4 border-slate-200 border p-3 rounded-xl outline-none"
          />
        </div>

        <div v-else-if="step === 3" key="step3">
          <div class="text-center py-10">
            <Icon name="lucide:party-popper" class="text-6xl text-emerald-500 mb-4" mode="svg" />
            <h1 class="text-2xl font-bold mb-2">Siap untuk kelola uang?</h1>
            <p class="text-slate-500">Kami akan menyiapkan sistem budget 50/30/20 untukmu secara otomatis.</p>
          </div>
        </div>
      </Transition>
    </div>

    <div class="mt-auto">
      <button
          @click="nextStep"
          class="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold active:scale-95 transition-transform"
      >
        {{ step === 3 ? 'Mulai Sekarang' : 'Lanjut' }}
      </button>
    </div>
  </div>
</template>

<script setup>
const step = ref(1)
const form = reactive({
  name: '',
  initialBalance: 0,
  accountName: ''
})

const nextStep = async () => {
  if (step.value < 3) {
    step.value++
  } else {
    await finishOnboarding()
  }
}

const finishOnboarding = async () => {
  // 1. Update Profile (name & onboarding_completed = true)
  // 2. Insert ke table accounts (initial balance)
  // 3. Insert default budget_allocations (Needs, Wants, Savings)
  // 4. Redirect ke Dashboard
  console.log('Saving to Supabase...', form)
  navigateTo('/')
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>