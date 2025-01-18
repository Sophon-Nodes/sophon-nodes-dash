import { inject } from 'vue'
import { TOAST_INJECTION_KEY } from 'radix-vue'

export function useToast() {
  const toast = inject(TOAST_INJECTION_KEY)
  if (!toast) {
    throw new Error('No toast provider found')
  }
  return toast
}
