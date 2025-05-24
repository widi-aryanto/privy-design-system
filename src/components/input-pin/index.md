---
title: Input Pin · Components
description: One at time input form.
---

<script setup>
  import pInputPin from './InputPin.vue'
  import { ref } from 'vue'

  const result = ref('')
</script>

# Input Pin

> One at time input form.

## Usage

### Simple Usage

<preview>
  <p-input-pin />
</preview>

```vue
<template>
  <p-input-pin />
</template>
```

## Number of Input

You can set how many input digit do you want with prop `length`, default is `5`.

<preview>
  <p-input-pin length="3" />
</preview>

```vue
<template>
  <p-input-pin length="3" />
</template>
```

## Sizing

Input has 4 variants size: `xs`, `sm`, `md`, `lg`, default is `md`.

<preview class="flex-col space-y-3">
  <p-input-pin size="xs" />
  <p-input-pin size="sm" />
  <p-input-pin size="md" />
  <p-input-pin size="lg" />
</preview>

```vue
<template>
  <p-input-pin size="xs" />
  <p-input-pin size="sm" />
  <p-input-pin size="md" />
  <p-input-pin size="lg" />
</template>
```

## Disabled State

<preview>
  <p-input-pin disabled />
</preview>

```vue
<template>
  <p-input-pin disabled />
</template>
```

## Readonly State
<preview>
  <p-input-pin readonly />
</preview>

```vue
<template>
  <p-input-pin readonly />
</template>
```

## Error State
<preview>
  <p-input-pin error />
</preview>

```vue
<template>
  <p-input-pin error />
</template>
```

## Accept Character

You can filter what characters are allowed to be input using the prop `accept`. The value can be RegExp, or using available preset.

<preview class="flex-col space-y-4">
  <p-input-pin accept="numeric" />
</preview>

```vue
<template>
  <p-input-pin accept="numeric" />
</template>
```

👉 See [Available Preset](../input/#available-preset) for more information

## Binding v-model

Like other input, input value can be binding with `v-model`.

<preview>
  <p-input-pin v-model="result" />
</preview>

**result:**

<code class="truncate whitespace-pre">{{ result || '-' }}</code>

```vue
<template>
  <p-input-pin v-model="result" />
</template>
```

## API

### Props

| Props        |   Type    | Default | Description                                             |
|--------------|:---------:|:-------:|---------------------------------------------------------|
| `length`     | `Number`  |   `5`   | Number of input                                         |
| `size`       | `String`  |  `md`   | Input size variant, valid value: `xs`, `sm`, `md`, `lg` |
| `disabled`   | `Boolean` | `false` | Disabled state                                          |
| `readonly`   | `Boolean` | `false` | Readonly state                                          |
| `error`      | `Boolean` | `false` | Error state                                             |
| `accept`     | `String`  |   `-`   | Whitelist character can be inputted                     |
| `modelValue` | `String`  |   `-`   | v-model value                                           |

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

| Name     | Arguments | Description              |
|----------|-----------|--------------------------|
| `change` | `String`  | Event when value changed |

## See Also

- [Form Group](/components/form-group/)
- [Input Group](/components/input-group/)
