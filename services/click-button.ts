import { Page } from 'puppeteer'

const ClickButton = async (page: Page, { buttonIdentifier }: { buttonIdentifier: string }) => {
  await page.click(buttonIdentifier)
}

export { ClickButton }
