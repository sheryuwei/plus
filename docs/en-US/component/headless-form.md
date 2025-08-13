# Headless Form

基于 vee-validate 和 zod 的无头表单组件，提供了强大的表单验证功能，同时保持了灵活的 UI 自定义能力。

## 特性

- 🔧 **基于 vee-validate**：利用 vee-validate 的强大验证能力
- 🛡️ **Zod 类型安全**：使用 Zod schema 进行类型安全的验证
- 🎨 **完全可定制**：无头设计，UI 完全由你控制
- ⚡ **性能优化**：智能的验证时机控制
- 📝 **TypeScript 支持**：完整的 TypeScript 类型支持
- 🔄 **响应式**：实时的表单状态和错误反馈

## 基础用法

使用 Zod schema 定义验证规则，通过插槽自定义表单项的 UI。

:::demo 使用 Zod schema 定义验证规则，通过插槽自定义表单项的 UI。

headless-form/basic

:::

## 嵌套对象验证

支持复杂的嵌套对象结构验证。

:::demo 支持复杂的嵌套对象结构验证，包括个人信息和联系方式。

headless-form/advanced

:::

## 表单方法

可以通过模板引用调用表单的各种方法。

:::demo 展示表单的高级功能，包括表单方法调用、状态监听等。

headless-form/advanced

:::

## Headless Form API

### Headless Form Attributes

| 属性               | 说明                     | 类型                  | 可选值                  | 默认值  |
| ------------------ | ------------------------ | --------------------- | ----------------------- | ------- |
| schema             | Zod 验证 schema          | `ZodSchema`           | —                       | —       |
| initial-values     | 表单初始值               | `Record<string, any>` | —                       | `{}`    |
| size               | 表单内组件的尺寸         | `string`              | large / default / small | —       |
| disabled           | 是否禁用表单内的所有组件 | `boolean`             | —                       | `false` |
| validate-on-change | 是否在值改变时验证       | `boolean`             | —                       | `true`  |
| validate-on-blur   | 是否在失焦时验证         | `boolean`             | —                       | `true`  |
| validate-on-input  | 是否在输入时验证         | `boolean`             | —                       | `false` |

### Headless Form Events

| 事件名        | 说明                     | 回调参数                                   |
| ------------- | ------------------------ | ------------------------------------------ |
| submit        | 表单提交且验证通过时触发 | `(values: Record<string, any>) => void`    |
| submit-failed | 表单提交但验证失败时触发 | `(errors: Record<string, string>) => void` |
| update:values | 表单值发生变化时触发     | `(values: Record<string, any>) => void`    |
| update:errors | 表单错误发生变化时触发   | `(errors: Record<string, string>) => void` |

### Headless Form Methods

| 方法名        | 说明         | 参数                             | 返回值             |
| ------------- | ------------ | -------------------------------- | ------------------ |
| validate      | 验证整个表单 | —                                | `Promise<boolean>` |
| validateField | 验证特定字段 | `(field: string)`                | `Promise<boolean>` |
| resetForm     | 重置整个表单 | —                                | —                  |
| resetField    | 重置特定字段 | `(field: string)`                | —                  |
| setFieldValue | 设置字段值   | `(field: string, value: any)`    | —                  |
| setFieldError | 设置字段错误 | `(field: string, error: string)` | —                  |
| submit        | 手动提交表单 | —                                | `Promise<void>`    |

## Headless Form Item API

### Headless Form Item Attributes

| 属性               | 说明               | 类型                 | 可选值 | 默认值  |
| ------------------ | ------------------ | -------------------- | ------ | ------- |
| prop               | 表单字段名         | `string \| string[]` | —      | —       |
| label              | 标签文本           | `string`             | —      | —       |
| required           | 是否为必填项       | `boolean`            | —      | `false` |
| show-message       | 是否显示错误信息   | `boolean`            | —      | `true`  |
| validate-on-blur   | 是否在失焦时验证   | `boolean`            | —      | `true`  |
| validate-on-change | 是否在值改变时验证 | `boolean`            | —      | `true`  |
| validate-on-input  | 是否在输入时验证   | `boolean`            | —      | `false` |

### Headless Form Item Events

| 事件名       | 说明               | 回调参数                                     |
| ------------ | ------------------ | -------------------------------------------- |
| update:value | 字段值变化时触发   | `(value: any) => void`                       |
| update:error | 字段错误变化时触发 | `(error: string \| undefined) => void`       |
| validated    | 字段验证完成时触发 | `(isValid: boolean, error?: string) => void` |

### Headless Form Item Slot

| 插槽名  | 说明             | 参数                                                                                          |
| ------- | ---------------- | --------------------------------------------------------------------------------------------- |
| default | 自定义表单项内容 | `{ value, error, touched, setValue, setTouched, validate, reset, field, required, disabled }` |

## Zod Schema 示例

```typescript
import { z } from 'zod'

// 基础验证
const basicSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  age: z.number().min(18).max(100),
})

// 复杂验证
const complexSchema = z.object({
  profile: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    bio: z.string().max(500).optional(),
  }),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().regex(/^1[3-9]\d{9}$/),
  }),
  skills: z.array(z.string()).min(1),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'auto']),
    notifications: z.array(z.enum(['email', 'sms', 'push'])),
  }),
})

// 条件验证
const conditionalSchema = z
  .object({
    type: z.enum(['personal', 'company']),
    name: z.string().min(1),
    companyName: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === 'company') {
        return !!data.companyName
      }
      return true
    },
    {
      message: '公司类型必须填写公司名称',
      path: ['companyName'],
    }
  )
```

## 最佳实践

### 1. 合理的验证时机

```typescript
// 对于用户输入频繁的字段，建议只在失焦时验证
<el-headless-form
  :validate-on-change="false"
  :validate-on-blur="true"
  :validate-on-input="false"
>
```

### 2. 复用验证 Schema

```typescript
// 定义可复用的 schema 片段
const userProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})

const emailSchema = z.object({
  email: z.string().email(),
})

// 组合使用
const registrationSchema = userProfileSchema.merge(emailSchema).extend({
  password: z.string().min(8),
})
```

### 3. 错误消息国际化

```typescript
const schema = z.object({
  username: z.string().min(3, t('validation.username.min')),
  email: z.string().email(t('validation.email.invalid')),
})
```

### 4. 自定义验证器

```typescript
const schema = z.object({
  username: z
    .string()
    .min(3)
    .refine(async (username) => {
      // 异步验证用户名是否已存在
      const exists = await checkUsernameExists(username)
      return !exists
    }, '用户名已存在'),
})
```
