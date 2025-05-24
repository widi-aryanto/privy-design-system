import { vi } from 'vitest'
import { ref } from 'vue'

export const copy = vi.fn()

export const copied = ref(false)

export function useClipboard () {
  return {
    copy,
    copied,
  }
}
