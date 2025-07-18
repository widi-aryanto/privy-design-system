<template>
  <div
    v-p-aspect-ratio.fixed="4/3"
    class="camera"
    data-testid="camera"
    :data-deviceid="deviceId"
    :class="classNames">
    <video
      v-if="stream"
      ref="video"
      data-testid="camera-video"
      :srcObject.prop="stream"
      class="camera__video"
      autoplay
      muted
      playsinline
      @play="onStart" />

    <!-- Result -->
    <img
      v-if="isTaken && !stream"
      data-testid="camera-result"
      class="camera__result"
      :src="preview"
      alt="camera-result">

    <!-- Camera off -->
    <span
      v-if="!isActive && !isTaken"
      data-testid="camera-off"
      class="camera__off-info">
      Camera is off
    </span>

    <!-- Mask -->
    <div class="camera__mask-container">
      <div
        v-if="!isTaken"
        data-testid="camera-mask"
        class="camera__mask" />
    </div>

    <!-- Toast -->
    <transition name="slide-up">
      <div
        v-if="message"
        :key="message"
        class="camera__toast">
        <div
          data-testid="camera-toast"
          class="camera__toast-text">
          {{ message }}
        </div>
      </div>
    </transition>

    <!-- Control Button -->
    <div class="camera__controls">
      <p-button
        v-if="cameras.length > 1 && !isTaken"
        data-testid="camera-toggle"
        color="danger"
        size="sm"
        icon
        pill
        @click="toggle">
        <icon-rotate />
      </p-button>

      <!-- Main Button -->
      <p-button
        v-if="!isActive && !isTaken"
        data-testid="camera-turn-on"
        class="camera__main-control"
        color="danger"
        icon
        pill
        @click="turnOn()">
        <icon-camera />
      </p-button>
      <p-button
        v-else-if="isActive && !isTaken"
        data-testid="camera-take"
        class="camera__main-control"
        color="danger"
        icon
        pill
        :disabled="isProcessing"
        @click="take()">
        <icon-camera />
      </p-button>
      <p-button
        v-else
        data-testid="camera-retake"
        class="camera__main-control"
        color="danger"
        icon
        pill
        @click="retake()">
        <icon-retake />
      </p-button>
      <!-- End Main Button -->
    </div>
    <audio
      ref="shutter"
      :src="ShutterWav"
      :muted="silent" />

    <slot
      :cameras="cameras"
      :preview="preview"
      :stream="stream"
      :video="video"
      :shutter="shutter"
      :toast="toast" />
  </div>
</template>

<script lang="ts" setup>
import type {
  ComputedRef,
  PropType,
  VNode,
} from 'vue'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  toRef,
} from 'vue'
import pButton from '../button/Button.vue'
import IconRotate from '@privyid/persona-icon/vue/refresh/16.vue'
import IconCamera from '@privyid/persona-icon/vue/camera/24.vue'
import IconRetake from '@privyid/persona-icon/vue/reset/24.vue'
import ShutterWav from './assets/shutter.wav'
import { useVModel } from '../input'
import CaptureAdapter from './adapter/capture'
import type {
  Adapter,
  AdapterMeta,
  MaskVariant,
  ModelModifier,
} from './adapter/adapter'
import {
  usePermission,
  useDevicesList,
  useUserMedia,
  until,
} from '@vueuse/core'
import * as dialog from '../dialog'
import defu from 'defu'
import { vPAspectRatio } from '../aspect-ratio'

const props = defineProps({
  modelValue: {
    type: [
      globalThis.File,
      String,
      Array,
    ] as PropType<string | globalThis.File | string[] | globalThis.File[]>,
    default: '',
  },
  modelModifiers: {
    type   : Object as PropType<ModelModifier>,
    default: () => ({} as ModelModifier),
  },
  mirror: {
    type   : [Boolean, String] as PropType<boolean | 'preview' | 'all'>,
    default: undefined,
  },
  mask: {
    type   : String as PropType<MaskVariant>,
    default: undefined,
  },
  adapter: {
    type   : Object as PropType<Adapter>,
    default: CaptureAdapter,
  },
  facingMode: {
    type   : String as PropType<ConstrainDOMString>,
    default: undefined,
  },
  silent: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'update:modelValue': [unknown],
  'result': [unknown],
  'change': [unknown],
  'start': [unknown],
}>()

const model        = useVModel(props)
const modifier     = toRef(props, 'modelModifiers')
const isProcessing = ref(false)
const isTaken      = ref(false)
const preview      = ref('')
const message      = ref('')

const shutter    = ref<HTMLAudioElement>()
const video      = ref<HTMLVideoElement>()
const permission = usePermission('camera', { controls: true })
const camera     = ref(0)

const meta: ComputedRef<AdapterMeta> = computed(() => {
  return defu({
    mirror    : props.mirror,
    mask      : props.mask,
    facingMode: props.facingMode,
  }, props.adapter.meta, { autoStart: false })
})

const { videoInputs: cameras } = useDevicesList({
  requestPermissions: false,
  constraints       : { video: { facingMode: meta.value.facingMode } },
})

const deviceId = computed(() => {
  return cameras.value?.at(camera.value)?.deviceId
})

const constraints = computed<MediaStreamConstraints>(() => {
  return {
    video: { deviceId: deviceId.value },
    audio: false,
  }
})

const { stream, start, stop, enabled: isActive } = useUserMedia({ constraints })

const classNames = computed(() => {
  const result: string[] = []

  if (meta.value.mirror)
    result.push('camera--mirror')

  if (meta.value.mask)
    result.push(`camera__mask--${meta.value.mask}`)
  else
    result.push('camera__mask--none')

  return result
})

async function turnOn () {
  if (permission.state.value === 'denied') {
    await dialog.alert({
      title      : 'Camera Access Blocked',
      text       : 'Privy need to access your internal camera to process this journey',
      confirm    : { text: 'Ok' },
      footerAlign: 'end',
    })
  }

  if (permission.state.value === 'prompt') {
    await dialog.alert({
      title      : 'Camera Access Required',
      text       : 'Privy need to access your internal camera to process this journey',
      confirm    : { text: 'Ok' },
      footerAlign: 'end',
    })
  }

  await start()

  /* Trigger video play if browser ignore autoplays attribute */
  /* In HappyDOM, play() is undefined, which shouldn't happen in Real Browser */
  /* c8 ignore next 2 */
  if (typeof video.value?.play === 'function')
    await video.value.play()
}

function toggle () {
  camera.value = (camera.value + 1) % cameras.value.length
}

function toast (text: string) {
  message.value = text
}

async function take () {
  isProcessing.value = true

  const output = await props.adapter.run({
    video,
    toast,
    stream,
    meta,
    modifier,
  })

  preview.value      = output.preview
  model.value        = output.result
  isTaken.value      = true
  isProcessing.value = false
  isActive.value     = false

  emit('result', output.result)
  emit('change', output.result)

  /* c8 ignore next 2 */
  if (typeof shutter.value?.play === 'function')
    shutter.value.play()
}

async function retake () {
  isActive.value = true
  isTaken.value  = false
  preview.value  = ''
  message.value  = ''
}

function onStart () {
  emit('start', stream.value)

  if (meta.value.autoStart)
    take()
}

onMounted(async () => {
  if (permission.isSupported) {
    await until(permission.state).not.toBeUndefined()
    await turnOn()
  }
})

onBeforeUnmount(() => {
  stop()
})

defineExpose({
  take,
  retake,
  toast,
  toggle,
})

defineSlots<{
  'default'(props: {
    cameras: MediaDeviceInfo[],
    preview: string,
    stream: MediaStream,
    video: HTMLVideoElement,
    shutter: HTMLAudioElement,
    toast: (message: string) => void,
  }): VNode[],
}>()
</script>

<style lang="postcss">
.camera {
  @apply bg-inverse w-full flex flex-col select-none relative overflow-hidden;
  @apply dark:bg-dark-inverse;

  &__video {
    @apply grow min-h-full max-w-full h-auto object-cover;
  }

  &--mirror {
    .camera__video {
      @apply -scale-x-100;
    }
  }

  &__mask-container {
    @apply absolute inset-0 w-full h-full overflow-hidden pointer-events-none;
  }

  &__mask {
    @apply absolute top-1/2 left-1/2 shadow-mask -translate-x-1/2 -translate-y-1/2;

    &--none &-container {
      @apply hidden;
    }

    &--square & {
      @apply aspect-compat-square w-[55%] md:w-1/2;
    }

    &--round & {
      @apply aspect-compat-square rounded-full w-[55%] md:w-1/2;
    }

    &--card & {
      @apply aspect-compat-[85.60/53.98] w-3/4 rounded;
    }
  }

  &__result {
    @apply w-full h-full object-cover absolute inset-0;
  }

  &__off-info {
    @apply absolute bottom-20 text-on-emphasis left-0 right-0 text-center text-sm;
    @apply dark:text-dark-on-emphasis;
  }

  &__controls {
    @apply py-3 flex w-full shrink-0 justify-center items-center absolute bottom-0 space-x-3;
  }

  &__toast {
    @apply absolute bottom-20 left-0 right-0 text-center text-on-emphasis;
    @apply dark:text-dark-on-emphasis px-4;

    &-text {
      @apply bg-inverse/80 px-4 py-1 text-sm rounded shadow-md inline-block max-w-full truncate;
      @apply dark:bg-dark-inverse/80;
    }
  }
}
</style>
