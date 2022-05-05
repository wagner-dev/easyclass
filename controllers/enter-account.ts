import { Page } from 'puppeteer'
import config from '../easyclassconfig'
import {
  WaitLoad,
  SetResponse,
  ClickButton
} from '../services/index'

const WriteEmail = async (email: string, page: Page) => {
  const FIELD_IDENTIFIER = 'input[type=email]'
  await page.type(FIELD_IDENTIFIER, email)
}

const WritePassword = async (password: string, page: Page) => {
  const FIELD_IDENTIFIER = 'input[type=password]'
  await page.type(FIELD_IDENTIFIER, password)
}

const EnterAccountOnPageAndWarn = async (page: Page) => {
  const { authorization: { email, password } } = config

  SetResponse('[Fazendo login no google]')

  await WriteEmail(email, page)
  await ClickButton(page, { buttonIdentifier: '.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b' })
  await WaitLoad(page)
  await WritePassword(password, page)
  await ClickButton(page, { buttonIdentifier: '.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b' })
  await WaitLoad(page)
}

export { EnterAccountOnPageAndWarn }
