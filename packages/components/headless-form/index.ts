import { withInstall } from '@element-plus/utils'
import HeadlessForm from './src/headless-form.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElHeadlessForm: SFCWithInstall<typeof HeadlessForm> =
  withInstall(HeadlessForm)
export default ElHeadlessForm

export * from './src/headless-form'
export * from './src/types'
