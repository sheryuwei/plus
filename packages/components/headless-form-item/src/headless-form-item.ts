import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ZodType } from 'zod'

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
   * 支持 Zod schema 或 vee-validate 验证函数
   */
  rules: {
    type: [Object, Function, Array] as PropType<
      | ZodType
      | ((value: any) => boolean | string | Promise<boolean | string>)
      | any[]
    >,
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
  /**
   * 指定何时自动触发 setValue 和 setTouched
   * - 'input': 在 input 事件时
   * - 'change': 在 change 事件时
   * - 'blur': 在 blur 事件时
   * - 'all': 在所有事件时
   * - false: 不自动触发，完全手动控制
   */
  validateOn: {
    type: [String, Array, Boolean] as PropType<
      | 'input'
      | 'change'
      | 'blur'
      | 'all'
      | Array<'input' | 'change' | 'blur'>
      | false
    >,
    default: 'all',
  },
  /**
   * 渲染的根元素类型
   * 此处参考: https://github.com/logaretm/vee-validate/blob/main/packages/vee-validate/src/Form.ts
   */
  as: {
    type: null as unknown as PropType<string | null>,
    default: 'form',
  },
} as const)

export const headlessFormItemEmits = {
  /**
   * 字段值更新
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  'update:value': (value: any) => true,
  /**
   * 字段报错的回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  'update:error': (error: string | undefined) => true,
  /**
   * 字段验证方法
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validated: (isValid: boolean, error?: string) => true,
}

export type HeadlessFormItemProps = ExtractPropTypes<
  typeof headlessFormItemProps
>
export type HeadlessFormItemEmits = typeof headlessFormItemEmits
