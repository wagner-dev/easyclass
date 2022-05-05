import config from '../easyclassconfig'
import ValidateConfig from '../validation/validator'
import StartSystem from '../controllers/system-startup'
import { SetResponse } from '../services/index'

const SetErrorResponse = (messages: string[] = ['Ocorreu um erro']) => {
  messages?.forEach(message => SetResponse(message))
}

(async () => {
  try {
    await ValidateConfig(config)
    StartSystem()
  } catch (errorData) {
    const { errors } = errorData as { errors: string[] }
    SetErrorResponse(errors)
  }
})()
