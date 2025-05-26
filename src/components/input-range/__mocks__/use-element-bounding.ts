import { ref } from 'vue'

export function useElementBounding () {
  return {
    left : ref(0),
    width: ref(100),
  }
}
