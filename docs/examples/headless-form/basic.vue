<template>
    <div class="headless-form-example">
        <h3>基础的 Headless Form 使用</h3>

        <el-headless-form :schema="schema" :initial-values="initialValues" @submit="onSubmit"
            @submit-failed="onSubmitFailed">
            <el-headless-form-item prop="username">
                <template #default="{ value, error, setValue, setTouched, field, required }">
                    <el-form-item :label="'用户名'" :required="required" :error="error">
                        <el-input :model-value="value" placeholder="请输入用户名" @update:model-value="setValue"
                            @blur="setTouched(true)" />
                    </el-form-item>
                </template>
            </el-headless-form-item>

            <el-headless-form-item prop="email">
                <template #default="{ value, error, setValue, setTouched, field, required }">
                    <el-form-item :label="'邮箱'" :required="required" :error="error">
                        <el-input :model-value="value" placeholder="请输入邮箱" type="email" @update:model-value="setValue"
                            @blur="setTouched(true)" />
                    </el-form-item>
                </template>
            </el-headless-form-item>

            <el-headless-form-item prop="age">
                <template #default="{ value, error, setValue, setTouched, field, required }">
                    <el-form-item :label="'年龄'" :required="required" :error="error">
                        <el-input-number :model-value="value" :min="1" :max="120" @update:model-value="setValue"
                            @blur="setTouched(true)" />
                    </el-form-item>
                </template>
            </el-headless-form-item>

            <el-headless-form-item prop="gender">
                <template #default="{ value, error, setValue, setTouched, field, required }">
                    <el-form-item :label="'性别'" :required="required" :error="error">
                        <el-radio-group :model-value="value" @update:model-value="setValue" @change="setTouched(true)">
                            <el-radio value="male">男</el-radio>
                            <el-radio value="female">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </template>
            </el-headless-form-item>

            <el-form-item>
                <el-button type="primary" native-type="submit">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
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

.form-result {
    margin-top: 20px;
    padding: 20px;
    background-color: #f5f7fa;
    border-radius: 6px;
}

.form-result pre {
    margin: 0;
    background: none;
    color: #606266;
}
</style>
