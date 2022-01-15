import { Page } from 'puppeteer'

const ClickButton = async (page: Page, buttonIdentifier: string) => {
    await page.click(buttonIdentifier)
}

export default ClickButton