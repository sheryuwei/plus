import { withInstall } from '@element-plus/utils'
import HeadlessFormItem from './src/headless-form-item.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElHeadlessFormItem: SFCWithInstall<typeof HeadlessFormItem> =
  withInstall(HeadlessFormItem)
export default ElHeadlessFormItem

export * from './src/headless-form-item'
