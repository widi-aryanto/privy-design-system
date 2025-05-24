import { markRaw } from 'vue'
import type { HTMLAttributes, Component } from 'vue'
import type { ColorVariant } from '../button'
import type { NotifyInstance, NotifyOption } from '../notify'
import type { AdditionalAttr } from '../global/types'
import type { RequireAtLeastOne } from 'type-fest'
import type pPopup from './Popup.vue'
import { showNotify } from '../notify'

import IconInfo from '@privyid/persona-icon/vue/information-circle-solid/20.vue'
import IconSuccess from '@privyid/persona-icon/vue/checkmark/20.vue'
import IconWarning from '@privyid/persona-icon/vue/exclamation-circle-solid/20.vue'
import IconError from '@privyid/persona-icon/vue/exclamation-triangle-solid/20.vue'

export type PopupTypeVariant = 'info' | 'success' | 'warning' | 'error'

export type PopupStyleVariant = 'simple' | 'filled'

export type PopupInstance = NotifyInstance<typeof pPopup>

export interface PopupActionOption {
  text?: string,
  onClick?: (event: MouseEvent & { close: () => void }) => void | Promise<void>,
  attrs?: AdditionalAttr,
}

interface Option extends Omit<NotifyOption, 'component'> {
  type?: PopupTypeVariant,
  variant?: PopupStyleVariant,
  title?: string,
  text?: string,
  icon?: string | Component,
  iconColor?: ColorVariant,
  popupClass?: HTMLAttributes['class'],
  popupAttrs?: AdditionalAttr,
  dismissable?: boolean,
  actions?: PopupActionOption[],
}

export const PopupIcons = {
  info   : markRaw(IconInfo),
  success: markRaw(IconSuccess),
  warning: markRaw(IconWarning),
  error  : markRaw(IconError),
}

export type PopupOption = RequireAtLeastOne<Option, 'text' | 'title'>

async function showPopup (text: string, title?: string, type?: PopupTypeVariant, variant?: PopupStyleVariant): Promise<PopupInstance>
async function showPopup (option: PopupOption): Promise<PopupInstance>
async function showPopup (textOrOption: string | PopupOption, title?: string, type?: PopupTypeVariant, variant?: PopupStyleVariant): Promise<PopupInstance> {
  if (typeof textOrOption === 'string') {
    return await showPopup({
      text: textOrOption,
      title,
      type,
      variant,
    })
  }

  const { default: pPopup } = await import('./Popup.vue')
  const instance            = await showNotify({
    component: markRaw(pPopup),
    props    : textOrOption,
    duration : textOrOption.duration,
    position : textOrOption.position,
  })

  return instance
}

export default showPopup
