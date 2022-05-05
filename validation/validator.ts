import { Config } from '../protocols/config.type'
import { validationSchema } from './validation-schema'

const ValidateConfig = async (config: Config) => {
  try {
    const data = await validationSchema.validate(config)
    const dataSuccess = {
      data
    }
    return dataSuccess
  } catch ({ errors }) {
    const dataError = {
      errors
    }
    throw dataError
  }
}

export default ValidateConfig
