<template>
  <Steps
    v-bind="$attrs"
    :model-value="modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)">
    <Step
      v-for="(item, i) in steps"
      :key="i"
      v-bind="item.props"
      data-testid="wizard-step">
      <template #default="slotData">
        <template v-if="item.children?.default">
          <component
            :is="item.children.default"
            v-bind="slotData" />
        </template>
      </template>
    </step>
  </Steps>
</template>

<script lang="ts" setup>
import type {
  Slots,
  VNode,
} from 'vue'
import { computed } from 'vue'
import { findAllChildren } from '../utils/vnode'
import Steps from '../steps/Steps.vue'
import Step from '../steps/Step.vue'

defineProps({
  modelValue: {
    type   : Number,
    default: 1,
  },
})

defineEmits<{
  'update:modelValue': [number],
}>()

const slots = defineSlots<{
  'default'(): VNode[],
}>()

const steps = computed(() => {
  return findAllChildren(slots.default(), 'WizardStep') as Array<VNode & { children: Slots }>
})
</script>
