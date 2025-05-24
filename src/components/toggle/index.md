---
title: Toggle · Components
description: Base input toggle.
---

<script setup>
  import pToggle from "./Toggle.vue"
  import IconLight from '@privyid/persona-icon/vue/sun/16.vue'
  import IconDark from '@privyid/persona-icon/vue/moon/16.vue'
  import { ref } from 'vue'
  import { useDark } from '@vueuse/core'

  const modelA   = ref(false)
  const modelB   = ref('off')
  const isDark   = useDark({ storageKey: 'vitepress-theme-appearance' })
  const selected = ref([])
</script>

# Toggle

> Base input toggle.

## Usage

### Simple Usage
<preview>
  <p-toggle>Text</p-toggle>
</preview>

```vue
<template>
  <p-toggle>Text</p-toggle>
</template>
```

### With Icon

<preview>
  <p-toggle>
    <template #checked>
      <svg width="8" height="8" viewBox="0 0 2 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="8" rx="1" fill="white" /></svg>
    </template>
    <template #unchecked>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3" stroke="white" stroke-width="2"/></svg>
    </template>
    <template #default>
      Text
    </template>
  </p-toggle>
</preview>

```vue
<template>
  <p-toggle>
    <template #checked>
      <svg width="8" height="8" viewBox="0 0 2 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="8" rx="1" fill="white" /></svg>
    </template>
    <template #unchecked>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3" stroke="white" stroke-width="2"/></svg>
    </template>
    <template #default>
      Text
    </template>
  </p-toggle>
</template>
```

## Type variant

There available 2 type variants: `pill` and `flat`. default is `pill`

<preview class="flex-col items-center space-y-3">
  <p-toggle variant="pill">Pill</p-toggle>
  <p-toggle variant="flat">Flat</p-toggle>
</preview>

```vue
<template>
  <p-toggle variant="pill">Pill</p-toggle>
  <p-toggle variant="flat">Flat</p-toggle>
</template>
```

## Custom label

You can customize toggle label with `checked-label` and `unchecked-label`

<preview class="flex-col items-center space-y-3">
  <p-toggle variant="pill" checked-label="Y" unchecked-label="N">Text</p-toggle>
  <p-toggle variant="flat" checked-label="PM" unchecked-label="AM">Text</p-toggle>
</preview>

```vue
<template>
  <p-toggle variant="pill" checked-label="Y" unchecked-label="N">Text</p-toggle>
  <p-toggle variant="flat" checked-label="PM" unchecked-label="AM">Text</p-toggle>
</template>
```

You can also use `checked` and `unchecked` slot to customize the label, it allow you to use non-text label like an **icon**

<preview class="flex-col items-center space-y-3">
  <p-toggle v-model="isDark">
    <template #checked>
      <IconDark />
    </template>
    <template #unchecked>
      <IconLight />
    </template>
    <template #default>
      Dark Mode
    </template>
  </p-toggle>
</preview>

```vue
<template>
  <p-toggle>
    <template #checked>
      <IconDark />
    </template>
    <template #unchecked>
      <IconLight />
    </template>
    <template #default>
      Dark Mode
    </template>
  </p-toggle>
</template>

<script setup>
  import IconLight from '@privyid/persona-icon/vue/sun/16.vue'
  import IconDark from '@privyid/persona-icon/vue/moon/16.vue'
</script>
```

## Hide label

You can hide toggle label with `no-label` prop

<preview class="flex-col items-center space-y-3">
  <p-toggle variant="pill" no-label>Text</p-toggle>
  <p-toggle variant="flat" no-label>Text</p-toggle>
</preview>

```vue
<template>
  <p-toggle variant="pill" no-label>Text</p-toggle>
  <p-toggle variant="flat" no-label>Text</p-toggle>
</template>
```

## Disabled state

<preview class="flex-col items-center space-y-3">
  <p-toggle variant="pill" disabled>Pill</p-toggle>
  <p-toggle variant="flat" disabled>Flat</p-toggle>
</preview>

```vue
<template>
  <p-toggle variant="pill" disabled>Pill</p-toggle>
  <p-toggle variant="flat" disabled>Flat</p-toggle>
</template>
```

## Readonly state

<preview class="flex-col items-center space-y-3">
  <p-toggle readonly>Readonly False</p-toggle>
  <p-toggle readonly checked>Readonly True</p-toggle>
</preview>

```vue
<template>
  <p-toggle readonly>Readonly False</p-toggle>
  <p-toggle readonly checked>Readonly True</p-toggle>
</template>
```

## Binding v-model

<preview class="flex-col items-center space-y-3">
  <p-toggle v-model="modelA">Text</p-toggle>
</preview>

**Result :**

<pre><code>{{ modelA }}</code></pre>

```vue
<template>
  <p-toggle v-model="modelA">Text</p-toggle>
</template>
```

### Custom v-model value

By default, value of toggle is always `Boolean`, but you can change it with `value` and `unchecked-value`.

<preview class="flex-col items-center space-y-3">
  <p-toggle v-model="modelB" value="on" unchecked-value="off">Lamp</p-toggle>
</preview>

**Result :**

<pre><code>{{ modelB }}</code></pre>

```vue
<template>
  <p-toggle
    v-model="model"
    value="on"
    unchecked-value="off">
    Active
  </p-toggle>
</template>
```

### Array v-model

Similar to [Checkbox](/components/checkbox/index), if v-model **state** is an *array* it will append the value instead of replacing it.

<preview class="flex-col items-center">
  <div class="flex flex-col space-y-3">
    <p-toggle v-model="selected" value="apple">Apple</p-toggle>
    <p-toggle v-model="selected" value="grape">Grape</p-toggle>
    <p-toggle v-model="selected" value="pineapple">Pineapple</p-toggle>
  </div>
</preview>

**Selected :**

<pre class="whitespace-normal"><code>{{ selected }}</code></pre>

```vue
<template>
  <div class="flex flex-col space-y-3">
    <p-toggle v-model="selected" value="apple">Apple</p-toggle>
    <p-toggle v-model="selected" value="grape">Grape</p-toggle>
    <p-toggle v-model="selected" value="pineapple">Pineapple</p-toggle>
  </div>
</template>
```

## API

### Props

| Props            |   Type    | Default | Description                                                              |
|------------------|:---------:|:-------:|--------------------------------------------------------------------------|
| `variant`        | `String`  | `pill`  | Toggle style variant, valid value is `pill`, `flat`                      |
| `checked`        | `Boolean` | `false` | Checked condition. if it is `true`, Toggle will be checked on first time |
| `value`          |   `Any`   | `true`  | Checked value                                                            |
| `uncheckedValue` |   `Any`   | `false` | Unchecked value                                                          |
| `checkedLabel`   | `String`  |  `on`   | Label when Toggle is checked                                             |
| `uncheckedLabel` | `String`  |  `off`  | Label when Toggle is unchecked                                           |
| `noLabel`        | `Boolean` | `false` | Hide label                                                               |
| `disabled`       | `Boolean` | `false` | Disabled state                                                           |
| `readonly`       | `Boolean` | `false` | Readonly state                                                           |
| `modelValue`     |   `Any`   |   `-`   | `v-model` value                                                          |
| `switchClass`    | `String` or `Array` or `Object`  |      `-`       | CSS class to add in the toggle switch      |

### Slots

| Name        | Description                 |
|-------------|-----------------------------|
| `default`   | Content to place in toggle  |
| `checked`   | Content for checked label   |
| `unchecked` | Content for unchecked label |

### Events

| Name     | Arguments | Description              |
|----------|-----------|--------------------------|
| `change` | Boolean   | Event when value changed |

## See Also
- [Checkbox](/components/checkbox/index)
- [Radio](/components/radio/index)
