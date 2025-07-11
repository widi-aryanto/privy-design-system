<template>
  <template v-if="ready">
    <component
      :is="view"
      :model-value="modelValue"
      :model-modifiers="modelModifiers"
      :width="width"
      :height="height"
      :color="color"
      :placeholder="placeholder"
      :reset-label="resetLabel"
      :open-draw-label="openDrawLabel"
      :close-draw-label="closeDrawLabel"
      @update:model-value="$emit('update:modelValue', $event)" />
  </template>
  <template v-else>
    <div class="signature-draw">
      <img
        class="signature-draw__fallback"
        :src="createSpinner(width, height)"
        alt="signature-draw">
    </div>
  </template>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import {
  computed,
  onMounted,
  ref,
} from 'vue'
import SignatureDrawMobile from './SignatureDrawMobile.vue'
import SignatureDrawDesktop from './SignatureDrawDesktop.vue'
import type { ModelModifier } from '../dropzone'
import { useMediaQuery } from '@vueuse/core'
import { createSpinner } from '../avatar/utils/create-image'

defineProps({
  modelValue: {
    type   : [String, globalThis.File],
    default: '',
  },
  modelModifiers: {
    type   : Object as PropType<ModelModifier>,
    default: () => ({} as ModelModifier),
  },
  width: {
    type   : Number,
    default: 430,
  },
  height: {
    type   : Number,
    default: 230,
  },
  color: {
    type   : String,
    default: '#000000',
  },
  placeholder: {
    type   : String,
    default: '',
  },
  resetLabel: {
    type   : String,
    default: 'Reset',
  },
  openDrawLabel: {
    type   : String,
    default: 'Click to Draw',
  },
  closeDrawLabel: {
    type   : String,
    default: 'Save',
  },
})

defineEmits<{
  'update:modelValue': [unknown],
}>()

const ready     = ref(false)
const isDesktop = useMediaQuery('(min-width: 768px)')
const view      = computed(() => {
  return isDesktop.value
    ? SignatureDrawDesktop
    : SignatureDrawMobile
})

onMounted(() => {
  ready.value = true
})
</script>

<style lang="postcss">
.signature-draw {
  &__fallback {
    @apply border rounded border-dashed;
  }
}
</style>
