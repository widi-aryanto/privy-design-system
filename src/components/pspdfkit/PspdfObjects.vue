<template>
  <div
    ref="root"
    class="pdf-objects"
    data-testid="pdf-objects">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  provide,
} from 'vue'
import { PDF_OBJECTS_CONTEXT } from '../pdf-object/'
import { usePdfContext } from '../pdf-viewer'
import useDrop from './utils/use-drop'

const objects    = new Map()
const root       = ref<HTMLDivElement>()
const pdfContext = usePdfContext()

useDrop(root)

provide(PDF_OBJECTS_CONTEXT, {
  ...pdfContext,
  objects,
  root,
})
</script>
