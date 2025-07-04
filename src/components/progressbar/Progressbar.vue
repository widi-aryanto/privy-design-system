<template>
  <div
    data-testid="progressbar"
    role="progressbar"
    class="progressbar"
    :class="classNames"
    :data-value="percentage">
    <div
      data-testid="progressbar-bar"
      class="progressbar__bar"
      :style="{ width }" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useProgressbar } from '.'

const props = defineProps({
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
    default: 100,
  },
  success: {
    type   : Boolean,
    default: false,
  },
  error: {
    type   : Boolean,
    default: false,
  },
  indeterminate: {
    type   : Boolean,
    default: false,
  },
})

const percentage = useProgressbar(props)

const width = computed(() => {
  if (props.success || props.error)
    return '100%'

  return `${percentage.value * 100}%`
})

const classNames = computed(() => {
  const result: string[] = []

  if (props.indeterminate)
    result.push('progressbar--indeterminate')

  if (props.error)
    result.push('progressbar--error')
  else if (props.success)
    result.push('progressbar--success')

  return result
})
</script>

<style lang="postcss">
.progressbar {
  /* --p-bg-progress-default: theme(backgroundColor.base.DEFAULT); */
  --p-bg-progress-default: theme(backgroundColor.emphasis-alpha);
  --p-bg-dark-progress-default: theme(backgroundColor.dark.emphasis-alpha);

  @apply bg-[color:var(--p-bg-progress-default)] w-full h-1 rounded-full overflow-hidden;
  @apply dark:[color:var(--p-bg-dark-progress-default)];

  &__bar {
    @apply transition-[width] will-change-[width] duration-75 ease-out;
    @apply bg-brand-accent rounded-full h-full origin-center;
    @apply dark:bg-dark-brand-accent;
  }

  &--indeterminate {
    .progressbar__bar {
      animation: 1s ease-in-out infinite alternate progressbar-bounce;
    }
  }

  &--success &__bar {
    @apply bg-success-emphasis;
    @apply dark:bg-dark-success-emphasis;
  }

  &--error &__bar {
    @apply bg-dark-danger-emphasis;
    @apply dark:bg-dark-danger-emphasis;
  }
}

@keyframes progressbar-bounce {
  0% {
    width: 40%;
    transform: translateX(-75%);
  }

  100% {
    width: 40%;
    transform: translateX(225%);
  }
}
</style>
