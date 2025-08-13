# Play 开发调试环境

## 📖 简介

Play 是 @sheryuwei/plus 组件库的开发调试环境，提供了一个独立的 Vue 应用来测试和调试组件。它支持热重载、动态路由加载，让开发者能够快速验证组件功能和样式。

## 🚀 快速开始

### 启动开发服务器

```bash
# 在项目根目录
pnpm dev

# 或者在 play 目录下
cd play
pnpm dev
```

服务器将启动在 `http://localhost:3001/`

### 基本使用

1. **默认页面**：访问 `http://localhost:3001/` 加载 `src/App.vue`
2. **自定义页面**：访问 `http://localhost:3001/YourFileName` 加载 `src/YourFileName.vue`

## 📁 目录结构

```
play/
├── src/                    # 测试文件目录
│   └── App.vue            # 默认测试文件
├── styles/                # 样式文件
│   └── custom.scss        # 自定义样式配置
├── scripts/               # 脚本文件
│   └── init.mjs          # 初始化脚本
├── index.html             # HTML 模板
├── main.ts                # 入口文件
├── vite.config.mts        # Vite 配置
└── package.json           # 依赖配置
```

## 🎯 功能特性

### 动态路由加载

Play 环境使用智能的动态加载机制：

```typescript
// main.ts 核心逻辑
const apps = import.meta.glob('./src/*.vue')
const name = location.pathname.replace(/^\//, '') || 'App'
const file = apps[`./src/${name}.vue`]
```

- 根据 URL 路径自动加载对应的 Vue 文件
- 支持无刷新切换不同的测试页面
- 自动回退到默认 App.vue

### 组件库集成

- 🎨 **完整主题支持**：包含 dark 模式和所有组件样式
- 🔧 **开发模式**：使用源码进行开发，支持热重载
- 📦 **自动导入**：通过 `unplugin-vue-components` 自动导入组件

### 样式配置

```scss
// styles/custom.scss
@forward '@element-plus/theme-chalk/src/mixins/config.scss' with (
  $namespace: 'ep' // 可自定义命名空间
);
```

## 📝 使用示例

### 创建基础组件测试

```vue
<!-- src/ButtonTest.vue -->
<template>
  <div class="test-container">
    <h2>Button 组件测试</h2>

    <!-- 基础按钮 -->
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>

    <!-- 带图标的按钮 -->
    <el-button type="primary" :icon="Edit">编辑</el-button>
    <el-button type="primary" :icon="Share">分享</el-button>

    <!-- 不同尺寸 -->
    <el-button size="large">大型按钮</el-button>
    <el-button>默认按钮</el-button>
    <el-button size="small">小型按钮</el-button>
  </div>
</template>

<script setup lang="ts">
import { Edit, Share } from '@element-plus/icons-vue'
</script>

<style scoped>
.test-container {
  padding: 20px;
}
.el-button {
  margin: 5px;
}
</style>
```

访问：`http://localhost:3001/ButtonTest`

### 创建表单组件测试

```vue
<!-- src/FormTest.vue -->
<template>
  <div class="form-test">
    <h2>表单组件测试</h2>

    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="密码">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="爱好">
        <el-checkbox-group v-model="form.hobbies">
          <el-checkbox label="reading">阅读</el-checkbox>
          <el-checkbox label="music">音乐</el-checkbox>
          <el-checkbox label="sports">运动</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from '@sheryuwei/plus'

const form = reactive({
  username: '',
  password: '',
  gender: '',
  hobbies: [],
})

const onSubmit = () => {
  console.log('表单数据:', form)
  ElMessage.success('提交成功！')
}

const onReset = () => {
  Object.assign(form, {
    username: '',
    password: '',
    gender: '',
    hobbies: [],
  })
  ElMessage.info('表单已重置')
}
</script>

<style scoped>
.form-test {
  padding: 20px;
  max-width: 600px;
}
</style>
```

访问：`http://localhost:3001/FormTest`

### 创建主题测试

```vue
<!-- src/ThemeTest.vue -->
<template>
  <div class="theme-test">
    <h2>主题模式测试</h2>

    <el-switch
      v-model="isDark"
      active-text="深色模式"
      inactive-text="浅色模式"
      @change="toggleTheme"
    />

    <div class="demo-section">
      <el-card shadow="hover">
        <template #header>
          <span>卡片标题</span>
        </template>
        <p>这是卡片内容，用于测试主题效果。</p>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)

const toggleTheme = (value: boolean) => {
  if (value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<style scoped>
.theme-test {
  padding: 20px;
}
.demo-section {
  margin-top: 20px;
}
</style>
```

访问：`http://localhost:3001/ThemeTest`

## 🛠️ 开发技巧

### 1. 快速原型开发

```vue
<!-- src/Prototype.vue -->
<template>
  <div class="prototype">
    <!-- 在这里快速测试新想法 -->
    <el-button @click="handleClick">测试按钮</el-button>
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('Hello from prototype!')
}
</script>
```

### 2. 组件性能测试

```vue
<!-- src/Performance.vue -->
<template>
  <div>
    <el-button @click="createItems">创建 1000 个项目</el-button>
    <el-table :data="tableData" height="400">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="email" label="邮箱" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([])

const createItems = () => {
  const start = performance.now()
  tableData.value = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `用户 ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }))
  const end = performance.now()
  console.log(`创建耗时: ${end - start}ms`)
}
</script>
```

### 3. API 调试

```vue
<!-- src/ApiTest.vue -->
<template>
  <div>
    <el-button @click="testMessage">测试 Message</el-button>
    <el-button @click="testNotification">测试 Notification</el-button>
    <el-button @click="testMessageBox">测试 MessageBox</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElNotification, ElMessageBox } from '@sheryuwei/plus'

const testMessage = () => {
  ElMessage.success('这是一条成功消息')
}

const testNotification = () => {
  ElNotification({
    title: '通知标题',
    message: '这是通知内容',
    type: 'info',
  })
}

const testMessageBox = async () => {
  try {
    await ElMessageBox.confirm('确定要删除吗？', '警告', {
      type: 'warning',
    })
    ElMessage.success('删除成功')
  } catch {
    ElMessage.info('取消删除')
  }
}
</script>
```

## 🎨 样式调试

### 自定义主题变量

```scss
// styles/custom.scss
@forward '@element-plus/theme-chalk/src/mixins/config.scss' with (
    $namespace: 'ep',
    $primary-color: #ff6b6b,
    // 自定义主色
    $success-color: #51cf66,
    // 自定义成功色
  );
```

### CSS 变量调试

```vue
<template>
  <div class="custom-theme">
    <el-button type="primary">自定义主题按钮</el-button>
  </div>
</template>

<style scoped>
.custom-theme {
  --el-color-primary: #ff6b6b;
  --el-color-primary-light-3: #ff8e8e;
  --el-color-primary-light-5: #ffb1b1;
  --el-color-primary-light-7: #ffd4d4;
  --el-color-primary-light-8: #ffe2e2;
  --el-color-primary-light-9: #fff1f1;
  --el-color-primary-dark-2: #e55555;
}
</style>
```

## 🔍 调试工具

### Vite 插件

Play 环境配置了有用的 Vite 插件：

- **vite-plugin-inspect**：访问 `http://localhost:3001/__inspect/` 查看模块依赖
- **vite-plugin-mkcert**：支持 HTTPS 开发
- **unplugin-vue-components**：自动导入组件

### Vue DevTools

推荐安装 Vue DevTools 浏览器扩展来调试组件状态和性能。

## 📚 最佳实践

### 1. 文件命名

- 使用 PascalCase：`ButtonTest.vue`, `FormDemo.vue`
- 功能明确：`PerformanceTest.vue`, `ThemePreview.vue`

### 2. 代码组织

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 导入
import { ref, reactive } from 'vue'
import { ElMessage } from '@sheryuwei/plus'

// 响应式数据
const data = ref('')

// 方法
const handleClick = () => {
  // 处理逻辑
}
</script>

<style scoped>
/* 组件样式 */
</style>
```

### 3. 测试覆盖

- 测试不同的 props 组合
- 测试边界情况
- 测试响应式行为
- 测试无障碍性

## 🐛 常见问题

### 1. 样式不生效

确保正确导入样式文件：

```typescript
// main.ts
import '@element-plus/theme-chalk/src/dark/css-vars.scss'
```

### 2. 组件找不到

检查是否正确配置了组件解析：

```typescript
// vite.config.mts
Components({
  resolvers: [
    ElementPlusResolver({
      importStyle: 'sass',
    }),
  ],
})
```

### 3. 热重载失效

重启开发服务器：

```bash
pnpm dev
```

## 📞 获取帮助

- 查看组件文档：运行 `pnpm run docs:dev`
- 查看示例代码：`docs/examples/` 目录
- GitHub Issues：提交问题和建议

---

**Happy Coding! 🎉**

> 这个 Play 环境让组件开发变得更加高效和有趣。尽情探索和实验吧！
