import { useEventListener } from '@vueuse/core'
import type { Ref } from 'vue'

export function onScrollBottom (element: Ref<HTMLElement>, handler: (event: Event) => void) {
  useEventListener(element, 'scroll', (event) => {
    const target   = event.target as HTMLDivElement
    const isBottom = (target.scrollTop + target.offsetHeight) >= target.scrollHeight

    if (isBottom)
      handler(event)
  }, { passive: true })
}
