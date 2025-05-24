import { computed, getCurrentInstance } from 'vue'
import type { CheckboxProps } from '../checkbox'
import { isEqual } from '../utils/value'

export type RadioProps = Omit<CheckboxProps, 'uncheckedValue'>

export interface ChangedInteface {
  value: any,
  state: boolean,
}

export function useVModel (props: RadioProps) {
  const { emit } = getCurrentInstance()
  const model    = computed({
    get () {
      return isEqual(props.modelValue, props.value) || props.checked
    },
    set (value: boolean) {
      emit('change', value)

      if (value)
        emit('update:modelValue', props.value)
    },
  })

  return model
}
