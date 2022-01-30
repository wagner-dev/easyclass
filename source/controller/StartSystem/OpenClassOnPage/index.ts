import { Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { Error } from '../../../../types/error/index'
import { DayConfig } from '../../../../types/config/index'
import config from '../../../../easyclassconfig'
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

const EnterAccountOnPageAndWarn = async (page: Page) => {
    const { authorization: { email, password} } = config

    SetResponse("[Fazendo login no google]")

    await WriteEmail(email, page)
    await ClickButton(page, { buttonIdentifier: ".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b" })
    await WaitLoad(page)
    await WritePassword(password, page)
    await ClickButton(page, { buttonIdentifier: ".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b" })
    await WaitLoad(page)
}


const RedirectToClassPageAndWarn = async (page: Page, { code }: DayConfig) => {
    SetResponse("[Redirecionando para link da aula]")
    
    const CLASS_LINK = `https://meet.google.com/${ code }`
    await page.goto(CLASS_LINK)
    await WaitLoad(page)
}

const EnterClassAndWarn = async (page: Page) => {
    SetResponse('[Entrando em aula]')

    await ClickButton(page, { buttonIdentifier: '.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt'})
    await WaitLoad(page)
}

const OpenChat = async (page: Page) => {
    await ClickButton(page, { buttonIdentifier: 'button.VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc[data-tooltip-id=tt-c11]'})   
}

const FindKeywordEverySecondAndWarn = async (page: Page) => {
    const { preference: { find_word_in_chat: { keyword } } } = config

    const clientCode = (keyword: string[]) => {
        const ValidateChat = (chat: any) => {
            const validChat = chat.length
            if(validChat) {
                return true
            }
            throw { message: 'Nenhuma mensagem no chat' }
        }
        const FindLastMessageInChat = (messages: any) => {
            const LAST_MESSAGE_POSITION = messages.length-1
            const lastMessage = messages[LAST_MESSAGE_POSITION].innerText
            return lastMessage
        }
        
        const CheckKeywordInMessage = (message: string | any) => {
            const messageHasKeyword = keyword.includes(message)
            if(messageHasKeyword){
                return true
            }
            throw { message: 'Nenhuma palavra-chave na mensagem' }
        }

        const StopFindKeywordEverySecond = () => clearInterval(interval)

        const Warn = () => {
            let context = new AudioContext(),
            oscillator = context.createOscillator()

            oscillator.type = 'sine'
            oscillator.connect(context.destination)
            oscillator.start()

            const ALERT_MESSAGE =  "ALERTA: foi encontrado uma palavra-chave(configuradas no arquivo autoclassconfig.ts) na última mensagem do bate-papo."

            console.log(ALERT_MESSAGE)
            alert(ALERT_MESSAGE)
            
            return oscillator
        }

        const StopWarn = (oscillator: any) => oscillator.stop()
        
        const HandleFindKeyword = () => {
            try{
                const messagesChat = document.querySelectorAll('.oIy2qc')
    
                ValidateChat(messagesChat)
                const lastMessage = FindLastMessageInChat(messagesChat)
                CheckKeywordInMessage(lastMessage)
                StopFindKeywordEverySecond()
                const warn = Warn()
                StopWarn(warn)
            }
            catch(error){
                return false
            }
        }
        const FindKeywordEverySecond = () => {
            HandleFindKeyword()
            const TIME = 1000
            const interval = setInterval(HandleFindKeyword, TIME)
            return interval
        }
        const interval = FindKeywordEverySecond()

    }

    await page.evaluate(clientCode, keyword)
}   

const FindKeywordInChatAndWarn = async (page: Page) => {
    SetResponse('[Procurando palavras-chaves no bate-papo]')

    await OpenChat(page)
    await FindKeywordEverySecondAndWarn(page)
}

const HandleOpenClassOnPage = async (configClass: DayConfig) => {
    try{    
        const browser = await OpenBrowser()
        const page = await OpenLoginPageInBrowser(browser)
        await SetNavigationTimeout(page)
        await EnterAccountOnPageAndWarn(page)
        await RedirectToClassPageAndWarn(page, configClass)
        await EnterClassAndWarn(page)
        await FindKeywordInChatAndWarn(page)
    }
    catch(error){
        const { message } = error as Error
        SetResponse(message)
    }
}


export default HandleOpenClassOnPage