---
title: Input Password · Components
description: Base password-input form.
---

<script setup>
  import pInputPassword from "./InputPassword.vue"
  import { ref } from 'vue'

  const result = ref()
</script>

# Input Password

> Base password-input form.

## Usage

### Simple Usage

<preview class="flex-col space-y-3">
  <p-input-password class="test" />
</preview>

```vue
<template>
  <p-input-password />
</template>
```

## Sizing

<preview class="flex-col space-y-3">
  <p-input-password size="xs" />
  <p-input-password size="sm" />
  <p-input-password size="md" />
  <p-input-password size="lg" />
</preview>

```vue
<template>
  <p-input-password size="xs" />
  <p-input-password size="sm" />
  <p-input-password size="md" />
  <p-input-password size="lg" />
</template>
```

## Disabled State

<preview class="flex-col space-y-3">
  <p-input-password disabled />
</preview>

```vue
<template>
  <p-input-password disabled />
</template>
```

## Readonly State

<preview class="flex-col space-y-3">
  <p-input-password readonly />
</preview>

```vue
<template>
  <p-input-password readonly />
</template>
```

## Error State

<preview class="flex-col space-y-3">
  <p-input-password error />
</preview>

```vue
<template>
  <p-input-password error />
</template>
```

## Clearable

<preview>
  <p-input-password clearable />
</preview>

```vue
<template>
  <p-input-password clearable />
</template>
```

## Accept Character

You can filter what characters are allowed to be input using the prop `accept`. The value can be RegExp, or using available preset.

<preview class="flex-col space-y-4">
  <p-input-password accept="0-9" placeholder="Numeric Only (Manual)" />
  <p-input-password accept="numeric" placeholder="Numeric Only (using Preset)" />
</preview>

```vue
<template>
  <p-input-password accept="0-9" placeholder="Numeric Only (Manual)" />
  <p-input-password accept="numeric" placeholder="Numeric Only (using Preset)" />
</template>
```

👉 See [Available Preset](../input/#available-preset) for more information

## Binding v-model

Like other input, input value can be binding with `v-model`.

<preview>
  <p-input-password v-model="result" />
</preview>

**result:**

<pre class="truncate"><code>{{ result || '-' }}</code></pre>

```vue
<template>
  <p-input-password v-model="result" />
</template>
```

## API

### Props

| Props         |   Type    | Default | Description                                             |
|---------------|:---------:|:-------:|---------------------------------------------------------|
| `size`        | `String`  |  `md`   | Input size variant, valid value: `xs`, `sm`, `md`, `lg` |
| `placeholder` | `String`  |   `-`   | Input placeholder                                       |
| `disabled`    | `Boolean` | `false` | Disabled state                                          |
| `readonly`    | `Boolean` | `false` | Readonly state                                          |
| `error`       | `Boolean` | `false` | Error state                                             |
| `clearable`   | `Boolean` | `false` | Enable clear button                                     |
| `accept`      | `String`  |   `-`   | Whitelist character can be inputted                     |
| `modelValue`  | `String`  |   `-`   | v-model value                                           |
| `container-class` | `String` or `Array` or `Object`  |      `-`       | CSS class to add in the input password container  |

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

| Name     | Arguments | Description                     |
|----------|-----------|---------------------------------|
| `change` | `String`  | Event when value changed        |
| `clear`  | `-`       | Event when clear button clicked |


## See Also

- [Input](/components/input/)
- [Input Group](/components/input-group/)
- [Strengthbar](/components/strengthbar/)
