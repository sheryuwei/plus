import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const headlessFormItemProps = buildProps({
  /**
   * 指定的属性值
   */
  prop: {
    type: [String, Array] as any,
    required: true,
  },
  /**
   * @description label文案
   */
  label: String,
  /**
   * 字段是否必填
   */
  required: Boolean,
  /**
   * 自定义字段的验证规则
   */
  rules: {
    type: [Object, Array] as any,
  },
  /**
   * 错误时是否显示错误信息
   */
  showMessage: {
    type: Boolean,
    default: false,
  },
  /**
   * 失焦时是否触发验证
   */
  validateOnBlur: {
    type: Boolean,
    default: true,
  },
  /**
   * 改变时是否触发验证
   */
  validateOnChange: {
    type: Boolean,
    default: true,
  },
  /**
   * 输入时是否触发验证
   */
  validateOnInput: Boolean,
} as const)

export const headlessFormItemEmits = {
  /**
   * 字段值更新
   */
  'update:value': (value: any) => true,
  /**
   * 字段报错的回调
   */
  'update:error': (error: string | undefined) => true,
  /**
   * 字段验证方法
   */
  validated: (isValid: boolean, error?: string) => true,
}

export type HeadlessFormItemProps = ExtractPropTypes<
  typeof headlessFormItemProps
>
export type HeadlessFormItemEmits = typeof headlessFormItemEmits
