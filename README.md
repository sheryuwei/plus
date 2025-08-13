<p align="center">
  <img width="300px" src="https://user-images.githubusercontent.com/10731096/95823103-9ce15780-0d5f-11eb-8010-1bd1b5910d4f.png">
</p>

<h1 align="center">@sheryuwei/plus</h1>

<p align="center">
  <a href="https://www.npmjs.org/package/@sheryuwei/plus">
    <img src="https://img.shields.io/npm/v/@sheryuwei/plus.svg" alt="npm version" />
  </a>
  <a href="https://github.com/sheryuwei/plus">
    <img src="https://img.shields.io/badge/node-%20%3E%3D%2020-47c219" alt="node version" />
  </a>
  <a href="https://npmcharts.com/compare/@sheryuwei/plus?minimal=true">
    <img src="https://img.shields.io/npm/dm/@sheryuwei/plus.svg" alt="downloads" />
  </a>
  <a href="https://github.com/sheryuwei/plus/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@sheryuwei/plus.svg" alt="license" />
  </a>
  <br>
</p>

<p align="center">
  <b>基于 Element Plus 的 Vue 3 组件库</b><br>
  一个功能完整、设计优美的 Vue.js 3.0 组件库
</p>

<p align="center">
  <a href="https://github.com/sheryuwei/plus">🏠 主页</a> |
  <a href="#-安装">📦 安装</a> |
  <a href="#-快速开始">🚀 快速开始</a> |
  <a href="#-组件">🧩 组件</a> |
  <a href="#-开发">🛠️ 开发</a>
</p>

---

## ✨ 特性

- 🌈 **丰富的组件**：80+ 个高质量组件，覆盖大部分业务场景
- 🎨 **精美设计**：遵循现代设计规范，提供优雅的用户体验
- 🔧 **TypeScript**：使用 TypeScript 开发，提供完整的类型定义
- 🌍 **国际化**：内置 80+ 种语言包
- 🎭 **主题定制**：支持深度主题定制和动态切换
- 📱 **响应式**：支持移动端和桌面端
- ⚡ **现代构建**：基于 Vite，享受极速的开发体验
- 🛡️ **可靠性**：完善的测试覆盖和持续集成

## 📦 安装

### 使用包管理器

```bash
# npm
npm install @sheryuwei/plus

# yarn
yarn add @sheryuwei/plus

# pnpm (推荐)
pnpm add @sheryuwei/plus
```

### CDN

```html
<!-- 引入样式 -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@sheryuwei/plus/dist/index.css"
/>

<!-- 引入组件库 -->
<script src="https://unpkg.com/@sheryuwei/plus/dist/index.full.js"></script>
```

## 🚀 快速开始

### 完整引入

```typescript
// main.ts
import { createApp } from 'vue'
import ElementPlus from '@sheryuwei/plus'
import '@sheryuwei/plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

### 按需引入

#### 自动导入（推荐）

首先安装 `unplugin-vue-components` 和 `unplugin-auto-import`：

```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

然后在 `vite.config.ts` 中配置：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

#### 手动导入

```vue
<template>
  <el-button type="primary" @click="handleClick">
    Hello @sheryuwei/plus
  </el-button>
</template>

<script setup lang="ts">
import { ElButton, ElMessage } from '@sheryuwei/plus'

const handleClick = () => {
  ElMessage.success('Hello World!')
}
</script>
```

### Nuxt.js 集成

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@element-plus/nuxt'],
})
```

## 🧩 组件

### 基础组件

- **Button** 按钮
- **Icon** 图标
- **Link** 链接
- **Text** 文本
- **Scrollbar** 滚动条

### 表单组件

- **Input** 输入框
- **Select** 选择器
- **Radio** 单选框
- **Checkbox** 多选框
- **Switch** 开关
- **Slider** 滑块
- **TimePicker** 时间选择器
- **DatePicker** 日期选择器
- **Upload** 文件上传
- **Form** 表单

### 数据展示

- **Table** 表格
- **Pagination** 分页
- **Tree** 树形控件
- **Progress** 进度条
- **Badge** 徽章
- **Avatar** 头像
- **Card** 卡片
- **Descriptions** 描述列表

### 导航组件

- **Menu** 导航菜单
- **Tabs** 标签页
- **Breadcrumb** 面包屑
- **Steps** 步骤条
- **Dropdown** 下拉菜单

### 反馈组件

- **Message** 消息提示
- **MessageBox** 弹框
- **Notification** 通知
- **Dialog** 对话框
- **Drawer** 抽屉
- **Popconfirm** 气泡确认框
- **Popover** 弹出框
- **Tooltip** 文字提示

### 布局组件

- **Container** 布局容器
- **Row/Col** 栅格
- **Space** 间距
- **Divider** 分割线

### 其他组件

- **Loading** 加载
- **Empty** 空状态
- **Result** 结果
- **Skeleton** 骨架屏
- **Tour** 漫游式引导
- **Watermark** 水印

> 查看 [完整组件列表](https://github.com/sheryuwei/plus/tree/master/packages/components)

## 🎨 主题定制

### CSS 变量

```css
:root {
  --el-color-primary: #409eff;
  --el-color-success: #67c23a;
  --el-color-warning: #e6a23c;
  --el-color-danger: #f56c6c;
  --el-color-info: #909399;
}
```

### Sass 变量

```scss
@forward '@sheryuwei/plus/theme-chalk/src/mixins/config.scss' with (
  $colors: (
    'primary': (
      'base': #409eff,
    ),
    'success': (
      'base': #67c23a,
    ),
  )
);
```

### 深色模式

```typescript
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
```

## 🌍 国际化

```typescript
import { createApp } from 'vue'
import ElementPlus from '@sheryuwei/plus'
import zhCn from '@sheryuwei/plus/es/locale/lang/zh-cn'
import en from '@sheryuwei/plus/es/locale/lang/en'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn, // 或 en
})
```

## 🛠️ 开发

### 环境要求

- Node.js >= 20
- pnpm >= 9.5.0

### 克隆项目

```bash
git clone https://github.com/sheryuwei/plus.git
cd plus
```

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动组件调试环境
pnpm dev

# 启动文档站点
pnpm run docs:dev
```

### 构建

```bash
# 构建组件库
pnpm build

# 构建文档
pnpm run docs:build
```

### 测试

```bash
# 运行单元测试
pnpm test

# 运行测试覆盖率
pnpm test:coverage

# 运行 SSR 测试
pnpm test:ssr
```

### 代码规范

```bash
# 代码格式化
pnpm format

# 代码检查
pnpm lint

# 代码检查并修复
pnpm lint:fix
```

## 📁 项目结构

```
plus/
├── docs/                    # 文档站点
├── packages/
│   ├── components/          # 组件源码
│   ├── constants/           # 常量定义
│   ├── directives/          # 指令
│   ├── element-plus/        # 主包入口
│   ├── hooks/               # Composition API
│   ├── locale/              # 国际化
│   ├── test-utils/          # 测试工具
│   ├── theme-chalk/         # 主题样式
│   └── utils/               # 工具函数
├── play/                    # 组件调试环境
├── ssr-testing/             # SSR 测试
├── internal/                # 内部工具
└── scripts/                 # 构建脚本
```

## 🤝 贡献

我们欢迎所有贡献！请先阅读 [贡献指南](CONTRIBUTING.md)。

### 提交规范

我们使用 [Conventional Commits](https://conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 开发流程

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'feat: add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📜 更新日志

详细的更新日志请查看 [CHANGELOG.md](CHANGELOG.md)。

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

- 感谢 [Element Plus](https://github.com/element-plus/element-plus) 提供的优秀基础
- 感谢 [Vue.js](https://vuejs.org/) 团队
- 感谢所有贡献者

## 📞 支持

- 📚 [文档站点](https://github.com/sheryuwei/plus)
- 🐛 [问题反馈](https://github.com/sheryuwei/plus/issues)
- 💬 [讨论区](https://github.com/sheryuwei/plus/discussions)

---

<p align="center">
  如果这个项目对您有帮助，请给我们一个 ⭐️ 支持！
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/sheryuwei">sheryuwei</a>
</p>
