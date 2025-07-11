<template>
  <Dropdown
    v-model="isOpen"
    class="datepicker"
    data-testid="datepicker"
    aria-label="datepicker"
    :placement="placement"
    :class="classNames"
    :disabled="disabled">
    <template #activator>
      <Input
        v-bind="$attrs"
        :value="value"
        :model-value="value"
        data-testid="datepicker-input"
        class="datepicker__input"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="error"
        :size="size"
        :clearable="clearable"
        :container-class="containerClass"
        readonly
        @clear="onClear"
        @focus="onFocus">
        <template #append>
          <IconCalendar
            class="datepicker__icon" />
        </template>
      </Input>
    </template>

    <Calendar
      v-model="model"
      class="datepicker__calendar"
      :start="start"
      :end="end"
      :disabled="disabled"
      :readonly="readonly"
      :max="max"
      :min="min"
      :mode="mode"
      :range="range"
      :min-range="minRange"
      :max-range="maxRange"
      @change="onSelected"
      @update:start="$emit('update:start', $event)"
      @update:end="$emit('update:end', $event)" />
  </Dropdown>
</template>

<script lang="ts" setup>
import Dropdown from '../dropdown/Dropdown.vue'
import Input from '../input/Input.vue'
import Calendar from '../calendar/Calendar.vue'
import { format as formatDate, isDate } from 'date-fns'
import type { PropType } from 'vue'
import {
  computed,
  ref,
  watch,
} from 'vue'
import type { CalendarMode } from '../calendar/adapter/adapter'
import { useVModel } from '../input'
import IconCalendar from '@privyid/persona-icon/vue/calendar/16.vue'
import type { SizeVariant } from '../button'
import type { Placement } from '@floating-ui/dom'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: {
    type   : [Date, Array] as PropType<Date | [Date, Date]>,
    default: undefined,
  },
  size: {
    type   : String as PropType<SizeVariant>,
    default: 'md',
  },
  disabled: {
    type   : Boolean,
    default: false,
  },
  readonly: {
    type   : Boolean,
    default: false,
  },
  error: {
    type   : Boolean,
    default: false,
  },
  clearable: {
    type   : Boolean,
    default: false,
  },
  containerClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  start: {
    type   : Date,
    default: undefined,
  },
  end: {
    type   : Date,
    default: undefined,
  },
  placeholder: {
    type   : String,
    default: '',
  },
  format: {
    type   : String,
    default: 'dd/MM/yyyy',
  },
  max: {
    type   : Date,
    default: undefined,
  },
  min: {
    type   : Date,
    default: undefined,
  },
  mode: {
    type   : String as PropType<CalendarMode>,
    default: 'date',
  },
  range: {
    type   : Boolean,
    default: false,
  },
  minRange: {
    type   : String,
    default: undefined,
  },
  maxRange: {
    type   : String,
    default: undefined,
  },
  placement: {
    type   : String as PropType<Placement>,
    default: 'bottom-start',
  },
})

const emit = defineEmits<{
  'change': [unknown],
  'update:modelValue': [unknown],
  'update:start': [Date],
  'update:end': [Date],
}>()

const model  = useVModel(props)
const isOpen = ref(false)

const value = computed(() => {
  const dates = Array.isArray(model.value)
    ? model.value
    : [model.value]

  return dates.map((date) => {
    return isDate(date)
      ? formatDate(date as Date, props.format)
      : ''
  }).filter(Boolean).join(' - ')
})

watch(() => props.start, (start) => {
  if (Array.isArray(model.value))
    model.value[0] = start
})

watch(() => props.end, (end) => {
  if (Array.isArray(model.value))
    model.value[1] = end
})

const classNames = computed(() => {
  const result: string[] = []

  if (isOpen.value)
    result.push('datepicker--open')

  if (props.disabled)
    result.push('datepicker--disabled')

  if (props.readonly)
    result.push('datepicker--readonly')

  if (props.error)
    result.push('datepicker--error', 'state--error')

  return result
})

function onFocus () {
  if (!props.disabled && !props.readonly)
    isOpen.value = true
}

function onClear () {
  if (!props.disabled && !props.readonly)
    model.value = undefined
}

function onSelected (event: Event) {
  isOpen.value = false

  emit('change', event)
}
</script>

<style lang="postcss">
.datepicker {
  &__input {
    @apply pr-8 truncate;
  }

  &__icon {
    @apply transition-transform duration-150 text-muted pointer-events-none;
    @apply dark:text-dark-muted;
  }

  > .dropdown__menu {
    --p-dropdown-size: auto;
    --p-dropdown-max-height: 100%;

    @apply min-w-max max-h-min;
  }
}
</style>
