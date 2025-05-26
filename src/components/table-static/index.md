---
title: Table Static · Components
description: Classic style Table.
---

<script setup>
  import pTableStatic from './TableStatic.vue'
  import pAvatar from '../avatar/Avatar.vue'
  import pLabel from '../label/Label.vue'
  import pHeading from '../heading/Heading.vue'
  import pText from '../text/Text.vue'
  import { defineTable } from '../table'
  import { ref } from 'vue'
  import { useTableQuery } from '.'

  const fields = defineTable([
    'id',
    'name',
    'status',
  ])

  const fields2 = defineTable([
    {
      key    : 'id',
      label  : 'PrivyID',
      width  : '1%',
      tdClass: 'text-center',
    },
    {
      key  : 'name',
      label: 'Name',
    },
    {
      key      : 'status',
      label    : 'Is Active',
      formatter: (value) => value ? 'Active': 'Deactive',
    },
  ])

  const items = ref([
    {
      id    : 1,
      name  : 'Tarjono',
      status: true,
    },
    {
      id    : 2,
      name  : 'Renatta',
      status: false,
    },
    {
      id    : 3,
      name  : 'Jonathan Smith',
      status: true,
    },
    {
      id    : 4,
      name  : 'Arch Brown',
      status: true,
    },
  ])

  const itemsB = ref([
    {
      id    : 1,
      name  : 'Tarjono',
      status: true,
    },
    {
      id    : 2,
      name  : 'Tarjono',
      status: false,
    },
    {
      id    : 3,
      name  : 'Tarjono',
      status: true,
    },
    {
      id         : 4,
      name       : 'Can\'t be selected',
      status     : true,
      _selectable: false,
    },
  ])

  const itemsC = ref([])

  const selected = ref([])
  const selectedA = ref([])

  const sortableFields = defineTable([
    {
      key: 'id',
    },
    {
      key: 'name',
    },
    {
      key     : 'gender',
      sortable: false,
    },
    {
      key: 'age',
    },
  ])

  const sortBy = ref({})

  const sortableItems = useTableQuery([
    {
      id    : 1,
      name  : 'David',
      gender: 'male',
      age   : 27,
    },
    {
      id    : 2,
      name  : 'Evan',
      gender: 'male',
      age   : 20,
    },
    {
      id    : 3,
      name  : 'Jane',
      gender: 'female',
      age   : 30,
    },
    {
      id    : 4,
      name  : 'Andi',
      gender: 'male',
      age   : 21,
    },
    {
      id    : 5,
      name  : 'Bella',
      gender: 'female',
      age   : 24,
    },
  ], { sortBy })
</script>

<style lang="postcss">
  .vp-doc .preview {
    table {
      @apply table my-0;
    }
  }
</style>

# Table Static

> Classic style Table.

## Usage

### Simple Usage
<preview class="flex-col space-y-2">
  <p-table-static :fields="fields" :items="items" />
</preview>

```vue
<template class="flex-col space-y-2">
  <p-table-static :fields="fields" :items="items" />
</template>

<script setup>
import { defineTable } from '@privyid/persona/core'

const fields = defineTable([
  'id',
  'name',
  'status',
])

const items = ref([
  {
    id    : 1,
    name  : 'Tarjono',
    status: true,
  },
  {
    id    : 2,
    name  : 'Tarjono',
    status: false,
  },
  {
    id    : 3,
    name  : 'Tarjono',
    status: true,
  },
  {
    id    : 4,
    name  : 'Tarjono',
    status: true,
  },
])
</script>
```

### Custom Label + Formatter

<preview class="flex-col space-y-2">
  <p-table-static :fields="fields2" :items="items" />
</preview>

```vue
<template class="flex-col space-y-2">
  <p-table-static :fields="fields" :items="items" />
</template>

<script setup>
import { defineTable } from '@privyid/persona'

const fields = defineTable([
  {
    key    : 'id',
    label  : 'PrivyID',
    width  : '1%',
    tdClass: 'text-center',
  },
  {
    key  : 'name',
    label: 'Name',
  },
  {
    key      : 'status',
    label    : 'Is Active',
    formatter: (value) => value ? 'Active': 'Deactive',
  },
])

const items = ref([
  {
    id    : 1,
    name  : 'Tarjono',
    status: true,
  },
  {
    id    : 2,
    name  : 'Tarjono',
    status: false,
  },
  {
    id    : 3,
    name  : 'Tarjono',
    status: true,
  },
  {
    id    : 4,
    name  : 'Tarjono',
    status: true,
  },
])
</script>
```

## Apperance

There are 2 variants: `table` and `card`, default is `table`

<preview class="flex-col space-y-2">
  <p-table-static :fields="fields" :items="items" apperance="card" />
</preview>

```vue
<template>
  <p-table-static :fields="fields" :items="items" apperance="card" />
</template>
```

## Hide Label Header

<preview class="flex-col space-y-2">
  <p-table-static :fields="fields" :items="items" no-label />
</preview>

```vue
<template>
  <p-table-static :fields="fields" :items="items" no-label />
</template>
```

## Selectable

Add prop `selectable` to enable checkbox inside table

<preview class="flex-col space-y-2">
  <p-table-static selectable :fields="fields" :items="items" />
</preview>

```vue
<template>
  <p-table-static selectable :fields="fields" :items="items" />
</template>
```

### Binding v-model

The result of selected item is bind inside `v-model`

<preview class="flex-col space-y-2">
  <p-table-static v-model="selected" selectable :fields="fields" :items="items" />
</preview>

```vue
<template>
  <p-table-static v-model="selected" selectable :fields="fields" :items="items" />
</template>
```

**Selected :**

<pre><code>{{ selected }}</code></pre>

### Disabling some item

set `_selectable` to `false` in your items to disabled item from selection.

<preview class="flex-col space-y-2">
  <p-table-static v-model="selectedA" selectable :fields="fields" :items="itemsB" />
</preview>

```vue
<template>
  <p-table-static v-model="selectedA" selectable :fields="fields" :items="items" />
</template>

<script setup>
  const items = ref([
    {
      id    : 1,
      name  : 'Tarjono',
      status: true,
    },
    {
      id    : 2,
      name  : 'Tarjono',
      status: false,
    },
    {
      id    : 3,
      name  : 'Tarjono',
      status: true,
    },
    {
      id         : 4,
      name       : 'Can\'t be selected',
      status     : true,
      _selectable: false,
    },
  ])
</script>
```

## Draggable

add prop `draggable` to enable drag-to-sort.

<preview class="flex-col space-y-2">
  <p-table-static :fields="fields" v-model:items="items" draggable />
</preview>

```vue
<template>
  <p-table-static :fields="fields" v-model:items="items" draggable />
</template>
```

## Sortable

to support sortable field, you need to add prop `sortable` and when define table fields, add `sortable` with `true` value on field item

<preview class="flex-col space-y-2">
  <p-table-static
    v-model:sort-by="sortBy"
    :fields="sortableFields"
    :items="sortableItems"
    sortable />
</preview>

```vue
<template>
  <p-table-static
    v-model:sort-by="sortBy"
    :fields="sortableFields"
    :items="sortableItems"
    sortable />
</template>

<script setup lang="ts">
  import { useTableQuery } from '@privyid/persona/core'

  const fields = defineTable([
    { key: 'id' },
    {
      key     : 'name',
      sortable: true,
    },
    {
      key     : 'gender',
      sortable: true,
    },
    {
      key     : 'age',
      sortable: true,
    },
  ])

  const items = ref([
    {
      id    : 1,
      name  : 'David',
      gender: 'male',
      age   : 27,
    },
    {
      id    : 2,
      name  : 'Evan',
      gender: 'male',
      age   : 20,
    },
    {
      id    : 3,
      name  : 'Jane',
      gender: 'female',
      age   : 30,
    },
    {
      id    : 4,
      name  : 'Andi',
      gender: 'male',
      age   : 21,
    },
    {
      id    : 5,
      name  : 'Bella',
      gender: 'female',
      age   : 24,
    },
  ])

  const sortBy = ref({})

  // use `useTableQuery` to simulate backend sorting
  const sortableItems = useTableQuery(items, { sortBy })
</script>
```

## Customization Slot

### Custom Cell

<preview class="flex-col space-y-2">
  <p-table-static :fields="fields" :items="items">
    <template #cell(name)="{ item }">
      <div class="flex items-center space-x-2">
        <p-avatar size="sm" :name="item.name" />
        <span>{{ item.name }}</span>
      </div>
    </template>
    <template #cell(status)="{ item }">
      <p-label variant="light" :color="item.status ? 'success' : 'default'" size="sm">
        {{ item.status ? 'active' : 'inactive' }}
      </p-label>
    </template>
  </p-table-static>
</preview>

```vue
<template>
  <p-table-static :fields="fields" :items="items">
    <template #cell(name)="{ item }">
      <div class="flex items-center space-x-2">
        <p-avatar size="sm" :name="item.name" />
        <span>{{ item.name }}</span>
      </div>
    </template>
    <template #cell(status)="{ item }">
      <p-label
        variant="light" :color="item.status ? 'success' : 'default'"
        size="sm">
        {{ item.status ? 'active' : 'inactive' }}
      </p-label>
    </template>
  </p-table-static>
</template>
```

### Custom Head

<preview class="flex-col space-y-2">
  <p-table-static :fields="fields" :items="items">
    <template #head(status)="{ label }">
      {{ label }}<p-label size="xs" class="ml-1">new</p-label>
    </template>
  </p-table-static>
</preview>

```vue
<template>
  <p-table-static :fields="fields" :items="items">
    <template #head(status)="{ label }">
      {{ label }}<p-label size="xs" class="ml-1">new</p-label>
    </template>
  </p-table-static>
</template>
```

### Custom Empty

Table has default empty state, but it's be able to customize by own via slot `empty`.

<preview class="flex-col space-y-2">
  <p-table-static :fields="fields" :items="itemsC">
    <template #empty>
      <div class="flex flex-col items-center justify-center">
        <img src="/assets/images/img-table-empty-records.svg">
        <p-heading element="h6" class="mt-12">Uh oh, no data</p-heading>
        <p-text variant="body2" class="py-4 text-subtle dark:text-dark-subtle">We're empty-handed!</p-text>
      </div>
    </template>
  </p-table-static>
</preview>

```vue
<template>
  <p-table-static :fields="fields" :items="items">
    <template #empty>
      <div class="flex flex-col items-center justify-center">
        <img src="/assets/images/img-table-empty-records.svg">
        <p-heading element="h6" class="mt-12">Uh oh, no data</p-heading>
        <p-text variant="body2" class="py-4 text-subtle dark:text-dark-subtle">
          We're empty-handed!
        </p-text>
      </div>
    </template>
  </p-table-static>
</template>
```

## Variables

Table use local CSS variables for enhanced real-time customization.

```sass
--p-table-bg: theme(backgroundColor.default.DEFAULT);
--p-table-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
--p-table-header-bg: var(--p-table-bg);
--p-table-header-bg-dark: var(--p-table-bg-dark);
--p-table-border: theme(borderColor.default.DEFAULT);
--p-table-border-dark: theme(borderColor.dark.default.DEFAULT);
```

### Example

<preview class="flex-col space-y-2">
  <p-table-static
    :fields="fields"
    :items="items"
    style="
      --p-table-header-bg: #F3F3F3;
      --p-table-header-bg-dark: #0D1117;
    " />
</preview>

```vue
<template>
  <p-table-static
    :fields="fields"
    :items="items"
    style="
      --p-table-header-bg: #F3F3F3;
      --p-table-header-bg-dark: #0D1117;
    " />
</template>
```


## API

### Props

| Props         |   Type    |            Default             | Description                                             |
|---------------|:---------:|:------------------------------:|---------------------------------------------------------|
| `apperance`   | `String`  |            `table`             | Table apperance variant, valid value is `table`, `card` |
| `items`       |  `Array`  |              `-`               | Table items                                             |
| `fields`      |  `Array`  |              `-`               | Table fields                                            |
| `selectable`  | `Boolean` |            `false`             | Enable checkbox                                         |
| `draggable`   | `Boolean` |            `false`             | Enable draggable                                        |
| `v-model`     |  `Array`  |              `-`               | `v-model` for selected value                            |
| `empty-label` | `String`  | `There are no records to show` | Table empty state label                                 |
| `no-label`    | `Boolean` |            `false`             | Hide headerlabel                                        |
| `table-class` | `String`  |              `-`               | Add class to table element                              |
| `tr-class`    | `String`  |              `-`               | Add class to table row element                          |
| `scrollable`  | `Boolean` |             `true`             | Enable scroll when table overflow                       |
| `sortable`    | `Boolean` |            `false`             | Enable sort items by field name                         |
| `sortBy`      | `Object`  |              `-`               | v-model:sort-by binding                                 |

In props `fields` contain

| Props        |       Type       | Description                                                                                                                  |
|--------------|:----------------:|------------------------------------------------------------------------------------------------------------------------------|
| `key`        |     `String`     | Field's key                                                                                                                  |
| `label?`     |     `String`     | Field's Label                                                                                                                |
| `width?`     |     `Number`     | Field's width in percent                                                                                                     |
| `formatter?` |    `Function`    | Field's formatter, it receives `value` and `item` params and returning string value                                          |
| `thClass?`   | `HTMLAttributes` | `HTMLAttributes` of `class` to use in table column cell                                                                      |
| `tdClass?`   | `HTMLAttributes` | `HTMLAttributes` of `class` to use in table head cell                                                                        |
| `sortable?`  |    `Boolean`     | Enable field sorting. Eventhough table have `sortable` prop, but the field not set `sortable`, sort function not able to use |


### Slots

| Name         | Description                 |
|--------------|-----------------------------|
| `cell(:key)` | Content for checked label   |
| `head(:key)` | Content for unchecked label |
| `empty`      | Content for empty state     |
| `row`        | Custom render for row       |

### Events

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3" class="text-center">There no props here</td>
    </tr>
  </tbody>
</table>

## See Also

- [Table Flex](../table-flex/)
- [Table (deprecated)](../table/)
