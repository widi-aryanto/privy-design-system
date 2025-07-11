<template>
  <div
    v-if="show"
    data-testid="banner"
    :class="classNames"
    :style="styleBg">
    <div
      v-if="!noIcon"
      class="banner__icon"
      data-testid="banner-icon"
      :class="{ 'banner__icon--custom': $slots.icon }">
      <slot name="icon">
        <component
          :is="icon"
          v-if="icon" />
      </slot>
    </div>
    <div class="banner__body">
      <slot :close="close" />
    </div>
    <div
      v-if="dismissable"
      data-testid="banner-close"
      class="banner__close"
      @click="close()">
      <IconClose />
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconInfo from '@privyid/persona-icon/vue/information-circle-solid/20.vue'
import IconDanger from '@privyid/persona-icon/vue/exclamation-triangle-solid/20.vue'
import IconWarning from '@privyid/persona-icon/vue/exclamation-circle-solid/20.vue'
import IconClose from '@privyid/persona-icon/vue/close/16.vue'
import type {
  PropType,
  StyleValue,
  VNode,
} from 'vue'
import { ref, computed } from 'vue'
import type { StyleVariant } from '.'

const BannerIcons = {
  danger : IconDanger,
  info   : IconInfo,
  warning: IconWarning,
}

const props = defineProps({
  variant: {
    type   : String as PropType<StyleVariant>,
    default: 'info',
  },
  dismissable: {
    type   : Boolean,
    default: true,
  },
  noIcon: {
    type   : Boolean,
    default: false,
  },
  backgroundUrl: {
    type   : String,
    default: undefined,
  },
  backgroundDarkUrl: {
    type   : String,
    default: undefined,
  },
  backgroundOverlay: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'dismissed': [],
}>()

const show = ref(true)

const classNames = computed(() => {
  const result: string[] = ['banner']

  if (props.variant)
    result.push(`banner--${props.variant}`)

  if (props.backgroundUrl)
    result.push('banner--custom-background')

  if (props.backgroundOverlay)
    result.push('banner--overlay')

  return result
})

const styleBg = computed<StyleValue>(() => {
  const result: StyleValue = {}

  if (props.backgroundUrl) {
    result['--p-banner-bg-image']      = `url("${props.backgroundUrl}")`
    result['--p-banner-bg-dark-image'] = props.backgroundDarkUrl
      ? `url("${props.backgroundDarkUrl}")`
      : `url("${props.backgroundUrl}")`
  }

  return result
})

const icon = computed(() => {
  return BannerIcons[props.variant]
})

function close (): void {
  show.value = false

  emit('dismissed')
}

defineExpose({ close })

defineSlots<{
  'icon'(): VNode[],
  'default'(props: { close: () => void }): VNode[],
}>()
</script>

<style lang="postcss">
.banner {
  --p-banner-bg-image: none;
  --p-banner-bg-dark-image: none;
  --p-banner-padding-x: theme(spacing.4);
  --p-banner-padding-y: theme(spacing.4);

  @apply px-[var(--p-banner-padding-x)] py-[var(--p-banner-padding-y)] flex space-x-2 rounded text-subtle;
  @apply dark:text-dark-subtle;

  a {
    &:not(.btn) {
      @apply underline decoration-solid text-info;
      @apply dark:text-dark-info;
    }
  }

  .subheading {
    &:not(&--md) {
      @apply mb-1;
    }

    @apply mb-2;
  }

  &&--custom-background {
    @apply bg-cover bg-no-repeat bg-center overflow-hidden bg-[image:var(--p-banner-bg-image)];
    @apply dark:bg-[image:var(--p-banner-bg-dark-image)]
  }

  &&--overlay {
    @apply after:content-[''] relative after:w-full after:h-full overflow-hidden after:absolute after:top-0 after:left-0 after:bg-base-black after:opacity-20;

    .banner__body,
    .banner__icon,
    .banner-close {
      @apply z-1;
    }
  }

  &&--info {
    @apply bg-ground;
    @apply dark:bg-dark-ground;

    .banner__icon {
      @apply text-info;
      @apply dark:text-dark-info;
    }
  }

  &&--danger {
    @apply bg-danger;
    @apply dark:bg-dark-danger;

    .banner__icon {
      @apply text-danger;
      @apply dark:text-dark-danger;
    }
  }

  &&--warning {
    @apply bg-warning;
    @apply dark:bg-dark-warning;

    .banner__icon {
      @apply text-warning;
      @apply dark:text-dark-warning;
    }
  }

  &__body {
    @apply grow text-sm;
  }

  &__icon,
  &__close {
    @apply shrink-0;
  }

  &__close {
    @apply cursor-pointer text-default/30 hover:text-default/50;
    @apply dark:text-dark-default/30 hover:dark:text-dark-default/50;
  }
}
</style>
