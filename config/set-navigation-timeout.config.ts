import { Page } from 'puppeteer'

const SetNavigationTimeout = async (page: Page) => {
  const TIMEOUT = 0 // in milliseconds
  await page.setDefaultNavigationTimeout(TIMEOUT)
}

export { SetNavigationTimeout }
