<template>
  <div>
    <slot :value="fieldValue" :error="fieldError" :touched="fieldTouched" :set-value="setValue"
      :set-touched="setTouched" :validate="validate" :reset="reset" :field="fieldName" :required="isRequired"
      :disabled="isDisabled" />
    <div v-if="showMessage && fieldError" class="headless-form-item__error">
      {{ fieldError }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, provide, watch } from 'vue'
import { useField } from 'vee-validate'
import {
  headlessFormItemEmits,
  headlessFormItemProps,
} from './headless-form-item'
import {
  headlessFormContextKey,
  headlessFormItemContextKey,
} from '../../headless-form/src/types'

import type { HeadlessFormItemContext } from '../../headless-form/src/types'

defineOptions({
  name: 'HeadlessFormItem',
})

const props = defineProps(headlessFormItemProps)
const emit = defineEmits(headlessFormItemEmits)

// Get form context
const formContext = inject(headlessFormContextKey)

if (!formContext) {
  throw new Error('HeadlessFormItem must be used within HeadlessForm')
}

// Get field name
const fieldName = computed(() => {
  if (Array.isArray(props.prop)) {
    return props.prop.join('.')
  }
  return props.prop
})

// Use vee-validate field
const {
  value: fieldValue,
  errorMessage: fieldError,
  setValue,
  setTouched,
  validate,
  resetField,
  meta,
} = useField(fieldName.value, undefined, {
  validateOnValueUpdate:
    props.validateOnChange ??
    (formContext as any)?.values?.value?.[fieldName.value] !== undefined,
  validateOnMount: false,
})

// Computed properties
const fieldTouched = computed(() => meta.touched)
const isRequired = computed(() => props.required)
const isDisabled = computed(() => (formContext as any)?.disabled?.value)

// Methods
const reset = () => {
  resetField()
  setTouched(false)
}

// 字段值变化更新字段
watch(
  () => fieldValue.value,
  (newValue) => {
    emit('update:value', newValue)
  }
)

// Watch for error changes and emit
watch(
  () => fieldError.value,
  (newError) => {
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

// Form item context
const formItemContext: HeadlessFormItemContext = {
  field: fieldName.value,
  value: fieldValue.value,
  error: fieldError.value,
  touched: fieldTouched.value,
  setValue,
  setTouched,
  validate,
  reset,
}

// Provide context for child components
provide(headlessFormItemContextKey, formItemContext)

// 将方法导出
defineExpose({
  field: fieldName.value,
  value: fieldValue,
  error: fieldError,
  touched: fieldTouched,
  setValue,
  setTouched,
  validate,
  reset,
})
</script>

<style scoped>
.headless-form-item__error {
  color: var(--el-color-danger);
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}
</style>
