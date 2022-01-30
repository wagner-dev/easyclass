import { format } from 'date-fns'
import { Schedule } from '../../../types/config/index'
import { Error } from '../../../types/error/index'
import config from '../../../easyclassconfig'
import SetResponse from '../../services/SetResponse/index'
import OpenClassOnPage from './OpenClassOnPage/index'


const CheckTime = (DATE_NOW: Date, dayName: string, scredule: Schedule) => {
    const FORMATTED_TIME = format(DATE_NOW, 'HH:mm')
    const haveClassNow = scredule[dayName].find(classData => classData.beginning == FORMATTED_TIME)
    if(haveClassNow) {
        const classData = haveClassNow
        return classData
    }
    throw "Não tem aula configurada para agora"
}

const CheckDayName = (DATE_NOW: Date) => {
    const DAY_NAME = format(DATE_NOW, 'eeee').toLocaleLowerCase()
    const VALID_DAY_NAMES = ["monday", "tuesday", "wednesday", "thursday", "friday"]
    
    const dayNameIsValid = VALID_DAY_NAMES.includes(DAY_NAME) 
    if(dayNameIsValid){
        return DAY_NAME
    }
    throw { message: "Só possui aulas de segunda à sexta. Hoje não tem aula" }
}

const CheckIfHaveClassAndWarn = () => {
    const SCREDULE = config.schedule
    const DATE_NOW = new Date()
    
    try{
        const dayName = CheckDayName(DATE_NOW)
        const classData = CheckTime(DATE_NOW, dayName, SCREDULE)
        
        const WARN_MESSAGE = `Aula disponível encontrada: ${classData.matter}. [Entrando em aula]`
        SetResponse(WARN_MESSAGE)

        return classData
    }
    catch{
        return false
    }
}   

const HandleSystemStartup = () => {
    try{
        
        const classIsFound = CheckIfHaveClassAndWarn()
        if(classIsFound){
            const configClass = classIsFound
            OpenClassOnPage(configClass)
        }
    }
    catch(error){
        const { message } = error as Error
        SetResponse(message)
    }
}

const CheckAndBootEveryMinute = () => {
    const SECOND = 1000 * 59 // 1 minute
    setInterval(HandleSystemStartup, SECOND)
}

const StartAndWarn = () => {
    SetResponse("Iniciando")
    SetResponse("Procurando aulas disponíveis no seu horário(configuradas no arquivo easyclassconfig) para serem iniciadas. [verificando]")
    
    CheckAndBootEveryMinute()
}
StartAndWarn()


export default HandleSystemStartup