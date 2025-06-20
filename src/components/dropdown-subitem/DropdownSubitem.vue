<template>
  <Transition
    :name="transition"
    mode="out-in">
    <div
      :key="tree._level"
      data-testid="dropdown-subitem"
      class="dropdown__subitem">
      <template
        v-if="canBack">
        <DropdownItem
          key="btn-back"
          data-testid="dropdown-back"
          class="dropdown__subitem__btn dropdown__subitem__btn--back"
          @click.prevent="back()">
          <slot name="button-back">
            <IconBack class="dropdown__subitem__next" />
            <div class="dropdown__group-content" />
          </slot>
        </DropdownItem>
      </template>

      <template v-if="!isRoot">
        <DropdownItem
          key="btn-next"
          class="dropdown__subitem__btn"
          @click.prevent="handleOnClick">
          <div class="dropdown__subitem__content">
            <slot
              name="button-content"
              :next="next"
              :back="back">
              {{ text }}
            </slot>
          </div>
          <IconNext
            v-if="!noCaret"
            data-testid="dropdown-subitem-next"
            class="dropdown__subitem__next" />
        </DropdownItem>
      </template>

      <template v-else>
        <component
          :is="view" />
      </template>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import DropdownItem from '../dropdown/DropdownItem.vue'
import IconNext from '@privyid/persona-icon/vue/chevron-right/16.vue'
import IconBack from '@privyid/persona-icon/vue/arrow-left/16.vue'
import type { VNode } from 'vue'
import {
  inject,
  provide,
  ref,
  shallowRef,
  computed,
  watch,
} from 'vue'
import type { DropdownContext } from '.'
import { DROPDOWN_TREE } from '.'

defineProps({
  text: {
    type   : String,
    default: '',
  },
  noCaret: {
    type   : Boolean,
    default: false,
  },
})

const slots = defineSlots<{
  'button-back'(): VNode[],
  'button-content'(props: {
    next: () => void,
    back: () => void,
  }): VNode[],
}>()

const emit = defineEmits<{
  'click': [MouseEvent],
}>()

const context    = inject(DROPDOWN_TREE, undefined, true)
const transition = ref<'slide-left' | 'slide-right' | 'none'>('slide-left')

const isRoot = computed(() => {
  return context === undefined
})

const tree: DropdownContext['tree'] = context?.tree ?? shallowRef({
  _level: 0,
  slots : slots,
})

const next: DropdownContext['next'] = () => {
  tree.value = {
    _level: tree.value._level + 1,
    prev  : tree.value,
    slots : slots,
  }
}

const back: DropdownContext['back'] = () => {
  if (tree.value.prev)
    tree.value = tree.value.prev
}

const view = computed(() => {
  return tree.value.slots.default
})

const canBack = computed(() => {
  return Boolean(isRoot.value && tree.value.prev)
})

watch(tree, (value, oldValue) => {
  transition.value = value._level > oldValue._level
    ? 'slide-left'
    : 'slide-right'
})

if (isRoot.value) {
  provide(DROPDOWN_TREE, {
    tree,
    next,
    back,
  })
}

function reset () {
  if (isRoot.value) {
    tree.value = {
      prev  : undefined,
      _level: 0,
      slots : slots,
    }
  }
}

function handleOnClick () {
  const event = new MouseEvent('click')

  emit('click', event)

  if (!event.defaultPrevented)
    next()
}

defineExpose({
  reset,
  next,
  back,
})
</script>

<style lang="postcss">
.dropdown__subitem {
  &__btn {
    @apply flex items-center space-x-1;

    &--back {
      @apply shrink-0;
    }
  }

  &__content {
    @apply grow;
  }

  &__next,
  &__back {
    @apply shrink-0;
  }
}
</style>
