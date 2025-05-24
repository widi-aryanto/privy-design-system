import Fuse from 'fuse.js'
import type { Ref } from 'vue'
import {
  computed,
  shallowRef,
  watch,
} from 'vue'
import type { SelectItem } from '..'
import { defineAdapter, useOptionsProp } from './adapter'

export default defineAdapter({
  setup ({ props, keyword }) {
    const fuse: Ref<Fuse<SelectItem>> = shallowRef()

    const normalizeOptions = useOptionsProp(props)
    const filteredOptions  = computed(() => {
      if (!keyword.value)
        return normalizeOptions.value

      return fuse.value.search(keyword.value).map((result) => {
        return result.item
      })
    })

    watch(normalizeOptions, (items) => {
      fuse.value = new Fuse(items, { keys: ['text', 'value'] })
    }, { immediate: true })

    return filteredOptions
  },
})
