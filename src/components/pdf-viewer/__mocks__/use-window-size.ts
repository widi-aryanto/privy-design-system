import { ref } from 'vue'

const height = ref(0)

export function setWindowSize (size: number) {
  height.value = size
}

export function useWindowSize () {
  return { height }
}
