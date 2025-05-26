import defu from 'defu'
import { tryOnMounted } from '@vueuse/shared'
import { computed, ref } from 'vue'

export interface LoadingOptions {
  elapsed: number | boolean,
}

export default function useLoading (options_?: LoadingOptions) {
  const options = defu(options_, { elapsed: true })
  const counter = ref(0)
  const elapsed = ref(options.elapsed !== false)
  const loading = computed({
    get () {
      return counter.value > 0 || elapsed.value
    },
    set (value: boolean) {
      if (value)
        counter.value++
      else
        counter.value--
    },
  })

  tryOnMounted(() => {
    if (options.elapsed !== false) {
      const elapsedTime = options.elapsed === true
        ? 200
        : options.elapsed

      setTimeout(() => {
        elapsed.value = false
      }, elapsedTime)
    }
  })

  return loading
}
