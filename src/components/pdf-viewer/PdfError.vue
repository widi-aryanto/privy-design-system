<template>
  <div
    v-p-aspect-ratio="1122/793"
    data-testid="pdf-error"
    class="pdf__error">
    <Heading element="h3">
      Failed to load PDF
    </Heading>
    <dl class="mt-7">
      <dt>URL:</dt>
      <dd class="truncate">
        <a
          :href="url"
          target="_blank">
          <code>{{ url }}</code>
        </a>
      </dd>
      <dt>
        Reason:
      </dt>
      <dd><code>{{ error.message }}</code></dd>
      <dt>
        PDFJS Version:
      </dt>
      <dd><code>{{ version }}</code></dd>
    </dl>
  </div>
</template>

<script lang="ts" setup>
import { vPAspectRatio } from '../aspect-ratio'
import type { PropType } from 'vue'
import { onMounted, ref } from 'vue'
import Heading from '../heading/Heading.vue'
import { getVersion } from './utils/pdfjs'

defineProps({
  url: {
    type   : String,
    default: '',
  },
  error: {
    type   : Object as PropType<Error>,
    default: () => ({} as Error),
  },
})

const version = ref('')

onMounted(async () => {
  version.value = await getVersion()
})
</script>

<style lang="postcss">
.pdf__error {
  @apply shadow-lg mb-4 p-6 bg-danger w-full h-full max-w-[var(--p-pdf-container-width)] mx-auto text-default;
  @apply dark:bg-dark-danger-emphasis dark:text-dark-default;

  a {
    &,
    &:hover {
      > code {
        @apply text-danger;
      }
    }
  }

  :not(pre) code {
    @apply bg-emphasis-alpha text-danger;
    @apply dark:bg-dark-danger dark:text-dark-danger;
  }
}
</style>
