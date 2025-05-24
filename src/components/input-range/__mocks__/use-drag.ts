import type { Ref } from 'vue'
import {
  nextTick,
  watch,
} from 'vue'

type Handler = (event: { pageX: number }) => void

const hook: Map<HTMLElement, Handler> = new Map()

export function useDrag (el: Ref<HTMLElement>, handler: Handler) {
  watch(el, (value) => {
    if (value)
      hook.set(value, handler)
  }, { immediate: true })
}

export async function triggerDrag (el: HTMLElement, pageX: number) {
  const handler = hook.get(el)

  if (handler)
    handler({ pageX })

  await nextTick()
}

export async function resetHook () {
  hook.clear()
}
