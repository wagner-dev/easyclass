import { Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { Error } from '../../../../types/error/index'
import { DayConfig } from '../../../../types/config/index'
import config from '../../../../schoolconfig'
import SetResponse from '../../../services/SetResponse/index'

puppeteer.use(StealthPlugin())

const OpenBrowser = async () => {
    const browser = await puppeteer.launch({ headless: false })
    return browser
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
const WaitLoad = async (page: Page) => await page.waitForTimeout(2000)

const EnterAccountOnPage = async (page: Page) => {
    const { authorization: { email, password} } = config
    await WriteEmail(email, page)
    await ClickNextButton(page)
    await WaitLoad(page)
    await WritePassword(password, page)
    await ClickNextButton(page)
}


const HandleOpenClassOnPage = async (configClass: DayConfig) => {
    try{    
        const browser = await OpenBrowser()
        const page = await OpenLoginPageInBrowser(browser)
        await EnterAccountOnPage(page)
        
    }
    catch(error){
        const { message } = error as Error
        SetResponse(message)
    }
}


export default HandleOpenClassOnPage