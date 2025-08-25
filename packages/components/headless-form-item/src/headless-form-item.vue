<script lang="ts">
import { computed, defineComponent, h, inject, provide, watch } from 'vue'
import { useField } from 'vee-validate'
import { useNamespace } from '@element-plus/hooks'
import { toTypedSchema } from '@vee-validate/zod'
import {
  headlessFormItemEmits,
  headlessFormItemProps,
} from './headless-form-item'
import {
  headlessFormContextKey,
  headlessFormItemContextKey,
} from '../../headless-form/src/types'

import type { HeadlessFormItemContext } from '../../headless-form/src/types'
import type { ZodType } from 'zod'

export default defineComponent({
  name: 'HeadlessFormItem',
  props: headlessFormItemProps,
  emits: headlessFormItemEmits,
  setup(props, { emit }) {
    // Use Element Plus BEM naming
    const ns = useNamespace('headless-form-item')

    // Get form context (兼容独立使用，不强制要求在 form 内)
    const formContext = inject(headlessFormContextKey, undefined)

    // Get field name
    const fieldName = computed(() => {
      if (Array.isArray(props.prop)) {
        return props.prop.join('.')
      }
      return props.prop
    })

    // 处理验证规则优先级：本地 rules > 表单 schema
    const fieldValidationSchema = computed(() => {
      // 优先使用本地 rules
      if (props.rules) {
        // 如果是 Zod schema
        if (typeof props.rules === 'object' && 'parse' in props.rules) {
          return toTypedSchema(props.rules as ZodType)
        }
        // 如果是函数或其他自定义验证规则
        return props.rules
      }

      // 如果没有本地 rules，尝试从表单 schema 中提取字段验证
      if (
        formContext?.schema &&
        typeof formContext.schema === 'object' &&
        'shape' in formContext.schema
      ) {
        const schemaShape = (formContext.schema as any).shape
        const fieldSchema = schemaShape[fieldName.value]
        if (fieldSchema) {
          return toTypedSchema(fieldSchema)
        }
      }

      return undefined
    })

    // Use vee-validate field
    // 为了避免与表单级验证冲突，当有独立 rules 时使用唯一的字段名
    const actualFieldName = props.rules
      ? `${fieldName.value}_standalone`
      : fieldName.value

    const {
      value: fieldValue,
      errorMessage: fieldError,
      setValue: veeSetValue,
      setTouched,
      validate,
      resetField,
      meta,
    } = useField(actualFieldName, fieldValidationSchema.value, {
      validateOnValueUpdate: true,
      validateOnMount: false,
    })

    // 包装 setValue 以同步到表单值
    const setValue = (value: any) => {
      veeSetValue(value)
      // 如果在表单内，也要更新表单的值
      if (formContext && formContext.setFieldValue) {
        formContext.setFieldValue(fieldName.value, value)
      }
    }

    // 确定应该自动触发的事件类型
    const shouldTriggerOn = computed(() => {
      const validateOn = props.validateOn
      if (validateOn === false) return []
      if (validateOn === 'all') return ['input', 'change', 'blur']
      if (Array.isArray(validateOn)) return validateOn
      return [validateOn]
    })

    // 创建自动事件处理器
    const createAutoHandlers = () => {
      const triggers = shouldTriggerOn.value
      const handlers: Record<string, any> = {}

      if (triggers.includes('input')) {
        handlers.onInput = (event: Event) => {
          const target = event.target as HTMLInputElement
          if (target) {
            const value =
              target.type === 'number' ? Number(target.value) : target.value
            setValue(value)
          }
        }
      }

      if (triggers.includes('change')) {
        handlers.onChange = (event: Event) => {
          const target = event.target as HTMLInputElement
          if (target) {
            const value =
              target.type === 'number' ? Number(target.value) : target.value
            setValue(value)
          }
        }
      }

      if (triggers.includes('blur')) {
        handlers.onBlur = () => {
          setTouched(true)
        }
      }

      return handlers
    }

    // 调试验证状态
    watch(
      () => meta.valid,
      (isValid) => {
        console.log(
          `字段 ${fieldName.value} 验证状态:`,
          isValid,
          '错误:',
          fieldError.value
        )
      }
    )

    // 手动测试验证（用于调试）
    watch(
      () => fieldValue.value,
      async (newValue) => {
        if (newValue && fieldValidationSchema.value) {
          console.log(
            '手动验证:',
            newValue,
            '使用schema:',
            fieldValidationSchema.value
          )
          try {
            const result = await validate()
            console.log('手动验证结果:', result)
          } catch (error) {
            console.log('验证异常:', error)
          }
        }
      }
    )

    // Computed properties
    const fieldTouched = computed(() => meta.touched)
    const isRequired = computed(() => props.required)
    const isDisabled = computed(() =>
      formContext ? (formContext as any)?.disabled?.value : false
    )

    // Methods
    const reset = () => {
      resetField()
      setTouched(false)
    }

    // 字段值变化更新字段
    watch(
      () => fieldValue.value,
      (newValue) => {
        console.log(`字段 ${fieldName.value} 值变化:`, newValue)
        emit('update:value', newValue)
      }
    )

    // Watch for error changes and emit
    watch(
      () => fieldError.value,
      (newError) => {
        console.log(`字段 ${fieldName.value} 错误变化:`, newError)
        emit('update:error', newError)
      }
    )

    // 提交校验状态
    watch(
      () => meta.valid,
      (isValid) => {
        emit('validated', isValid, fieldError.value)
      }
    )

    // Form item context - 保持响应式
    const formItemContext: HeadlessFormItemContext = {
      field: fieldName,
      value: fieldValue,
      error: fieldError,
      touched: fieldTouched,
      setValue,
      setTouched,
      validate,
      reset,
    }

    // Provide context for child components
    provide(headlessFormItemContextKey, formItemContext)

    return {
      ns,
      fieldValue,
      fieldError,
      fieldTouched,
      fieldName,
      isRequired,
      isDisabled,
      setValue,
      setTouched,
      validate,
      reset,
      createAutoHandlers,
      shouldTriggerOn,
      // 暴露 props 给 render 函数
      showMessage: props.showMessage,
      as: props.as,
    }
  },
  render() {
    const children = []

    // 调试信息
    console.log('render函数调用:', {
      fieldName: this.fieldName,
      showMessage: this.showMessage,
      fieldError: this.fieldError,
      fieldValue: this.fieldValue,
    })

    // Default slot with all the field data
    if (this.$slots.default) {
      const autoHandlers = this.createAutoHandlers()
      children.push(
        this.$slots.default({
          value: this.fieldValue,
          error: this.fieldError,
          touched: this.fieldTouched,
          setValue: this.setValue,
          setTouched: this.setTouched,
          validate: this.validate,
          reset: this.reset,
          field: this.fieldName,
          required: this.isRequired,
          disabled: this.isDisabled,
          // 自动事件处理器
          ...autoHandlers,
          // 用于手动控制的独立处理器
          handlers: autoHandlers,
        })
      )
    }

    // Error message
    if (this.showMessage && this.fieldError) {
      console.log('添加错误信息:', this.fieldError)
      children.push(h('div', { class: this.ns.e('error') }, this.fieldError))
    }

    // Render with the specified element type
    return h(this.as, {}, children)
  },
})
</script>

<style scoped>
.el-headless-form-item__error {
  color: var(--el-color-danger);
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}
</style>
