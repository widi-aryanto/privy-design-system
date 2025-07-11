<template>
  <div
    data-testid="dialog-footer"
    :class="footerClassNames">
    <Button
      v-if="cancelVisible"
      v-bind="cancelAttrs"
      :class="cancelClass"
      :color="cancelColor"
      :variant="cancelVariant"
      @click="cancel">
      {{ cancelText }}
    </Button>

    <Button
      v-if="confirmVisible"
      v-bind="confirmAttrs"
      :class="confirmClass"
      :color="confirmColor"
      :variant="confirmVariant"
      @click="confirm">
      {{ confirmText }}
    </Button>
  </div>
</template>

<script lang="ts" setup>
import Button from '../button/Button.vue'
import type { PropType } from 'vue'
import { computed } from 'vue'
import type {
  StyleVariant as FooterButtonStyleVariant,
  ColorVariant as FooterButtonColorVariant,
} from '../button'
import type { FooterAlignVariant } from '.'
import type { AdditionalAttr } from '../global/types'

const props = defineProps({
  align: {
    type   : String as PropType<FooterAlignVariant>,
    default: 'start',
  },
  cancelClass: {
    type   : String,
    default: undefined,
  },
  cancelVisible: {
    type   : Boolean,
    default: true,
  },
  cancelColor: {
    type   : String as PropType<FooterButtonColorVariant>,
    default: 'default',
  },
  cancelVariant: {
    type   : String as PropType<FooterButtonStyleVariant>,
    default: 'link',
  },
  cancelText: {
    type   : String,
    default: 'Cancel',
  },
  cancelAttrs: {
    type   : Object as PropType<AdditionalAttr>,
    default: undefined,
  },
  confirmClass: {
    type   : String,
    default: undefined,
  },
  confirmVisible: {
    type   : Boolean,
    default: true,
  },
  confirmColor: {
    type   : String as PropType<FooterButtonColorVariant>,
    default: 'info',
  },
  confirmVariant: {
    type   : String as PropType<FooterButtonStyleVariant>,
    default: 'solid',
  },
  confirmText: {
    type   : String,
    default: 'Confirm',
  },
  confirmAttrs: {
    type   : Object as PropType<AdditionalAttr>,
    default: undefined,
  },
})

const emit = defineEmits<{
  'cancel': [],
  'confirm': [],
}>()

const footerClassNames = computed(() => {
  const result: string[] = ['modal-dialog__footer']

  if (props.align)
    result.push(`modal-dialog__footer--align-${props.align}`)

  return result
})

function cancel (): void {
  emit('cancel')
}

function confirm (): void {
  emit('confirm')
}
</script>

<style lang="postcss">
.modal-dialog {
  &__footer {
    @apply flex items-center space-x-3;

    &--align {
      &-left,
      &-start {
        @apply justify-start;
      }

      &-right,
      &-end {
        @apply justify-end;
      }

      &-center {
        @apply justify-center;
      }
    }
  }
}
</style>
