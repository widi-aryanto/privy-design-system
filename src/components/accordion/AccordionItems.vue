<script lang="ts">
/**
 * TODO: Migrate this component to script setup after defineRender has been release
 * https://github.com/vuejs/rfcs/discussions/585
 */
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { findAllChildren } from '../utils/vnode'

export default defineComponent({
  props: {
    modelValue: {
      type   : [Number, Array] as PropType<number | number[]>,
      default: undefined,
    },
    multiple: {
      type   : Boolean,
      default: false,
    },
    noCaret: {
      type   : Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup (props, { slots, emit }) {
    function setValue (isExpand: boolean, i: number) {
      if (props.multiple) {
        const value = Array.isArray(props.modelValue)
          ? props.modelValue
          : []

        if (isExpand)
          emit('update:modelValue', [...value, i])
        else
          emit('update:modelValue', value.filter((x) => x !== i))
      } else {
        if (isExpand)
          emit('update:modelValue', i)
        else if (props.modelValue === i)
          emit('update:modelValue')
      }
    }

    return () => {
      const items = findAllChildren(slots.default(), 'AccordionItem')

      return items.map((item, i) => {
        const isExpand = props.multiple && Array.isArray(props.modelValue)
          ? props.modelValue.includes(i)
          : props.modelValue === i

        return h(item, {
          'noCaret'            : item.props?.noCaret ?? props.noCaret,
          'modelValue'         : isExpand,
          'onUpdate:modelValue': (value: boolean) => {
            setValue(value, i)
          },
        })
      })
    }
  },
})
</script>
