<template>
  <div class="headless-form-example">
    <h3>基础的 Headless Form 使用</h3>

    <el-headless-form
      ref="formRef"
      :schema="schema"
      :initial-values="initialValues"
      @submit="onSubmit"
      @submit-failed="onSubmitFailed"
    >
      <!-- 完全自定义的用户名字段 -->
      <el-headless-form-item prop="username">
        <template #default="{ value, error, setValue, setTouched, required }">
          <div class="custom-field">
            <label class="field-label">
              用户名 <span v-if="required" class="required">*</span>
            </label>
            <input
              :value="value"
              placeholder="请输入用户名"
              :class="['custom-input', { error: error }]"
              @input="(e) => setValue(e.target.value)"
              @blur="setTouched(true)"
            />
            <div v-if="error" class="error-message">{{ error }}</div>
          </div>
        </template>
      </el-headless-form-item>

      <!-- 完全自定义的邮箱字段 -->
      <el-headless-form-item prop="email">
        <template #default="{ value, error, setValue, setTouched, required }">
          <div class="custom-field">
            <label class="field-label">
              邮箱 <span v-if="required" class="required">*</span>
            </label>
            <input
              type="email"
              :value="value"
              placeholder="请输入邮箱"
              :class="['custom-input', { error: error }]"
              @input="(e) => setValue(e.target.value)"
              @blur="setTouched(true)"
            />
            <div v-if="error" class="error-message">{{ error }}</div>
          </div>
        </template>
      </el-headless-form-item>

      <!-- 自定义数字输入 -->
      <el-headless-form-item prop="age">
        <template #default="{ value, error, setValue, setTouched, required }">
          <div class="custom-field">
            <label class="field-label">
              年龄 <span v-if="required" class="required">*</span>
            </label>
            <input
              type="number"
              :value="value"
              min="1"
              max="120"
              :class="['custom-input', { error: error }]"
              @input="(e) => setValue(Number(e.target.value))"
              @blur="setTouched(true)"
            />
            <div v-if="error" class="error-message">{{ error }}</div>
          </div>
        </template>
      </el-headless-form-item>

      <!-- 自定义单选按钮 -->
      <el-headless-form-item prop="gender">
        <template #default="{ value, error, setValue, setTouched, required }">
          <div class="custom-field">
            <label class="field-label">
              性别 <span v-if="required" class="required">*</span>
            </label>
            <div class="radio-group" :class="{ error: error }">
              <label class="radio-item">
                <input
                  type="radio"
                  :checked="value === 'male'"
                  @change="
                    () => {
                      setValue('male')
                      setTouched(true)
                    }
                  "
                />
                <span>男</span>
              </label>
              <label class="radio-item">
                <input
                  type="radio"
                  :checked="value === 'female'"
                  @change="
                    () => {
                      setValue('female')
                      setTouched(true)
                    }
                  "
                />
                <span>女</span>
              </label>
            </div>
            <div v-if="error" class="error-message">{{ error }}</div>
          </div>
        </template>
      </el-headless-form-item>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">提交</button>
        <button type="button" class="btn btn-secondary" @click="resetForm">
          重置
        </button>
      </div>
    </el-headless-form>

    <div v-if="formData" class="form-result">
      <h4>表单数据：</h4>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { z } from 'zod'
import { ElMessage } from '@sheryuwei/plus'

// 定义表单验证 schema
const schema = z.object({
  username: z
    .string()
    .min(3, '用户名至少需要3个字符')
    .max(20, '用户名不能超过20个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  age: z.number().min(1, '年龄必须大于0').max(120, '年龄不能超过120'),
  gender: z.enum(['male', 'female'], {
    required_error: '请选择性别',
    invalid_type_error: '请选择有效的性别',
  }),
})

// 初始值
const initialValues = {
  username: '',
  email: '',
  age: 18,
  gender: 'male' as const,
}

// 表单数据
const formData = ref<any>(null)

// 表单引用
const formRef = ref()

// 提交成功处理
const onSubmit = (values: any) => {
  console.log('Form submitted:', values)
  formData.value = values
  ElMessage.success('表单提交成功！')
}

// 提交失败处理
const onSubmitFailed = (errors: any) => {
  console.log('Form validation failed:', errors)
  ElMessage.error('表单验证失败，请检查输入')
}

// 重置表单
const resetForm = () => {
  formRef.value?.resetForm()
  formData.value = null
}
</script>

<style scoped>
.headless-form-example {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

/* 自定义表单样式 - 展示真正的 headless 设计 */
.custom-field {
  margin-bottom: 20px;
}

.field-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.required {
  color: #ff4757;
}

.custom-input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.custom-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
}

.custom-input.error {
  border-color: #ff4757;
}

.radio-group {
  display: flex;
  gap: 16px;
  padding: 8px 0;
}

.radio-group.error {
  color: #ff4757;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
}

.radio-item input[type='radio'] {
  margin: 0;
}

.error-message {
  margin-top: 6px;
  font-size: 12px;
  color: #ff4757;
  line-height: 1.4;
}

.form-actions {
  margin-top: 24px;
  display: flex;
  gap: 12px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
}

.btn-primary {
  background-color: #409eff;
  color: white;
}

.btn-primary:hover {
  background-color: #337ecc;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.form-result {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #409eff;
}

.form-result h4 {
  margin: 0 0 12px 0;
  color: #333;
}

.form-result pre {
  margin: 0;
  background: white;
  padding: 12px;
  border-radius: 4px;
  color: #606266;
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
}
</style>
