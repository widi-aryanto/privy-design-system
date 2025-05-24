import type { InjectionKey, Ref } from 'vue'
import type { SizeVariant } from '../button'

export interface InputGroupSetting {
  size?: Ref<SizeVariant>,
}

export const INPUTGROUP_SETTING: InjectionKey<InputGroupSetting> = Symbol('InputGroupSetting')
