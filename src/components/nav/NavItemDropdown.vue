<template>
  <li
    data-testid="nav-item-dropdown"
    class="nav__item nav__item--dropdown">
    <Dropdown
      v-model="model"
      :text="text"
      :icon="icon"
      :variant="variant"
      :size="size"
      :placement="placement"
      :no-caret="noCaret"
      :divider="divider"
      :menu-class="menuClass"
      :menu-size="menuSize">
      <template #button-content>
        <slot name="button-content">
          {{ text }}
        </slot>
      </template>
      <slot />
    </Dropdown>
  </li>
</template>

<script lang="ts" setup>
import type { PropType, VNode } from 'vue'
import Dropdown from '../dropdown/Dropdown.vue'
import type { Placement } from '@floating-ui/core'
import type {
  SizeVariant,
  StyleVariant,
} from '../button'
import { useVModel } from '../input'
import type { MenuSizeVariant } from '../dropdown'

const props = defineProps({
  modelValue: {
    type   : Boolean,
    default: false,
  },
  text: {
    type   : String,
    default: '',
  },
  icon: {
    type   : Boolean,
    default: false,
  },
  size: {
    type   : String as PropType<SizeVariant>,
    default: 'md',
  },
  variant: {
    type   : String as PropType<StyleVariant>,
    default: 'ghost',
  },
  noCaret: {
    type   : Boolean,
    default: false,
  },
  placement: {
    type   : String as PropType<Placement>,
    default: 'bottom-end',
  },
  menuClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  menuSize: {
    type   : String as PropType<MenuSizeVariant>,
    default: 'sm',
  },
  divider: {
    type   : Boolean,
    default: false,
  },
})

defineEmits<{
  'update:modelValue': [boolean],
}>()

const model = useVModel(props)

defineSlots<{
  'default'(): VNode[],
  'button-content'(): VNode[],
}>()
</script>

<style lang="postcss">
.nav {
  &__item {
    &--dropdown {
      @apply ml-auto relative;

      .dropdown {
        &__menu {
          .dropdown__item {
            @apply px-3;
          }
        }
      }
    }
  }

  &--fill {
    .nav__item {
      &--dropdown {
        @apply text-right;
      }
    }
  }
}
</style>
