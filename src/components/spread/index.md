---
title: Spread · Components
description: Sub-component for creating spread animation.
---

<script setup>
  import pSpread from './Spread.vue'
  import pCheckbox from '../checkbox/Checkbox.vue'
  import IconFile from '@privyid/persona-icon/vue/document-filled/32.vue'
  import { ref } from 'vue'

  const active = ref(false)
</script>

# Spread

> Sub-component for creating spread animation.

## Usage

### Simple Usage

<preview class="flex-col space-y-4">
  <p-checkbox v-model="active">Toggle Active</p-checkbox>
  <p-spread :active="active">
    <IconFile />
  </p-spread>
</preview>

```vue
<template>
  <p-spread :active="active">
    <IconFile />
  </p-spread>
</template>

<script setup>
  import IconFile from '@privyid/persona-icon/vue/document-filled/32.vue'
</script>
```

See [Dropzone](/components/dropzone/) for more example.

## API

### Props

| Props    |   Type    | Default | Description             |
|----------|:---------:|:-------:|-------------------------|
| `active` | `Boolean` | `false` | Enable spread animation |

### Slots

| Name      | Description          |
|-----------|----------------------|
| `default` | Content to spreading |

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
      <td colspan="3" class="text-center">There no event here</td>
    </tr>
  </tbody>
</table>

