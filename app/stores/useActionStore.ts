import { defineStore } from 'pinia'

export const useActionStore = defineStore('action', () => {
  const actionFunction = ref<(() => void) | null>(null)
  
  const setAction = (fn: () => void) => {
    actionFunction.value = fn
  }

  const resetAction = () => {
    actionFunction.value = null
  }

  return { actionFunction, setAction, resetAction }
})
