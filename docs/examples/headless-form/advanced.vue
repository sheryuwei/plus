<template>
  <div class="advanced-headless-form">
    <h3>复杂用法 Headless Form 用法</h3>

    <el-headless-form ref="formRef" :schema="schema" :initial-values="initialValues" :validate-on-change="false"
      :validate-on-blur="true" @submit="onSubmit" @submit-failed="onSubmitFailed" @update:values="onValuesChange"
      @update:errors="onErrorsChange">
      <!-- 个人信息部分 -->
      <el-card header="个人信息" style="margin-bottom: 20px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-headless-form-item prop="profile.firstName">
              <template #default="{ value, error, setValue, setTouched, required }">
                <el-form-item label="名字" :required="required" :error="error">
                  <el-input :model-value="value" placeholder="请输入名字" @update:model-value="setValue"
                    @blur="setTouched(true)" />
                </el-form-item>
              </template>
            </el-headless-form-item>
          </el-col>

          <el-col :span="12">
            <el-headless-form-item prop="profile.lastName">
              <template #default="{ value, error, setValue, setTouched, required }">
                <el-form-item label="姓氏" :required="required" :error="error">
                  <el-input :model-value="value" placeholder="请输入姓氏" @update:model-value="setValue"
                    @blur="setTouched(true)" />
                </el-form-item>
              </template>
            </el-headless-form-item>
          </el-col>
        </el-row>

        <el-headless-form-item prop="profile.bio">
          <template #default="{ value, error, setValue, setTouched, required }">
            <el-form-item label="个人简介" :required="required" :error="error">
              <el-input :model-value="value" type="textarea" :rows="3" placeholder="请输入个人简介"
                @update:model-value="setValue" @blur="setTouched(true)" />
            </el-form-item>
          </template>
        </el-headless-form-item>
      </el-card>

      <!-- 联系方式部分 -->
      <el-card header="联系方式" style="margin-bottom: 20px">
        <el-headless-form-item prop="contact.email">
          <template #default="{ value, error, setValue, setTouched, required }">
            <el-form-item label="邮箱" :required="required" :error="error">
              <el-input :model-value="value" placeholder="请输入邮箱" type="email" @update:model-value="setValue"
                @blur="setTouched(true)">
                <template #prefix>
                  <el-icon>
                    <Message />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </template>
        </el-headless-form-item>

        <el-headless-form-item prop="contact.phone">
          <template #default="{ value, error, setValue, setTouched, required }">
            <el-form-item label="手机号" :required="required" :error="error">
              <el-input :model-value="value" placeholder="请输入手机号" @update:model-value="setValue"
                @blur="setTouched(true)">
                <template #prefix>
                  <el-icon>
                    <Phone />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </template>
        </el-headless-form-item>
      </el-card>

      <!-- 技能标签 -->
      <el-card header="技能标签" style="margin-bottom: 20px">
        <el-headless-form-item prop="skills">
          <template #default="{ value, error, setValue, setTouched, required }">
            <el-form-item label="技能" :required="required" :error="error">
              <el-select :model-value="value" multiple filterable allow-create placeholder="请选择或输入技能"
                style="width: 100%" @update:model-value="setValue" @blur="setTouched(true)">
                <el-option v-for="skill in skillOptions" :key="skill" :label="skill" :value="skill" />
              </el-select>
            </el-form-item>
          </template>
        </el-headless-form-item>
      </el-card>

      <!-- 偏好设置 -->
      <el-card header="偏好设置" style="margin-bottom: 20px">
        <el-headless-form-item prop="preferences.theme">
          <template #default="{ value, error, setValue, setTouched, required }">
            <el-form-item label="主题" :required="required" :error="error">
              <el-radio-group :model-value="value" @update:model-value="setValue" @change="setTouched(true)">
                <el-radio value="light">浅色主题</el-radio>
                <el-radio value="dark">深色主题</el-radio>
                <el-radio value="auto">跟随系统</el-radio>
              </el-radio-group>
            </el-form-item>
          </template>
        </el-headless-form-item>

        <el-headless-form-item prop="preferences.notifications">
          <template #default="{ value, error, setValue, setTouched, required }">
            <el-form-item label="通知设置" :required="required" :error="error">
              <el-checkbox-group :model-value="value" @update:model-value="setValue" @change="setTouched(true)">
                <el-checkbox value="email">邮件通知</el-checkbox>
                <el-checkbox value="sms">短信通知</el-checkbox>
                <el-checkbox value="push">推送通知</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </template>
        </el-headless-form-item>
      </el-card>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="submitting">
          {{ submitting ? '提交中...' : '保存设置' }}
        </el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="info" @click="validateOnly">仅验证</el-button>
        <el-button type="warning" @click="fillDemoData">填充示例数据</el-button>
      </el-form-item>
    </el-headless-form>

    <!-- 实时状态显示 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card header="实时表单值">
          <pre>{{ JSON.stringify(currentValues, null, 2) }}</pre>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card header="验证错误">
          <pre>{{ JSON.stringify(currentErrors, null, 2) }}</pre>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { z } from 'zod'
import { Message, Phone } from '@element-plus/icons-vue'

// 复杂嵌套的验证 schema
const schema = z.object({
  profile: z.object({
    firstName: z
      .string()
      .min(1, '名字不能为空')
      .max(50, '名字不能超过50个字符'),
    lastName: z.string().min(1, '姓氏不能为空').max(50, '姓氏不能超过50个字符'),
    bio: z.string().max(500, '个人简介不能超过500个字符').optional(),
  }),
  contact: z.object({
    email: z.string().email('请输入有效的邮箱地址'),
    phone: z
      .string()
      .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码')
      .min(11, '手机号码格式不正确'),
  }),
  skills: z.array(z.string()).min(1, '至少选择一个技能'),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'auto'], {
      required_error: '请选择主题',
    }),
    notifications: z.array(z.enum(['email', 'sms', 'push'])),
  }),
})

// 初始值
const initialValues = {
  profile: {
    firstName: '',
    lastName: '',
    bio: '',
  },
  contact: {
    email: '',
    phone: '',
  },
  skills: [],
  preferences: {
    theme: 'light' as const,
    notifications: ['email'] as const[],
  },
}

// 技能选项
const skillOptions = [
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React',
  'Node.js',
  'Python',
  'Java',
  'C++',
  'Go',
  'Rust',
  'Docker',
  'Kubernetes',
]

// 状态
const submitting = ref(false)
const currentValues = ref({})
const currentErrors = ref({})
const formRef = ref()

// 事件处理
const onSubmit = async (values: any) => {
  submitting.value = true
  try {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('Form submitted:', values)
    ElMessage.success('设置保存成功！')
  } catch {
    ElMessage.error('保存失败，请重试')
  } finally {
    submitting.value = false
  }
}

const onSubmitFailed = (errors: any) => {
  console.log('Form validation failed:', errors)
  ElMessage.error('表单验证失败，请检查输入')
}

const onValuesChange = (values: any) => {
  currentValues.value = values
}

const onErrorsChange = (errors: any) => {
  currentErrors.value = errors
}

// 方法
const resetForm = () => {
  formRef.value?.resetForm()
  ElMessage.info('表单已重置')
}

const validateOnly = async () => {
  const isValid = await formRef.value?.validate()
  if (isValid) {
    ElMessage.success('表单验证通过')
  } else {
    ElMessage.error('表单验证失败')
  }
}

const fillDemoData = () => {
  const demoData = {
    profile: {
      firstName: '张',
      lastName: '三',
      bio: '前端开发',
    },
    contact: {
      email: 'zhangsan@example.com',
      phone: '13812345678',
    },
    skills: ['JavaScript', 'Vue.js', 'TypeScript'],
    preferences: {
      theme: 'dark' as const,
      notifications: ['email', 'push'] as const[],
    },
  }

  // 使用表单的方法设置值
  Object.keys(demoData).forEach((key) => {
    if (typeof demoData[key] === 'object' && !Array.isArray(demoData[key])) {
      Object.keys(demoData[key]).forEach((subKey) => {
        formRef.value?.setFieldValue(`${key}.${subKey}`, demoData[key][subKey])
      })
    } else {
      formRef.value?.setFieldValue(key, demoData[key])
    }
  })

  ElMessage.success('示例数据已填充')
}
</script>

<style scoped>
.advanced-headless-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}

pre {
  max-height: 200px;
  overflow-y: auto;
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.5;
}
</style>
