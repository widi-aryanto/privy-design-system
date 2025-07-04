<template>
  <Dropdown
    v-model="isOpen"
    variant="input"
    size="sm"
    class="filterbar__select"
    :class="{'filterbar--active': selected !== undefined }"
    divider
    caret>
    <template #button-content>
      {{ selected ? selected.text : schema.label }}
    </template>
    <DropdownHeader>
      {{ schema.label }}
    </DropdownHeader>

    <template
      v-for="(item, i) in items"
      :key="i">
      <DropdownItem>
        <Radio
          v-model="model"
          appearance="option"
          :value="item.value"
          @click="close">
          {{ item.text }}
        </Radio>
      </DropdownItem>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import {
  computed,
  defineComponent,
  ref,
} from 'vue'
import Dropdown from '../../dropdown/Dropdown.vue'
import DropdownItem from '../../dropdown/DropdownItem.vue'
import DropdownHeader from '../../dropdown/DropdownHeader.vue'
import Radio from '../../radio/Radio.vue'
import { useOptionsProp } from '../../select/adapter/adapter'
import { useVModel } from '../../input'
import { isEqual } from '../../utils/value'
import type { FilterSelect } from '..'
import type { SelectItem } from '../../select'

export default defineComponent({
  components: {
    Dropdown,
    DropdownItem,
    DropdownHeader,
    Radio,
  },
  props: {
    schema: {
      type    : Object as PropType<FilterSelect>,
      required: true,
    },
    options: {
      type   : Array as PropType<string[] | SelectItem[]>,
      default: () => ([]),
    },
    modelValue: {
      type: [
        String,
        Number,
        Boolean,
        Array,
        Object,
        Date,
      ],
      default: undefined,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup (props) {
    const items  = useOptionsProp(props)
    const isOpen = ref(false)

    const model = useVModel(props)

    const selected = computed(() => {
      return items.value.find((item) => {
        return isEqual(item.value, model.value)
      })
    })

    function close () {
      isOpen.value = false
    }

    return {
      model,
      items,
      isOpen,
      selected,
      close,
    }
  },
})
</script>
