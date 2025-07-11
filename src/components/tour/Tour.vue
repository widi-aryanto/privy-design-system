<template>
  <div
    class="tour">
    <TransitionGroup name="fade">
      <TourHighlight
        v-if="isShow"
        :target="target" />
      <TourDialog
        v-if="isShow"
        ref="dialog"
        v-bind="config" />
    </transitiongroup>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
  shallowRef,
  watchEffect,
  onBeforeUnmount,
} from 'vue'
import TourDialog from './TourDialog.vue'
import TourHighlight from './TourHighlight.vue'
import {
  autoUpdate,
  computePosition,
  shift,
  autoPlacement,
  inline,
  offset,
  hide as hidden,
} from '@floating-ui/dom'

type TourDialogProps = Partial<InstanceType<typeof TourDialog>['$props']>

const isShow = ref(false)
const dialog = shallowRef<InstanceType<typeof TourDialog>>()
const target = shallowRef<HTMLElement>()
const config = shallowRef<TourDialogProps>()
const tour   = computed<HTMLElement>(() => dialog.value?.$el)

watchEffect((onCleanup) => {
  if (target.value && tour.value) {
    const cleanup = autoUpdate(target.value, tour.value, async () => {
      computePosition(target.value, tour.value, {
        strategy  : 'absolute',
        middleware: [
          autoPlacement({ altBoundary: true }),
          shift({ padding: 16 }),
          inline(),
          hidden(),
          offset(16),
        ],
      }).then(({ x, y, middlewareData }) => {
        if (tour.value) {
          tour.value.style.transform  = `translate3d(${x || 0}px, ${y || 0}px, 0)`
          tour.value.style.visibility = middlewareData.hide.referenceHidden
            ? 'hidden'
            : 'visible'
        }
      })
    }, { animationFrame: true })

    onCleanup(cleanup)
  }
})

watchEffect((onCleanup) => {
  if (isShow.value)
    document.body.classList.add('tour--active')

  onCleanup(() => {
    document.body.classList.remove('tour--active')
  })
})

function show (targetEl: HTMLElement, options: TourDialogProps) {
  target.value = targetEl
  config.value = options
  isShow.value = true
}

function hide () {
  isShow.value = false
}

onBeforeUnmount(() => {
  hide()
})

defineExpose({
  show,
  hide,
})
</script>

<style lang="postcss">
.tour {
  --p-tour-z-index: theme(zIndex.tour.DEFAULT);
  --p-tour-backdrop-z-index: theme(zIndex.tour.backdrop);

  & > &__dialog {
    @apply absolute top-0 left-0;
  }

  &--active {
    @apply overflow-hidden;
  }
}
</style>
