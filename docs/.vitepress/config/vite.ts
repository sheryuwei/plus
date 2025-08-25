import path from 'path'
import Inspect from 'vite-plugin-inspect'
import UnoCSS from 'unocss/vite'
import mkcert from 'vite-plugin-mkcert'
import glob from 'fast-glob'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { loadEnv } from 'vitepress'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import {
  docPackage,
  epPackage,
  getPackageDependencies,
  projRoot,
} from '@element-plus/build-utils'
import { MarkdownTransform } from '../plugins/markdown-transform'

import type { Plugin, UserConfig } from 'vitepress'

type ViteConfig = Required<UserConfig>['vite']
type ResolveOptions = Required<ViteConfig>['resolve']
type AliasOptions = Required<ResolveOptions>['alias']

const { dependencies: epDeps } = getPackageDependencies(epPackage)
const { dependencies: docsDeps } = getPackageDependencies(docPackage)
const optimizeDeps = [...new Set([...epDeps, ...docsDeps])].filter(
  (dep) =>
    !dep.startsWith('@types/') &&
    !['@element-plus/metadata', 'element-plus', '@sheryuwei/plus'].includes(
      dep
    ) &&
    !['normalize.css'].includes(dep)
)
optimizeDeps.push(
  ...(await glob(['dayjs/plugin/*.js'], {
    cwd: path.resolve(projRoot, 'node_modules'),
    onlyFiles: true,
  }))
)

const alias: AliasOptions = [
  {
    find: '~/',
    replacement: `${path.resolve(__dirname, '../vitepress')}/`,
  },
  ...(process.env.DOC_ENV === 'production'
    ? []
    : [
        {
          find: /^@sheryuwei\/plus(\/(es|lib))?$/,
          replacement: path.resolve(projRoot, 'packages/element-plus/index.ts'),
        },
        {
          find: /^@sheryuwei\/plus\/(es|lib)\/(.*)$/,
          replacement: `${path.resolve(projRoot, 'packages')}/$2`,
        },
        // 保持旧的 element-plus 别名以兼容现有代码
        {
          find: /^element-plus(\/(es|lib))?$/,
          replacement: path.resolve(projRoot, 'packages/element-plus/index.ts'),
        },
        {
          find: /^element-plus\/(es|lib)\/(.*)$/,
          replacement: `${path.resolve(projRoot, 'packages')}/$2`,
        },
      ]),
]

export const getViteConfig = ({ mode }: { mode: string }): ViteConfig => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    server: {
      host: true,
      fs: {
        allow: [projRoot],
      },
    },
    resolve: {
      alias,
    },
    plugins: [
      vueJsx(),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        dirs: ['.vitepress/vitepress/components', 'examples'],

        allowOverrides: true,

        // custom resolvers
        resolvers: [
          // auto import icons
          // https://github.com/antfu/unplugin-icons
          IconsResolver(),
          // Element Plus 组件自动导入
          {
            type: 'component',
            resolve: (name: string) => {
              if (name.startsWith('El')) {
                return {
                  name,
                  from: '@sheryuwei/plus',
                }
              }
            },
          },
        ],

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }) as Plugin,

      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true,
      }) as Plugin,

      UnoCSS({
        inspector: false,
      }),

      MarkdownTransform() as Plugin,
      Inspect(),
      groupIconVitePlugin() as Plugin,
      env.HTTPS ? (mkcert() as Plugin) : undefined,
    ],
    optimizeDeps: {
      include: optimizeDeps,
    },
  }
}
