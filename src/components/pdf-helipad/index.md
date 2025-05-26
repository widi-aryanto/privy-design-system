---
title: PDF Helipad · Components
description: Add object to PDF Viewer with Drag'n'Drop
---

<script setup>
  import pPdfHelipad from './PdfHelipad.vue'
  import pPdfObject from '../pdf-object/PdfObject.vue'
  import pPdfObjectAddon from '../pdf-object/PdfObjectAddon.vue'
  import pPdfViewer from '../pdf-viewer/PdfViewer.vue'
  import pButton from '../button/Button.vue'
  import IconClose from '@privyid/persona-icon/vue/close/16.vue'
  import { reactive, ref } from 'vue'
  import { withBase } from 'vitepress'

  const FILE           = withBase('/assets/pdf/Calibrator-v3.pdf')
  const IMG_HELICOPTER = withBase('/assets/images/img-helicopter.svg')

  const objects = reactive([])
  const scale   = ref(1)

  function onLanded (item) {
    objects.push({
      _id   : Symbol('ObjectId'),
      page  : item?.page,
      x     : item?.x,
      y     : item?.y,
      width : item?.width,
      height: item?.height,
    })
  }

  function remove (index) {
    objects.splice(index, 1)
  }
</script>

# PDF Helipad

> Add object to PDF Viewer with Drag'n'Drop

## Usage

### Simple Usage

(Drag this to PDF Viewer)

<p-pdf-helipad :scale="scale" @landed="onLanded">
  <img class="w-full h-full bg-base-white" :src="IMG_HELICOPTER" />
</p-pdf-helipad>

<preview>
  <p-pdf-viewer :src="FILE" v-model:scale="scale">
    <p-pdf-object
      v-for="(object, i) in objects"
      :key="object._id"
      v-model:page="object.page"
      v-model:x="object.x"
      v-model:y="object.y"
      v-model:width="object.width"
      v-model:height="object.height">
      <img class="w-full h-full rounded" :src="IMG_HELICOPTER" />
      <p-pdf-object-addon>
        <p-button size="sm" icon color="danger" @click="remove(i)">
          <IconClose />
        </p-button>
      </p-pdf-object-addon>
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue
<template>
  <p-pdf-helipad :scale="scale" @landed="onLanded">
    <img class="w-full h-full bg-base-white" :src="IMG_HELICOPTER" />
  </p-pdf-helipad>

  <p-pdf-viewer :src="FILE" v-model:scale="scale">
    <p-pdf-object
      v-for="(object, i) in objects"
      :key="object._id"
      v-model:page="object.page"
      v-model:x="object.x"
      v-model:y="object.y"
      v-model:width="object.width"
      v-model:height="object.height">
      <img class="w-full h-full" :src="IMG_HELICOPTER" />
      <p-pdf-object-addon>
        <p-button size="sm" icon color="danger" @click="remove(i)">
          <IconClose />
        </p-button>
      </p-pdf-object-addon>
    </p-pdf-object>
  </p-pdf-viewer>
</template>

<script setup lang="ts">
  import FILE from '~/assets/Calibrator-v3.pdf?url'
  import IMG_HELICOPTER from '~/assets/helicopter.svg'
  import type { PdfHelipadResult } from '@privyid/persona/core'

  interface PdfObject {
    _id: symbol,
    page?: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  }

  const scale   = ref(1)
  const objects = reactive<PdfObject[]>([])

  function onLanded (item: PdfHelipadResult) {
    objects.push({
      _id   : Symbol('ObjectId'),
      page  : item.page,
      x     : item.x,
      y     : item.y,
      width : item.width,
      height: item.height,
    })
  }

  function remove (index: number) {
    objects.splice(index, 1)
  }
</script>
```

## Disabled State

<preview class="!bg-base-white">
  <p-pdf-helipad disabled>
    <img class="w-full h-full" :src="IMG_HELICOPTER" />
  </p-pdf-helipad>
</preview>

```vue
<template>
  <p-pdf-helipad disabled>
    <img class="w-full h-full" :src="IMG_HELICOPTER" />
  </p-pdf-helipad>
</template>
```

## API

### Props

| Props      |   Type    | Default | Description    |
|------------|:---------:|:-------:|----------------|
| `scale`    | `Number`  |   `1`   | Object scale   |
| `width`    | `Number`  |  `198`  | Object width   |
| `height`   | `Number`  |  `106`  | Object height  |
| `disabled` | `Boolean` | `false` | Disabled state |

### Slots

| Name      | Description                                   |
|-----------|-----------------------------------------------|
| `default` | Content to place inside the `<p-pdf-helipad>` |

### Events

| Name     | Arguments        | Description                       |
|----------|------------------|-----------------------------------|
| `landed` | PdfHelipadResult | Event object successfully dropped |
| `click`  | InteractEvent    | Event object clicked              |
