<template>
  <div
    class="progress-indicator"
    data-testid="progress-indicator"
    :class="classNames">
    <div class="progress-indicator__container">
      <template
        v-for="i in nums"
        :key="i">
        <div
          class="progress-indicator__item"
          data-testid="progress-indicator-item"
          @click="setValue(i)" />
      </template>
    </div>
    <div
      :style="activeStyle"
      class="progress-indicator__item progress-indicator__item--active"
      data-testid="progress-indicator-item-active" />
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '../input'
import { useToNumber } from '@vueuse/core'
import { useClamp } from '@vueuse/math'
import type {
  StyleValue,
  PropType,
} from 'vue'
import { computed, toRef } from 'vue'
import type { DirectionVariant } from '../steps'

const props = defineProps({
  modelValue: {
    type   : Number,
    default: 1,
  },
  direction: {
    type   : String as PropType<DirectionVariant>,
    default: 'horizontal',
  },
  length: {
    type   : [Number, String],
    default: 6,
  },
})

const emit = defineEmits<{
  'update:modelValue': [number],
  'change': [number],
}>()

const model  = useVModel(props)
const nums   = useToNumber(toRef(props, 'length'), { nanToZero: true, method: 'parseInt' })
const active = useClamp(model, 1, nums)

const classNames = computed(() => {
  const result: string[] = []

  if (props.direction)
    result.push(`progress-indicator--${props.direction}`)

  return result
})

const activeStyle = computed<StyleValue>(() => {
  if (props.direction === 'vertical') {
    return {
      transform: `translateY(calc((100% + .25rem) * ${active.value - 1}))`,
      height   : `calc((100% - (.25rem * (${nums.value} - 1))) / ${nums.value} )`,
    }
  }

  return { transform: `translateX(calc((100% + .25rem) * ${active.value - 1}))` }
})

function setValue (value: number) {
  active.value = value

  emit('change', value)
}
</script>

<style lang="postcss">
.progress-indicator {
  --p-bg-indicator-item: rgba(theme(backgroundColor.inverse), theme(opacity.20));
  --p-bg-dark-indicator-item: rgba(theme(backgroundColor.dark.inverse), theme(opacity.20));
  --p-bg-indicator-item-active: rgba(theme(backgroundColor.inverse), theme(opacity.60));
  --p-bg-dark-indicator-item-active: rgba(theme(backgroundColor.dark.inverse), theme(opacity.60));

  @apply relative;

  &__container {
    @apply flex flex-1;
  }

  &__item {
    @apply bg-[color:var(--p-bg-indicator-item)] cursor-pointer;
    @apply dark:bg-[color:var(--p-bg-dark-indicator-item)];

    &--active {
      @apply absolute top-0 left-0 transition-transform;
      @apply bg-[color:var(--p-bg-indicator-item-active)] pointer-events-none;
      @apply dark:bg-[color:var(--p-bg-dark-indicator-item-active)];
    }
  }

  &--horizontal {
    .progress-indicator__container {
      @apply justify-center space-x-1;
    }

    .progress-indicator__item {
      @apply w-2 h-2 rounded-full;
    }
  }

  &--vertical {
    @apply h-full;

    .progress-indicator__container {
      @apply flex-col space-y-1 h-full;
    }

    .progress-indicator__item {
      @apply w-2 h-full rounded-full;
    }
  }

}
</style>
