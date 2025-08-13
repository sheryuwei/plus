# Headless Form Components

基于 vee-validate 和 zod 的无头表单组件。

## 组件列表

- **HeadlessForm** - 无头表单容器组件
- **HeadlessFormItem** - 无头表单项组件

## 特性

- 🔧 基于 vee-validate 的验证能力
- 🛡️ Zod schema 类型安全验证
- 🎨 完全可定制的 UI
- ⚡ 性能优化的验证时机
- 📝 完整的 TypeScript 支持

## 基本用法

```vue
<template>
  <el-headless-form :schema="schema" @submit="onSubmit">
    <el-headless-form-item prop="username">
      <template #default="{ value, error, setValue, setTouched }">
        <el-form-item label="用户名" :error="error">
          <el-input
            :model-value="value"
            @update:model-value="setValue"
            @blur="setTouched(true)"
          />
        </el-form-item>
      </template>
    </el-headless-form-item>

    <el-button type="primary" native-type="submit">提交</el-button>
  </el-headless-form>
</template>

<script setup>
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(3, '用户名至少3个字符'),
})

const onSubmit = (values) => {
  console.log('提交的值:', values)
}
</script>
```

## 安装依赖

这些组件需要以下依赖：

```bash
pnpm add vee-validate @vee-validate/zod zod@^3.24.0
```

## 文档

详细文档请查看：`docs/en-US/component/headless-form.md`
