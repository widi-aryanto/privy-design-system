import type { HTMLAttributes } from 'vue'

export interface AdditionalAttr extends HTMLAttributes {
  [key: string]: unknown,
}
