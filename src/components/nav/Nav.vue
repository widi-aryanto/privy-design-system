<template>
  <ul
    data-testid="nav"
    :class="classNames">
    <li
      class="nav__title">
      <span
        class="nav__title__item"
        :class="[ (!title && titleActionLabel) ? 'justify-end' : 'justify-between' ]">
        <Caption
          v-if="title"
          weight="bold"
          transform="capitalize">
          {{ title }}
        </Caption>
        <Text
          v-if="titleActionLabel && titleActionUrl"
          data-testid="nav-action"
          variant="caption"
          :href="titleActionUrl">
          {{ titleActionLabel }}
        </Text>
      </span>
    </li>
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { AlignVariant, StyleVariant } from '.'
import Caption from '../caption/Caption.vue'
import Text from '../text/Text.vue'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps({
  fill: {
    type   : Boolean,
    default: false,
  },
  justified: {
    type   : Boolean,
    default: false,
  },
  variant: {
    type   : String as PropType<StyleVariant>,
    default: 'pills',
  },
  align: {
    type   : String as PropType<AlignVariant>,
    default: 'left',
  },
  vertical: {
    type   : Boolean,
    default: false,
  },
  title: {
    type   : String,
    default: undefined,
  },
  titleActionLabel: {
    type   : [String, Object] as PropType<RouteLocationRaw>,
    default: undefined,
  },
  titleActionUrl: {
    type   : [String, Object] as PropType<RouteLocationRaw>,
    default: undefined,
  },
  condensed: {
    type   : Boolean,
    default: false,
  },
})

const classNames = computed(() => {
  const result: string[] = ['nav']

  if (props.fill)
    result.push('nav--fill')

  if (props.justified)
    result.push('nav--justified')

  if (props.variant)
    result.push(`nav--${props.variant}`)

  if (props.align)
    result.push(`nav--align-${props.align}`)

  if (props.vertical)
    result.push('nav--vertical')

  if (props.title || props.titleActionLabel)
    result.push('nav--has-title')

  if (props.condensed)
    result.push('nav--condensed')

  return result
})
</script>

<style lang="postcss">
/**
* Component Name: Navigation
* Component URI : https://www.figma.com/file/tVQNwXeQkMtZlX1x3qjJu8/B-A-S-E-%2F-Style-Guide?node-id=262%3A2160
* Date Created  : Aug 01, 2022
* Last Update   : Aug 03, 2022
*/
.nav {
  --p-border-nav-link-active: theme(borderColor.brand.accent.DEFAULT);
  --p-border-dark-nav-link-active: theme(borderColor.dark.brand.accent.DEFAULT);

  --p-bg-nav-tabs-active: theme(backgroundColor.default.DEFAULT);
  --p-bg-dark-nav-tabs-active: theme(backgroundColor.dark.default.DEFAULT);

  --p-bg-nav-pills-active: theme(backgroundColor.default.alpha);
  --p-bg-dark-nav-pills-active: theme(backgroundColor.default.alpha);

  /**
  * Default navigation
  * is horizontal
  */
  @apply pl-2 list-none flex flex-wrap mb-0;

  &:not(.nav--vertical):not(.navbar__nav) .nav__item {
    @apply first:ml-2 mr-2 last:mr-0;
  }

  &__item > &__link {
    @apply no-underline transition-colors duration-150 ease-out;
  }

  & > &__item {
    .nav__link {
      @apply text-subtle;
      @apply dark:text-dark-subtle;

      &:hover,
      &--active,
      &.router-link-active:not(.nav__link--exact),
      &.router-link-exact-active.nav__link--exact {
        @apply text-default;
        @apply dark:text-dark-default;
      }

      &--disabled {
        @apply text-muted hover:text-muted focus:text-muted active:text-muted;
        @apply dark:text-dark-muted hover:dark:text-dark-muted focus:dark:text-dark-muted active:dark:text-dark-muted;
      }
    }
  }

  /*
  * Navigation variant:
  * Lines
  */
  &&--lines {
    @apply text-center;

    &:not(.nav--vertical) {
      .nav__link {
        @apply border-x-0;
      }
    }
    /**
    * Set active state
    * with border-bottom
    */
    .nav__link {
      &--active,
      &.router-link-active:not(.nav__link--exact),
      &.router-link-exact-active.nav__link--exact {
        &:not(.nav__link--disabled) {
          @apply border-b-[color:var(--p-border-nav-link-active)];
          @apply dark:border-b-[color:var(--p-border-dark-nav-link-active)];
        }
      }
    }

    /**
    * Active state of Lines
    * in vertical
    */
    &.nav--vertical {
      .nav__link {
        @apply border-y-0;

        &--active,
        &.router-link-active:not(.nav__link--exact),
        &.router-link-exact-active.nav__link--exact {
          &:not(.nav__link--disabled) {
            @apply border-r border-r-[color:var(--p-border-nav-link-active)] rounded-tr-none;
            @apply dark:border-r-[color:var(--p-border-dark-nav-link-active)];
          }
        }
      }

      &.nav--align-right {
        .nav__link {
          @apply border-r-0;

          &--active,
          &.router-link-active:not(.nav__link--exact),
          &.router-link-exact-active.nav__link--exact {
            &:not(.nav__link--disabled) {
              @apply border-l border-l-[color:var(--p-border-nav-link-active)] rounded-tl-none;
              @apply dark:border-l-[color:var(--p-border-dark-nav-link-active)];
            }
          }
        }
      }
    }
  }

  /*
  * Navigation variant:
  * Tabs
  */
  &&--tabs {
    /**
    * Set active state
    * with bordered item
    * except in bottom-side
    */
    .nav__link {
      &--active,
      &.router-link-active:not(.nav__link--exact),
      &.router-link-exact-active.nav__link--exact {
        &:not(.nav__link--disabled) {
          @apply border-t-default border-x-default bg-[color:var(--p-bg-nav-tabs-active)];
          @apply dark:border-t-dark-default dark:border-x-dark-default dark:bg-[color:var(--p-bg-dark-nav-tabs-active)];
        }
      }
    }

    /**
    * Active state of Tabs
    * in vertical
    */
    &.nav--vertical {
      .nav__link {
        &--active,
        &.router-link-active:not(.nav__link--exact),
        &.router-link-exact-active.nav__link--exact {
          &:not(.nav__link--disabled) {
            @apply border-l-default border-y-default border-r-transparent bg-[color:var(--p-bg-nav-tabs-active)] rounded-l rounded-r-none;
            @apply dark:border-l-dark-default dark:border-y-dark-default dark:border-r-transparent dark:bg-[color:var(--p-bg-dark-nav-tabs-active)];
          }
        }
      }

      &.nav--align-right {
        .nav__link {
          &--active,
          &.router-link-active:not(.nav__link--exact),
          &.router-link-exact-active.nav__link--exact {
            &:not(.nav__link--disabled) {
              @apply border-r-default border-y-default border-l-transparent rounded-r rounded-l-none;
              @apply dark:border-r-dark-default dark:border-y-dark-default dark:border-l-transparent;
            }
          }
        }
      }
    }
  }

  /*
  * Navigation variant:
  * Pills
  */
  &&--pills {
    @apply pb-2;

    /**
    * Set active state
    * with background
    */
    .nav__link {
      &--active,
      &.router-link-active:not(.nav__link--exact),
      &.router-link-exact-active.nav__link--exact {
        &:not(.nav__link--disabled) {
          @apply bg-[color:var(--p-bg-nav-pills-active)] rounded-b;
          @apply dark:bg-[color:var(--p-bg-dark-nav-pills-active)];
        }
      }
    }

    /**
    * Remove background of
    * active state in
    * condensed mode
    */
    &.nav--condensed {
      .nav__link {
        &--active,
        &.router-link-active:not(.nav__link--exact),
        &.router-link-exact-active.nav__link--exact {
          @apply bg-transparent;
          @apply dark:bg-transparent;
        }
      }
    }

    &.nav--vertical {
      @apply pb-0 pr-2;
    }
  }

  /*
  * Navigation alignment
  */
  &&--align {
    &-left {
      @apply justify-start;
    }

    &-right {
      @apply justify-end;
    }

    &-center {
      @apply justify-center;
    }
  }

  /*
  * Navigation fullwidth
  */
  &&--fill,
  &&--justified {
    .nav__item {
      .nav__link {
        @apply w-full;
      }
    }
  }

  /**
  * Proportionately fill
  */
  &&--fill {
    .nav {
      &__item {
        @apply flex-auto;
      }
    }
  }

  /**
  * Same width every item
  */
  &&--justified {
    .nav {
      &__item {
        @apply basis-0 grow;
      }
    }
  }

  /**
  * Vertical Navigation
  */
  &&--vertical {
    @apply pt-2 flex-col;

    .nav {
      @apply flex-col;

      .nav__item {
        @apply first:mx-0;
      }

      &__link {
        @apply mb-0;
      }

      &__title {
        @apply left-3;
      }
    }

    &.nav--align-right {
      @apply pl-0 ml-auto;

      .nav {
        &__link {
          @apply -ml-[1px] mr-0;
        }
      }
    }
  }

  /**
  * Navigation Title
  */
  &&--has-title {
    @apply relative pt-7 mt-5;
  }

  &__title {
    @apply absolute left-5 top-0 text-base w-[calc(100%-1.75rem)]; /* 1.25rem + 0.75rem (padding) */

    &__item {
      @apply flex items-center w-full space-x-2;
    }

    .caption {
      @apply text-subtle;
      @apply dark:text-dark-subtle;
    }
  }
}
</style>
