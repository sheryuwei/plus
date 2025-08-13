import type { InjectionKey, Ref } from 'vue'
import type { ZodType } from 'zod'
import type { ComponentSize } from '@element-plus/constants'

export interface HeadlessFormContext {
  schema: ZodType
  values: Ref<Record<string, any>>
  errors: Ref<Record<string, string | undefined>>
  touched: Ref<Record<string, boolean>>
  size: Ref<ComponentSize | undefined>
  disabled: Ref<boolean>
  validateField: (field: string) => Promise<boolean>
  setFieldValue: (field: string, value: any) => void
  setFieldError: (field: string, error: string) => void
  setFieldTouched: (field: string, touched: boolean) => void
  resetField: (field: string) => void
  resetForm: () => void
  validateForm: () => Promise<boolean>
  submitForm: () => Promise<void>
}

export interface HeadlessFormItemContext {
  field: string
  value: any
  error: string | undefined
  touched: boolean
  setValue: (value: any) => void
  setTouched: (touched: boolean) => void
  validate: () => Promise<any>
  reset: () => void
}

export const headlessFormContextKey: InjectionKey<HeadlessFormContext> = Symbol(
  'headlessFormContext'
)

export const headlessFormItemContextKey: InjectionKey<HeadlessFormItemContext> =
  Symbol('headlessFormItemContext')
