import { Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { Error } from '../../../../types/error/index'
import { DayConfig } from '../../../../types/config/index'
import config from '../../../../schoolconfig'
import WaitLoad from '../../../services/WaitLoad/index'
import SetResponse from '../../../services/SetResponse/index'
import ClickButton from '../../../services/ClickButton/index'

puppeteer.use(StealthPlugin())

const OpenBrowser = async () => {
    const browser = await puppeteer.launch({ headless: false })
    return browser
}

const SetNavigationTimeout = async (page: Page) => {
    const TIMEOUT = 0 // in milliseconds
    await page.setDefaultNavigationTimeout(TIMEOUT)
}

const OpenLoginPageInBrowser = async (browser: Browser) => {
    const page = await browser.newPage()
    const LOGIN_PAGE_LINK =  "https://accounts.google.com/signin/v2/identifier?continue=https://apps.google.com/meet/"
    await page.goto(LOGIN_PAGE_LINK)

    return page
}

const WriteEmail = async (email: string, page: Page) => {
    const FIELD_IDENTIFIER = "input[type=email]"
    
    await page.type(FIELD_IDENTIFIER, email)
}

const WritePassword = async (password: string, page: Page) => {
    const FIELD_IDENTIFIER = "input[type=password]"
    
    await page.type(FIELD_IDENTIFIER, password)
}

const ClickNextButton = async (page: Page) => {
    const BUTTON_IDENTIFIER = ".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b"
    await page.click(BUTTON_IDENTIFIER)
}
const EnterAccountOnPage = async (page: Page) => {
    const { authorization: { email, password} } = config
    await WriteEmail(email, page)
    await ClickNextButton(page)
    await WaitLoad(page)
    await WritePassword(password, page)
    await ClickNextButton(page)
    await WaitLoad(page)
}


const RedirectToClassPage = async (page: Page, { code }: DayConfig) => {
    const CLASS_LINK = `https://meet.google.com/${ code }`
    await page.goto(CLASS_LINK)
    await WaitLoad(page)
}

const ClickEnterButton = async (page: Page) => {
    const BUTTON_IDENTIFIER = '.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt'
    await page.click(BUTTON_IDENTIFIER)
}

const EnterClass = async (page: Page) => {
    await ClickEnterButton(page)
}

const OpenChat = async (page: Page) => {
    const BUTTON_IDENTIFIER = await page.$$('.VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc')
    console.log(BUTTON_IDENTIFIER)
    // await ClickButton(page, BUTTON_IDENTIFIER)
}

const FindWordInChatAndWarn = async (page: Page) => {
    await OpenChat(page)

}

const HandleOpenClassOnPage = async (configClass: DayConfig) => {
    try{    
        const browser = await OpenBrowser()
        const page = await OpenLoginPageInBrowser(browser)
        await SetNavigationTimeout(page)
        await EnterAccountOnPage(page)
        await RedirectToClassPage(page, configClass)
        await EnterClass(page)
        await FindWordInChatAndWarn(page)
    }
    catch(error){
        const { message } = error as Error
        SetResponse(message)
    }
}


export default HandleOpenClassOnPage