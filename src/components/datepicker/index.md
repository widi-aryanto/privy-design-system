---
title: Datepicker · Components
description: Base button component
---

<script setup>
  import pDatepicker from './Datepicker.vue'
  import Banner from '../banner/Banner.vue'
  import { ref } from 'vue'
  import { startOfYear, endOfYear, endOfMonth } from 'date-fns'

  const value  = ref()
  const result = ref()
  const start  = ref()
  const end    = ref()

  const min = startOfYear(new Date())
  const max = endOfYear(new Date())

  const thisMonth = endOfMonth(new Date())
</script>

# Datepicker

> Base input type date

## Usage

### Simple Usage

<preview>
  <p-datepicker clearable />
</preview>

```vue
<template>
  <p-datepicker />
</template>
```

## Sizing
Datepicker has 4 variants size: `xs`, `sm`, `md`, `lg`, default is `md`.

<preview class="flex-col space-y-3">
  <p-datepicker size="xs" />
  <p-datepicker size="sm" />
  <p-datepicker size="md" />
  <p-datepicker size="lg" />
</preview>

```vue
<template>
  <p-datepicker size="xs" />
  <p-datepicker size="sm" />
  <p-datepicker size="md" />
  <p-datepicker size="lg" />
</template>
```

## Placement

You can customize the datepicker position using the `placement` prop.
This flexibility ensures that the datepicker fits seamlessly within your user interface.
The placement prop determines where the datepicker will appear in relation to the input field.

<preview>
  <p-datepicker placement="left" />
</preview>

```vue
<template>
  <p-datepicker placement="left" />
</template>
```

### Combining Placement

You can further refine the placement by combining it with a suffix to adjust vertical/horizontal alignment.
This suffix is useful for aligning the datepicker with the start (`*-start`) or end (`*-end`) of the input field.

<preview class="flex-col space-y-6">
  <p-datepicker placement="bottom-end" />
</preview>

```vue
<template>
  <p-datepicker placement="bottom-end" />
</template>
```

## Placeholder

You can set input placeholder via `placeholder` props

<preview>
  <p-datepicker placeholder="Pick A Date" />
</preview>

```vue
<template>
  <p-datepicker placeholder="Pick A Date" />
</template>
```

## Display Format

You can date via prop `format`. default is `dd/MM/yyyy`

<Banner><strong>Please note</strong>, this component internally use <b>date-fns</b> for date formatting. The format tokens differ from Moment.js. See: <a href="https://date-fns.org/docs/format" target="_blank">date-fns</a></Banner>

<preview>
  <p-datepicker
    v-model="value"
    format="yyyy-MM-dd" />
</preview>

```vue
<template>
  <p-datepicker
    v-model="value"
    format="yyyy-MM-dd" />
</template>
```

## Limiting Date

You can limit the date via `min` or `max` props

<preview>
  <p-datepicker
    :min="min"
    :max="max" />
</preview>

```vue
<template>
  <!-- Limit this year only -->
  <p-datepicker
    :min="min"
    :max="max" />
</template>

<script lang="ts" setup>
  import { startOfYear, endOfYear } from 'date-fns'

  const min = startOfYear(new Date())
  const max = endOfYear(new Date())
</script>
```

## Mode Variant

There 3 available mode: `date` , `month`, `year`. default is `date`. it will limit user input the date.

for example, mode `month` make user can only select the month, but can't select what spesific date.

<preview class="flex-col items-center space-y-2">
  <p-datepicker
    format="dd MMM yyyy"
    mode="date" />
  <p-datepicker
    format="MMM yyyy"
    mode="month" />
  <p-datepicker
    format="yyyy"
    mode="year" />
</preview>

```vue
<template>
  <p-datepicker
    format="dd MMM yyyy"
    mode="date" />
  <p-datepicker
    format="MMM yyyy"
    mode="month" />
  <p-datepicker
    format="yyyy"
    mode="year" />
</template>
```

## Range Picker

Set prop `range` to `true` to enable date range picker mode.

<preview>
  <p-datepicker range />
</preview>

```vue
<template>
  <p-datepicker range />
</template>
```

### Min and Max Range

You can limit minimal and maximal date range to pick using prop `min-range` and `max-range`.

<preview>
  <p-datepicker range min-range="3D" max-range="7D" />
</preview>

```vue
<template>
  <!-- Limit min 3 days and max 7 days -->
  <p-datepicker range min-range="3D" max-range="7D" />
</template>
```

👉 See [here](/components/calendar/#min-and-max-range-format) to more information about range format value.

## Disabled State

<preview class="flex-col items-center space-y-2">
  <p-datepicker disabled />
</preview>

```vue
<template>
  <p-datepicker disabled />
</template>
```

## Readonly state
<preview>
  <p-datepicker readonly />
</preview>

```vue
<template>
  <p-datepicker readonly />
</template>
```

## Error state
<preview>
  <p-datepicker error />
</preview>

```vue
<template>
  <p-datepicker error />
</template>
```

## Clearable

Add clear button to input with prop `clearable`.

<preview class="flex-col space-y-3">
  <p-datepicker clearable />
</preview>

```vue
<template>
  <p-datepicker clearable />
</template>
```

## Binding v-model

<preview>
  <p-datepicker v-model="value" />
</preview>

```vue
<template>
  <p-datepicker v-vmodel="value" />
</template>
```

**Result :**

<pre class="max-w-full truncate"><code>{{ value ?? '-' }}</code></pre>

### v-model in range mode

There are 2 ways to use v-model in `range` mode.

#### 1. Using basic v-model

You can use basic `v-model` to handle date range input, The value will be tuple of Date, `[start, end]`

<preview class="flex-col">
  <p-datepicker v-model="result" range />
</preview>

**result:**

<pre class="truncate"><code>{{ result ?? '-' }}</code></pre>

```vue
<template>
  <p-datepicker v-model="result" range />
</template>
```

#### 2. using v-model:start and v-model:end

You can specific binding the value using `v-model:start` or `v-model:end`

<preview class="flex-col">
  <p-datepicker
    v-model:start="start"
    v-model:end="end"
    range />
</preview>

**start:**

<pre class="truncate"><code>{{ start ?? '-' }}</code></pre>

**end:**

<pre class="truncate"><code>{{ end ?? '-' }}</code></pre>

```vue
<template>
  <p-datepicker
    v-model:start="start"
    v-model:end="end"
    range />
</template>
```

## API

### Props

| Props             |              Type               |   Default    | Description                                             |
|-------------------|:-------------------------------:|:------------:|---------------------------------------------------------|
| `modelValue`      |             `Date`              |     `-`      | `v-model` value                                         |
| `size`            |            `String`             |     `md`     | Input size variant, valid value: `xs`, `sm`, `md`, `lg` |
| `start`           |             `Date`              |     `-`      | `v-model:start` value                                   |
| `end`             |             `Date`              |     `-`      | `v-model:end` value                                     |
| `placeholder`     |            `String`             |     `-`      | Input placeholder                                       |
| `format`          |            `String`             | `dd/MM/yyyy` | Date format                                             |
| `disabled`        |            `Boolean`            |   `false`    | Disabled state                                          |
| `readonly`        |            `Boolean`            |   `false`    | Readonly state                                          |
| `error`           |            `Boolean`            |   `false`    | Error state                                             |
| `clearable`       |            `Boolean`            |   `false`    | Enable clear                                            |
| `mode`            |            `String`             |     `-`      | Calendar mode valid value: `date`, `month`, `year`      |
| `min`             |             `Date`              |     `-`      | Minimum date can be selected                            |
| `max`             |             `Date`              |     `-`      | Maximum date can be selected                            |
| `range`           |            `Boolean`            |   `false`    | Enable range picker mode                                |
| `minRange`        |            `String`             |     `-`      | Minimum range date should be selected                   |
| `maxRange`        |            `String`             |     `-`      | Maximum range date should be selected                   |
| `container-class` | `String` or `Array` or `Object` |     `-`      | CSS class to add in the input container                 |

### Slots

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2" class="text-center">There no slots here</td>
    </tr>
  </tbody>
</table>

### Events

| Name     | Arguments          | Description              |
|----------|--------------------|--------------------------|
| `change` | Native Date object | Event when date selected |

## See Also

- [Calendar](/components/calendar/)
