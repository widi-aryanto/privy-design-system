<template>
  <div class="filterbar">
    <template
      v-for="item in pinnedItems"
      :key="item.key">
      <slot :name="`cell(${item.key})`">
        <component
          :is="item.type"
          class="filterbar__item"
          :schema="item"
          :model-value="getValue(item.key)"
          v-bind="item"
          @update:model-value="setValue(item.key, $event)" />
      </slot>
    </template>
    <Button
      size="sm"
      variant="link"
      color="info"
      @click="reset">
      Reset
    </Button>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import {
  computed,
  defineComponent,
} from 'vue'
import type { FilterItem } from '.'
import Dropdown from '../dropdown/Dropdown.vue'
import Button from '../button/Button.vue'
import Select from './pinned/PinnedSelect.vue'
import Toggle from './pinned/PinnedToggle.vue'
import Multiselect from './pinned/PinnedMultiselect.vue'
import Date from './pinned/PinnedDate.vue'
import { useVModel } from '../input'

export default defineComponent({
  components: {
    Button,
    Dropdown,
    Date,
    Select,
    Multiselect,
    Toggle,
  },
  props: {
    schema: {
      type   : Array as PropType<FilterItem[]>,
      default: () => ([]),
    },
    modelValue: {
      type   : Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup (props) {
    const model = useVModel(props)

    const pinnedItems = computed(() => {
      return props.schema
        .filter((item) => {
          return item.pinned !== false
        })
    })

    function getValue (key: string) {
      return model.value[key]
    }

    function setValue (key: string, value: unknown) {
      model.value = { ...model.value, [key]: value }
    }

    function reset () {
      model.value = Object.fromEntries(props.schema.map((i) => [i.key, i.default]))
    }

    return {
      model,
      pinnedItems,
      getValue,
      setValue,
      reset,
    }
  },
})
</script>

<style lang="postcss">
.filterbar {
  @apply flex space-x-2 items-center;

  &__item {
    &.filterbar--active {
      &.btn--default,
      & .dropdown__activator.btn--default {
        @apply bg-inverse text-on-emphasis border-inverse;
        @apply dark:bg-dark-inverse dark:text-dark-on-emphasis dark:border-dark-inverse;
      }
    }
  }
}
</style>
