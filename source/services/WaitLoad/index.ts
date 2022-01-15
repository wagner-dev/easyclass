import { Page } from 'puppeteer'
import { WaitLoad } from '../../../types/services/WaitLoad'

const WaitLoad = async (page: Page, { timeout }: WaitLoad={ timeout: 3000 }) => {
    await page.waitForTimeout(timeout)
}

export default WaitLoad