import config from '../../schoolconfig'
import ValidateConfig from './ValidateConfig/index'
import StartSystem from '../controller/StartSytem/index'
import SetResponse from '../services/SetResponse/index'

const SetErrorResponse = (messages: string[]=["Ocorreu um erro"]) => {
    messages.forEach(message => SetResponse(message))
}

(async () => { // start
    try{
        await ValidateConfig(config)
        StartSystem()

    }
    catch({ errors }){
        SetErrorResponse(errors)
    }
})()
