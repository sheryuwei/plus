import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'
import type { ZodType } from 'zod'

export const headlessFormProps = buildProps({
  /**
   * 表单验证方法（Zod schema）
   */
  schema: {
    type: Object as () => ZodType,
    required: true,
  },
  /**
   * 表单初始值
   */
  initialValues: {
    type: Object as () => Record<string, any>,
    default: () => ({}),
  },
  /**
   * 是否禁用表单
   */
  disabled: Boolean,
  /**
   * 是否在值改变时验证
   */
  validateOnChange: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否在失去焦点时验证
   */
  validateOnBlur: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否在输入时验证
   */
  validateOnInput: {
    type: Boolean,
    default: false,
  },
} as const)

export const headlessFormEmits = {
  /**
   * 表单值改变时触发
   */
  'update:values': (values: Record<string, any>) => true,
  /**
   * 表单验证失败时触发
   */
  'update:errors': (errors: Record<string, string | undefined>) => true,
  /**
   * 表单提交时触发
   */
  submit: (values: Record<string, any>) => true,
  /**
   * 表单提交失败时触发
   */
  'submit-failed': (errors: Record<string, string | undefined>) => true,
}

export type HeadlessFormProps = ExtractPropTypes<typeof headlessFormProps>
export type HeadlessFormEmits = typeof headlessFormEmits
