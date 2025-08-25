import type { InjectionKey, Ref } from 'vue'
import type { ZodType } from 'zod'

export interface HeadlessFormContext {
  schema: ZodType
  values: Ref<Record<string, any>>
  errors: Ref<Record<string, string | undefined>>
  touched: Ref<Record<string, boolean>>
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
  field: Ref<string>
  value: Ref<any>
  error: Ref<string | undefined>
  touched: Ref<boolean>
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
