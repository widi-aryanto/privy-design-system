<template>
  <div
    class="strengthbar"
    :data-status="status">
    <div
      v-for="(active, i) in items"
      :key="i"
      class="strengthbar__bar"
      :class="{ 'strengthbar--active': active }" />
  </div>
</template>

<script lang="ts" setup>
import { useToNumber } from '@vueuse/core'
import {
  computed,
  toRef,
} from 'vue'

const props = defineProps({
  length: {
    type   : [Number, String],
    default: 6,
  },
  value: {
    type   : [Number, String],
    default: 0,
  },
  min: {
    type   : [Number, String],
    default: 0,
  },
  max: {
    type   : [Number, String],
    default: 6,
  },
})

const minValue    = useToNumber(toRef(props, 'min'), { nanToZero: true })
const maxValue    = useToNumber(toRef(props, 'max'), { nanToZero: true })
const localValue  = useToNumber(toRef(props, 'value'), { nanToZero: true })
const lengthValue = useToNumber(toRef(props, 'length'), { nanToZero: true })

const strength = computed(() => {
  return (localValue.value - minValue.value) / (maxValue.value - minValue.value)
})

const items = computed(() => {
  return Array.from({ length: lengthValue.value })
    .map((_, i) => {
      return Math.round(strength.value * lengthValue.value) >= (i + 1)
    })
})

const status = computed(() => {
  const val = strength.value * 3

  if (val > 2)
    return 'high'
  else if (val > 1)
    return 'mid'
  else
    return 'low'
})
</script>

<style lang="postcss">
.strengthbar {
  @apply flex w-full space-x-4;

  &__bar {
    @apply rounded-full h-1 bg-emphasis-alpha grow transition-colors duration-150;
    @apply dark:bg-dark-emphasis-alpha;
  }

  &&[data-status="low"] {
    .strengthbar--active {
      @apply bg-danger-emphasis;
      @apply dark:bg-dark-danger-emphasis;
    }
  }

  &&[data-status="mid"] {
    .strengthbar--active {
      @apply bg-warning-emphasis;
      @apply dark:bg-dark-warning-emphasis;
    }
  }

  &&[data-status="high"] {
    .strengthbar--active {
      @apply bg-success-emphasis;
      @apply dark:bg-dark-success-emphasis;
    }
  }
}
</style>
