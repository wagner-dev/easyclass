import { Page } from 'puppeteer'
import { WaitLoadParams } from './protocols/wait-load.type'

const WaitLoad = async (page: Page, { timeout }: WaitLoadParams = { timeout: 3000 }) => {
  await page.waitForTimeout(timeout)
}

export { WaitLoad }
