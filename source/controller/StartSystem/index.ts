import { format } from 'date-fns'
import config from '../../../schoolconfig'
import { Schedule } from '../../../types/config/index'
import SetResponse from '../../services/SetResponse/index'
import OpenClassOnPage from './OpenClassOnPage/index'

const CheckDayName = (DATE_NOW: Date) => {
    const DAY_NAME = format(DATE_NOW, 'eeee').toLocaleLowerCase()
    const VALID_DAY_NAMES = ["monday", "tuesday", "wednesday", "thursday", "friday"]

    const dayNameIsValid = VALID_DAY_NAMES.includes(DAY_NAME) 
    if(dayNameIsValid){
        return DAY_NAME
    }
    else throw { message: "Só possui aulas de segunda à sexta. Hoje não tem aula" }
}

const CheckTime = (DATE_NOW: Date, dayName: string, scredule: Schedule) => {
    const FORMATTED_TIME = format(DATE_NOW, 'HH:mm')
    const haveClassNow = scredule[dayName].find(classData => classData.beginning == FORMATTED_TIME)
    if(haveClassNow) {
        const classData = haveClassNow

        return classData
    }
    else throw "Não tem aula configurada para agora"
}

const CheckIfHaveClass = () => {
    const SCREDULE = config.schedule
    const DATE_NOW = new Date()
    
    try{
        const dayName = CheckDayName(DATE_NOW)
        const classData = CheckTime(DATE_NOW, dayName, SCREDULE)

        return classData
    }
    catch{
        return false
    }
}   

const HandleSystemStartup = () => {
    try{

        const classIsFound = CheckIfHaveClass()
        if(classIsFound){
            const configClass = classIsFound

            OpenClassOnPage(configClass)
        }
    }
    catch(error){
        const { message } = error as { message: string }
        SetResponse(message)
    }
}


const CheckAndBootEverySecond = () => {
    const SECOND = 1000 * 59 // 1 minute
    setInterval(HandleSystemStartup, SECOND)
}
CheckAndBootEverySecond()



export default HandleSystemStartup