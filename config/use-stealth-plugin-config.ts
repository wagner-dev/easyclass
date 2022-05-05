import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

const useStealthPlugin = () => {
  puppeteer.use(StealthPlugin())
}

export { useStealthPlugin }
