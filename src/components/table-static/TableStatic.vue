<template>
  <TableStaticRoot
    data-testid="table-static"
    :scrollable="scrollable"
    :class="classNames"
    :table-class="tableClass">
    <thead
      v-if="!noLabel"
      class="table-static__headers">
      <tr :class="trClass">
        <th
          v-if="draggable"
          class="table-static__header table-static__drag" />
        <th
          v-if="selectable"
          class="table-static__header table-static__checkbox">
          <Checkbox
            v-model="selectAll"
            data-testid="table-static-select-all"
            :indeterminate="indeterminate" />
        </th>
        <th
          v-for="field in fields"
          :key="field.key"
          class="table-static__header"
          data-testid="table-static-header"
          :style="field.width ? { width: withUnit(field.width) } : {}"
          :class="[field.thClass, { 'table-static__header--sortable': isSortable(field) }]"
          :data-header="field.key"
          @click="setSortField(field)">
          <slot
            :name="`head(${field.key})`"
            :label="field.label"
            :field="field"
            :sort="getSortField(field)">
            <span class="table-static__header-label">
              {{ field.label }}
              <TableStaticSort
                v-if="isSortable(field)"
                :active="getSortField(field)" />
            </span>
          </slot>
        </th>
      </tr>
    </thead>
    <Draggable
      v-if="Array.isArray(items) && items.length > 0"
      v-model="rows"
      class="table-static__body"
      handle=".table-static__drag"
      item-key="_key"
      tag="tbody"
      :disabled="!draggable">
      <template #item="{ element, index }">
        <tr
          class="table-static__row"
          :class="trClass"
          data-role="row">
          <slot
            name="row"
            :item="element"
            :index="index">
            <td
              v-if="draggable"
              class="table-static__cell table-static__drag"
              data-testid="table-static-drag-handle">
              <IconDrag />
            </td>
            <td
              v-if="selectable"
              class="table-static__cell table-static__checkbox">
              <Checkbox
                v-model="model"
                data-testid="table-static-select"
                :value="withoutKey(element)"
                :disabled="element._selectable === false" />
            </td>
            <td
              v-for="field in fields"
              :key="field.key"
              class="table-static__cell"
              data-testid="table-static-cell"
              :class="field.tdClass"
              :data-cell="field.key">
              <slot
                :name="`cell(${field.key})`"
                :index="index"
                :item="element">
                {{ field.formatter(element[field.key], element) }}
              </slot>
            </td>
          </slot>
        </tr>
      </template>
    </Draggable>
    <tbody
      v-else
      class="table-static__body">
      <tr
        class="table-static__row">
        <td
          :colspan="selectable ? fields.length+1 : fields.length"
          data-testid="table-static-empty"
          class="table-static__cell table-static__cell--empty datatable__state-empty">
          <slot name="empty">
            <span class="flex items-center justify-center text-subtle dark:text-dark-subtle">
              {{ emptyLabel }}
            </span>
          </slot>
        </td>
      </tr>
    </tbody>
  </TableStaticRoot>
</template>

<script lang="ts" setup generic="T">
import type {
  HTMLAttributes,
  PropType,
  VNode,
} from 'vue'
import {
  ref,
  watch,
  computed,
} from 'vue'
import type {
  ApperanceVariant,
  TableField,
  KeyType,
} from '../table'
import {
  withKey,
  withoutKey,
  withUnit,
} from '../table'
import Checkbox from '../checkbox/Checkbox.vue'
import TableStaticRoot from './TableStaticRoot.vue'
import { useVModel } from '../input'
import IconDrag from '@privyid/persona-icon/vue/draggable/20.vue'
import Draggable from 'vuedraggable'
import type { SortValue } from '.'
import TableStaticSort from './TableStaticSort.vue'

const props = defineProps({
  apperance: {
    type   : String as PropType<ApperanceVariant>,
    default: 'table',
  },
  modelValue: {
    type   : Array as PropType<T[]>,
    default: () => ([]),
  },
  fields: {
    type   : Array as PropType<TableField<T>[]>,
    default: () => ([]),
  },
  items: {
    type   : Array as PropType<T[]>,
    default: () => ([]),
  },
  selectable: {
    type   : Boolean,
    default: false,
  },
  draggable: {
    type   : Boolean,
    default: false,
  },
  emptyLabel: {
    type   : String,
    default: 'There are no records to show',
  },
  noLabel: {
    type   : Boolean,
    default: false,
  },
  tableClass: {
    type: [
      String,
      Array,
      Object,
    ] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },
  trClass: {
    type: [
      String,
      Array,
      Object,
    ] as PropType<HTMLAttributes['class']>,
    default: undefined,
  },
  scrollable: {
    type   : Boolean,
    default: true,
  },
  sortable: {
    type   : [Boolean, String] as PropType<boolean | 'single' | 'multiple'>,
    default: false,
  },
  sortBy: {
    type   : Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
})

const model       = useVModel(props)
const localSortBy = ref(props.sortBy)
const emit        = defineEmits<{
  'update:modelValue': [T[]],
  'update:items': [T[]],
  'update:sortBy': [Record<string, SortValue>],
  'sort': [Record<string, SortValue>],
}>()

const rows = computed<T[]>({
  get () {
    return props.items.map((item) => {
      return withKey(item as Record<string, unknown>) as T
    })
  },
  set (items) {
    emit('update:items', items)
  },
})

const classNames = computed(() => {
  const result: string[] = ['table-static']

  if (props.apperance)
    result.push(`table-static--${props.apperance}`)

  if (props.selectable)
    result.push('table-static--selectable')

  if (props.draggable)
    result.push('table-static--draggable')

  if (props.noLabel)
    result.push('table-static--no-label')

  if (props.scrollable)
    result.push('table-static--scrollable')

  return result
})

const selectableRows = computed(() => {
  return props.items.filter((item) => (item as Record<string, unknown>)._selectable !== false)
})

const selectAll = computed({
  get () {
    if (props.items.length === 0)
      return false

    return model.value.length === selectableRows.value.length
  },
  set (value) {
    if (selectAll.value !== value) {
      model.value = value
        ? selectableRows.value.map((item) => withoutKey(item as Record<string, unknown>)) as T[]
        : []
    }
  },
})

const indeterminate = computed(() => {
  return model.value.length > 0
    && model.value.length < selectableRows.value.length
})

watch(() => props.sortBy, (value) => {
  localSortBy.value = value
})

function isSortable (field: TableField<T>) {
  return props.sortable && field.sortable !== false
}

function getSortField (field: TableField<T>): SortValue {
  return localSortBy.value[field.key as string]
}

function setSortField (field: TableField<T>) {
  if (isSortable(field)) {
    const oldValue: SortValue = getSortField(field)
    const newValue: SortValue = oldValue === 'asc' ? 'desc' : (oldValue === 'desc' ? undefined : 'asc')

    const value = props.sortable === 'multiple'
      ? { ...localSortBy.value, [field.key]: newValue }
      : { [field.key]: newValue }

    localSortBy.value = value

    emit('update:sortBy', value)
    emit('sort', value)
  }
}

defineSlots<{
  'empty'(): VNode[],
  'row'(props: { index: number, item: T }): VNode[],
  [K: `cell(${string})`]:(props: { index: number }) => VNode[],
  [K: `head(${string})`]:(props: { field: TableField<T>, label: string, sort?: 'asc' | 'desc' }) => VNode[],
} & {
  [K in KeyType<T> as `cell(${K})`]:(props: { item: T, index: number }) => VNode[]
} & {
  [K in KeyType<T> as `head(${K})`]:(props: { field: TableField<T>, label: string, sort?: 'asc' | 'desc' }) => VNode[]
}>()
</script>

<style lang="postcss">
.table-static {
  --p-table-bg: theme(backgroundColor.default.DEFAULT);
  --p-table-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
  --p-table-header-bg: var(--p-table-bg);
  --p-table-header-bg-dark: var(--p-table-bg-dark);
  --p-table-border: theme(borderColor.default.DEFAULT);
  --p-table-border-dark: theme(borderColor.dark.default.DEFAULT);

  @apply w-full;

  &__table {
    @apply table;
  }

  &:not(&--scrollable) {
    &.table-static__table {
      @apply max-w-full;
    }

   & .table-static__row > .table-static__cell {
      @apply whitespace-pre-wrap;
    }
  }

  &:where(&--scrollable) {
    .table-static__table {
      @apply min-w-full;
    }

    & .table-static__row > .table-static__cell {
      @apply whitespace-pre;
    }
  }

  &__headers {
    @apply pt-4 bg-[color:var(--p-table-bg)];
    @apply dark:bg-[color:var(--p-table-bg-dark)];

    .table-static__header {
      @apply px-3 text-xs border-x-0;

      &--sortable {
        @apply cursor-pointer select-none;
      }

      &.table-static__drag,
      &.table-static__checkbox {
        @apply w-[1%];
      }

      &-label {
        @apply inline-flex items-center;
      }

      &-sort {
        @apply flex flex-col flex-shrink-0 items-center justify-center ml-1;
        @apply text-muted;
        @apply dark:text-dark-muted;

        &[active="asc"] {
          > .table-static__header-sort-down {
            @apply text-default;
            @apply dark:text-dark-default;
          }
        }

        &[active="desc"] {
          > .table-static__header-sort-up {
            @apply text-default;
            @apply dark:text-dark-default;
          }
        }
      }

      &-sort-down {
        @apply -mt-2;
      }
    }

    + .table-static__body {
      @apply pt-2;
    }
  }

  & &__row > &__cell {
    @apply ml-2 py-4 px-3 text-sm text-default;
    @apply dark:text-dark-default;

    &.table-static__drag {
      @apply cursor-grabbing md:mx-3;
    }
  }

  & &__headers &__header {
    @apply bg-[color:var(--p-table-header-bg)];
    @apply dark:bg-[color:var(--p-table-header-bg-dark)];
  }

  & &__body > &__row {
    @apply border-t border-[color:var(--p-table-border)] bg-[color:var(--p-table-bg)];
    @apply dark:border-[color:var(--p-table-border-dark)] dark:bg-[color:var(--p-table-bg-dark)];
  }

  &--no-label {
    .table-static__body > .table-static__row:first-child {
      @apply border-t-0;
    }
  }

  &--table {
    .table-static__row .table-static__cell,
    .table-static__headers .table-static__header {
      @apply border-0;
    }

    .table-static__row .table-static__cell {
      @apply align-top;
    }
  }

  &--card {
    .table-static__table {
      @apply border-separate border-spacing-y-2;
    }

    .table-static__row .table-static__cell,
    .table-static__headers .table-static__header {
      @apply border-x-0 border-y;

      &:first-child {
        @apply rounded-l border-l;
      }

      &:last-child {
        @apply rounded-r border-r;
      }
    }
  }

  &--scrollable {
    @apply overflow-auto overscroll-contain;
  }
}
</style>
