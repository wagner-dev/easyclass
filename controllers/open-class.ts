import { Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import { Error, DayConfig } from '../protocols/index'
import {
  EnterAccountOnPageAndWarn,
  FindKeywordInChatAndWarn
} from './index'
import {
  useStealthPlugin,
  SetNavigationTimeout
} from '../config/index'
import {
  WaitLoad,
  SetResponse,
  ClickButton
} from '../services/index'

const OpenBrowser = async () => {
  const browser = await puppeteer.launch({ headless: false })
  return browser
}

const OpenLoginPageInBrowser = async (browser: Browser) => {
  const page = await browser.newPage()
  const LOGIN_PAGE_LINK = 'https://accounts.google.com/signin/v2/identifier?continue=https://apps.google.com/meet/'
  await page.goto(LOGIN_PAGE_LINK)
  return page
}

const RedirectToClassPageAndWarn = async (page: Page, { code }: DayConfig) => {
  SetResponse('[Redirecionando para link da aula]')

  const CLASS_LINK = `https://meet.google.com/${code}`
  await page.goto(CLASS_LINK)
  await WaitLoad(page)
}

const EnterClassAndWarn = async (page: Page) => {
  SetResponse('[Entrando em aula]')

  await ClickButton(page, { buttonIdentifier: '.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt' })
  await WaitLoad(page)
}

const HandleOpenClassOnPage = async (configClass: DayConfig) => {
  try {
    await useStealthPlugin()
    const browser = await OpenBrowser()
    const page = await OpenLoginPageInBrowser(browser)
    await SetNavigationTimeout(page)
    await EnterAccountOnPageAndWarn(page)
    await RedirectToClassPageAndWarn(page, configClass)
    await EnterClassAndWarn(page)
    await FindKeywordInChatAndWarn(page)
  } catch (error) {
    const { message } = error as Error
    SetResponse(message)
  }
}

export default HandleOpenClassOnPage
