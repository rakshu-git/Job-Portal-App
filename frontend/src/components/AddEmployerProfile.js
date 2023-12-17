import { useDispatch} from "react-redux"
import { startAddEmployer } from "../actions/employerAction"
import EmployerProfile from "./EmployerProfile"
import { useNavigate } from "react-router-dom"

function AddEmployerProfile(){
    const dispatch = useDispatch()
   
    const navigate=useNavigate()
   
    const navigation=()=>{
        navigate('/view-profile')
    }

    const submitForm = (formData) => {
      dispatch(startAddEmployer(formData,navigation))
    }
    return(
        <div>
         <EmployerProfile submitForm={submitForm}/>
        </div>
    )
}
export default AddEmployerProfile