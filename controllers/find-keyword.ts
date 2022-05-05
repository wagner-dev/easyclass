import { Page } from 'puppeteer'
import config from '../easyclassconfig'
import {
  SetResponse,
  ClickButton
} from '../services/index'

const OpenChat = async (page: Page) => {
  await ClickButton(page, { buttonIdentifier: 'button.VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc[data-tooltip-id=tt-c11]' })
}

const FindKeywordEverySecondAndWarn = async (page: Page) => {
  const { preference: { find_word_in_chat: { keyword } } } = config

  const clientCode = (keyword: string[]) => {
    const ValidateChat = (chat: any) => {
      const validChat = chat.length
      if (validChat) {
        return true
      }
      throw { message: 'Nenhuma mensagem no chat' }
    }
    const FindLastMessageInChat = (messages: any) => {
      const LAST_MESSAGE_POSITION = messages.length - 1
      const lastMessage = messages[LAST_MESSAGE_POSITION].innerText
      return lastMessage
    }

    const CheckKeywordInMessage = (message: string | any) => {
      const messageHasKeyword = keyword.includes(message)
      if (messageHasKeyword) {
        return true
      }
      throw { message: 'Nenhuma palavra-chave na mensagem' }
    }

    const StopFindKeywordEverySecond = () => clearInterval(interval)

    const Warn = () => {
      const context = new AudioContext()
      const oscillator = context.createOscillator()

      oscillator.type = 'sine'
      oscillator.connect(context.destination)
      oscillator.start()

      const ALERT_MESSAGE = 'ALERTA: foi encontrado uma palavra-chave(configuradas no arquivo autoclassconfig.ts) na última mensagem do bate-papo.'

      console.log(ALERT_MESSAGE)
      alert(ALERT_MESSAGE)

      return oscillator
    }

    const StopWarn = (oscillator: any) => oscillator.stop()

    const HandleFindKeyword = () => {
      try {
        const messagesChat = document.querySelectorAll('.oIy2qc')

        ValidateChat(messagesChat)
        const lastMessage = FindLastMessageInChat(messagesChat)
        CheckKeywordInMessage(lastMessage)
        StopFindKeywordEverySecond()
        const warn = Warn()
        StopWarn(warn)
      } catch (error) {
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

export { FindKeywordInChatAndWarn }
