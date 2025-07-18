<template>
  <div
    ref="root"
    class="dropdown"
    :class="[{ 'dropdown--open': isOpen, 'dropdown--no-caret' : noCaret }, classNames]"
    :style="{ '--p-dropdown-root-width': `${width}px` }"
    data-testid="dropdown">
    <slot
      name="activator"
      :toggle="toggle"
      :open="open"
      :close="close"
      :is-open="isOpen">
      <Button
        data-testid="dropdown-activator"
        class="dropdown__activator"
        :class="buttonClass"
        :variant="variant"
        :color="color"
        :size="size"
        :icon="icon"
        :pill="pill"
        :disabled="disabled"
        @click.prevent="toggle">
        <slot name="button-content">
          {{ text }}
        </slot>
        <IconArrow
          v-if="!noCaret"
          class="dropdown__caret"
          data-testid="dropdown-caret" />
      </Button>
    </slot>

    <Transition
      name="fade"
      :css="!noAnimation"
      @after-enter="$emit('show')"
      @after-leave="$emit('hide')">
      <div
        v-show="isOpen && !isHidden"
        ref="menu"
        data-testid="dropdown-menu"
        class="dropdown__menu"
        :class="[menuClass, containerSize]">
        <div
          v-if="$slots.prepend"
          class="drowdown__menu__prepend">
          <slot name="prepend" />
        </div>
        <div
          ref="menuBody"
          class="dropdown__menu__body">
          <DropdownGroup
            ref="wizard"
            class="dropdown__menu__container">
            <slot />
          </DropdownGroup>
        </div>
        <div
          v-if="$slots.append"
          class="drowdown__menu__append">
          <slot name="append" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
  VNode,
} from 'vue'
import {
  provide,
  watch,
  toRef,
  watchEffect,
  computed,
  ref,
} from 'vue'
import {
  onClickOutside,
  onKeyStroke,
  useElementSize,
} from '@vueuse/core'
import Button from '../button/Button.vue'
import DropdownGroup from '../dropdown-subitem/DropdownSubitem.vue'
import { useFocus } from './utils/use-focus'
import type { Placement } from '@floating-ui/dom'
import {
  autoUpdate,
  computePosition,
  offset,
  flip,
  shift,
  hide,
} from '@floating-ui/dom'
import { useVModel } from '../input'
import IconArrow from '@privyid/persona-icon/vue/chevron-down/20.vue'
import type {
  StyleVariant,
  ColorVariant,
  SizeVariant,
} from '../button'
import type {
  MenuSizeVariant,
} from '.'
import { DROPDOWN_CONTEXT } from '.'

type DropdownSubitemElement = InstanceType<typeof DropdownGroup> & HTMLDivElement

defineOptions({
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
})

const props = defineProps({
  modelValue: {
    type   : Boolean,
    default: false,
  },
  text: {
    type   : String,
    default: '',
  },
  placement: {
    type   : String as PropType<Placement>,
    default: 'bottom-start',
  },
  variant: {
    type   : String as PropType<StyleVariant>,
    default: 'solid',
  },
  color: {
    type   : String as PropType<ColorVariant>,
    default: 'default',
  },
  size: {
    type   : String as PropType<SizeVariant>,
    default: 'md',
  },
  icon: {
    type   : Boolean,
    default: false,
  },
  pill: {
    type   : Boolean,
    default: false,
  },
  disabled: {
    type   : Boolean,
    default: false,
  },
  noCaret: {
    type   : Boolean,
    default: false,
  },
  divider: {
    type   : Boolean,
    default: false,
  },
  menuClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  buttonClass: {
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
  /**
   * For testing only
   */
  noAnimation: {
    type   : Boolean,
    default: false,
  },
})

defineEmits<{
  'show': [],
  'hide': [],
  'update:modelValue': [boolean],
}>()

const slots = defineSlots<{
  'activator'(props: {
    isOpen: boolean,
    open: () => void,
    close: () => void,
    toggle: () => void,
  }): VNode[],
  'button-content': () => VNode[],
  'prepend': () => VNode[],
  'append': () => VNode[],
}>()

const root     = ref<HTMLDivElement>()
const menu     = ref<HTMLDivElement>()
const menuBody = ref<HTMLDivElement>()
const wizard   = ref<DropdownSubitemElement>()

const placement = toRef(props, 'placement')
const isOpen    = useVModel(props)
const isHidden  = ref(false)

const { next: nextFocus, prev: prevFocus } = useFocus(menuBody)
const { width }                            = useElementSize(root)

const classNames = computed(() => {
  const result: string[] = ['']

  if (props.divider)
    result.push('dropdown--divider')

  if (props.menuSize)
    result.push(`dropdown--menu-${props.menuSize}`)

  return result
})

const containerSize = computed(() => {
  const result: string[] = ['']

  if (slots.prepend)
    result.push('dropdown__menu--has-prepend')

  if (slots.append)
    result.push('dropdown__menu--has-append')

  return result
})

function toggle () {
  if (!props.disabled) {
    if (isOpen.value)
      close()
    else
      open()
  }
}

function open () {
  if (!props.disabled)
    isOpen.value = true
}

function close () {
  if (!props.disabled)
    isOpen.value = false
}

onClickOutside(menu, () => {
  if (isOpen.value) {
    // Add little delay too prevent race condition with v-model changing
    setTimeout(() => {
      close()
    })
  }
}, { ignore: [root] })

onKeyStroke('Escape', (event) => {
  const target = event.target as HTMLElement

  if (isOpen.value) {
    close()

    /* In HappyDOM, blur() is undefined, which shouldn't happen in Real Browser */
    /* c8 ignore next 2 */
    if (typeof target.blur === 'function')
      target.blur()
  }
})

onKeyStroke(['ArrowUp'], (event) => {
  if (isOpen.value) {
    event.preventDefault()

    prevFocus()
  }
})

onKeyStroke(['ArrowDown'], (event) => {
  if (isOpen.value) {
    event.preventDefault()

    nextFocus()
  }
})

onKeyStroke(['Tab'], (event) => {
  if (isOpen.value) {
    event.preventDefault()

    if (event.shiftKey)
      prevFocus()
    else
      nextFocus()
  }
})

watchEffect((onCleanup) => {
  if (root.value && menu.value) {
    const cleanup = autoUpdate(root.value, menu.value, () => {
      computePosition(root.value, menu.value, {
        strategy  : 'absolute',
        placement : placement.value,
        middleware: [
          flip(),
          shift(),
          offset(8),
          hide(),
        ],
      }).then(({ x, y, placement, middlewareData }) => {
        if (menu.value) {
          menu.value.dataset.popperPlacement = placement

          menu.value.style.left = `${x || 0}px`
          menu.value.style.top  = `${y || 0}px`

          isHidden.value = middlewareData.hide.referenceHidden
        }
      })
    }, { animationFrame: true })

    onCleanup(cleanup)
  }
}, { flush: 'post' })

watch(isOpen, (value) => {
  if (!value && wizard.value)
    wizard.value.reset()
}, { immediate: true })

provide(DROPDOWN_CONTEXT, {
  isOpen,
  toggle,
  open,
  close,
})

defineExpose({
  menuBody,
  menu,
  root,
  open,
  close,
})
</script>

<style lang="postcss">
.dropdown {
  --p-dropdown-z-index: theme(zIndex.dropdown);
  --p-dropdown-size-xl: 36rem; /* 576px */
  --p-dropdown-size-lg: 30rem; /* 480px */
  --p-dropdown-size-md: 20rem; /* 320px */
  --p-dropdown-size-sm: 15rem; /* 240px */
  --p-dropdown-max-height: theme(spacing.64);

  @apply inline-flex;

  &--menu-xl {
    --p-dropdown-size: var(--p-dropdown-size-xl);
  }

  &--menu-lg {
    --p-dropdown-size: var(--p-dropdown-size-lg);
  }

  &--menu-md {
    --p-dropdown-size: var(--p-dropdown-size-md);
  }

  &--menu-sm {
    --p-dropdown-size: var(--p-dropdown-size-sm);
  }

  &--menu-auto {
    --p-dropdown-size: auto;
  }

  &--menu-full {
    --p-dropdown-size: var(--p-dropdown-root-width);
  }

  &__menu {
    @apply border rounded bg-default z-[var(--p-dropdown-z-index)] border-default shadow-xl absolute flex flex-col overflow-hidden w-[var(--p-dropdown-size)];
    @apply dark:bg-dark-default dark:border-dark-default;

    &__prepend,
    &__append {
      @apply shrink-0;
    }

    &__body {
      @apply max-h-[var(--p-dropdown-max-height)] overflow-x-hidden overflow-y-auto grow;
    }

    &:not(&--has-prepend) &__container {
      > .dropdown__item {
        &:first-child,
        .dropdown__subitem:first-child & {
          @apply rounded-t-sm;
        }
      }
    }

    &:not(&--has-append) &__container {
      > .dropdown__item {
        &:last-child,
        .dropdown__subitem:last-child & {
          @apply rounded-b-sm;
        }
      }
    }
  }

  &__activator > &__caret {
    @apply self-center -mr-[3px];
  }

  &&--divider {
    .dropdown {
      &__menu {
        :where(.checkbox, .radio, .dropdown__item) {
          @apply border-b border-solid border-b-subtle-alpha last:border-b-0;
          @apply dark:border-b-dark-subtle-alpha;
        }
      }
    }
  }
}
</style>
