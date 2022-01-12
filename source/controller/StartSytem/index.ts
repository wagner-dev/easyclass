
import SetResponse from '../../services/SetResponse/index'

const CheckIfHaveClass = () => {

}   

const HandleSystemStartup = () => {
    try{
        CheckIfHaveClass()
    }
    catch({ message }){
        SetResponse(message)
    }
}



export default HandleSystemStartup