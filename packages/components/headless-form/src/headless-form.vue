<template>
  <form @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { headlessFormEmits, headlessFormProps } from './headless-form'
import { headlessFormContextKey } from './types'

import type { HeadlessFormContext } from './types'

defineOptions({
  name: 'HeadlessForm',
})

const props = defineProps(headlessFormProps)
const emit = defineEmits(headlessFormEmits)

const typedSchema = computed(() => toTypedSchema(props.schema))

const {
  values,
  errors,
  meta,
  setFieldValue,
  setFieldError,
  setFieldTouched,
  resetField,
  resetForm,
  validate,
  handleSubmit: veeHandleSubmit,
} = useForm({
  validationSchema: typedSchema,
  initialValues: props.initialValues,
  validateOnMount: false,
})

const formDisabled = ref(props.disabled)
const touched = ref<Record<string, boolean>>({})

watch(
  () => props.disabled,
  (newDisabled) => {
    formDisabled.value = newDisabled
  }
)

watch(
  values,
  (newValues) => {
    emit('update:values', newValues)
  },
  { deep: true }
)

watch(
  errors,
  (newErrors) => {
    emit('update:errors', newErrors)
  },
  { deep: true }
)

const validateField = async (field: string): Promise<boolean> => {
  const result = await validate()
  return !result.errors[field]
}

const validateForm = async (): Promise<boolean> => {
  const result = await validate()
  return result.valid
}

const submitForm = async (): Promise<void> => {
  const isValid = await validateForm()
  if (isValid) {
    emit('submit', values)
  } else {
    emit('submit-failed', errors.value)
  }
}

// Handle submit
const handleSubmit = veeHandleSubmit(
  (values) => {
    emit('submit', values)
  },
  ({ errors }) => {
    emit('submit-failed', errors)
  }
)

const formContext: HeadlessFormContext = reactive({
  schema: props.schema,
  values: values as any,
  errors: errors as any,
  touched: touched as any,
  disabled: formDisabled,
  validateField,
  setFieldValue,
  setFieldError,
  setFieldTouched: (field: string, isTouched: boolean) => {
    touched.value[field] = isTouched
    setFieldTouched(field, isTouched)
  },
  resetField,
  resetForm: () => {
    resetForm()
    touched.value = {}
  },
  validateForm,
  submitForm,
})

// Provide context
provide(headlessFormContextKey, formContext)

// 导出方法
defineExpose({
  validate: validateForm,
  validateField,
  resetForm: formContext.resetForm,
  resetField,
  setFieldValue,
  setFieldError,
  submit: submitForm,
  values,
  errors,
  meta,
})
</script>
