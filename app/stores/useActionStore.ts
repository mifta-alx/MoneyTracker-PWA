import { defineStore } from 'pinia'

export const useActionStore = defineStore('action', () => {
  const actionFunction = ref<(() => void) | null>(null)

  const setAction = (fn: () => void) => {
    actionFunction.value = fn
  }

  const resetAction = (fn: () => void) => {
    if (actionFunction.value === fn) { 
      actionFunction.value = null
    }
  }

  return { actionFunction, setAction, resetAction }
})
