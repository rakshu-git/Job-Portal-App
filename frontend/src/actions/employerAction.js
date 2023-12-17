import axios from "axios"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export const SET_EMPLOYER = "SET_EMPLOYER"
export const GET_EMPLOYER = "GET_EMPLOYER"
export const UPDATE_EMPLOYERPROFILE = "UPDATE_EMPLOYERPROFILE"
export const DELETE_EMPLOYERPROFILE = "DELETE_EMPLOYERPROFILE"
export const CLEAR_PROFILE = "CLEAR_PROFILE"

export const setAddEmployer = (user)=>{
    return  {
        type:SET_EMPLOYER,
        payload:user
    }
}

export const setGetEmployer = (user)=>{
    return  {
        type:GET_EMPLOYER,
        payload:user
    }
}

export const setEditEmployerProfile=(user)=>{
    return{
         type:UPDATE_EMPLOYERPROFILE,
         payload:user
       
    }
}

export const setDeleteEmployerProfile=(user)=>{
    return{
         type:DELETE_EMPLOYERPROFILE,
         payload:user
       
    }
}

export const setClearProfile=()=>{
    console.log('nishu')
    return{
        type:CLEAR_PROFILE

    }
}



export const startAddEmployer =(formData,navigation)=>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.post('http://localhost:3220/api/employer',formData,{headers:{"Authorization":localStorage.getItem('token')}})
                navigation()
                dispatch(setAddEmployer(response.data))
                toast.success('successfull!')
            }catch(e){
                console.log(e)
            }
        })()
    }
}

export const startGetEmployerProfile =()=>{
    return (dispatch)=>{
        (async ()=>{
            try{
                console.log('ni')
                const response = await axios.get('http://localhost:3220/api/employer',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setGetEmployer(response.data))
            }catch(e){
                console.log(e)
            }
        })()
    }
}

export const startEditEmployerProfile= (formData,handleEdit,id)=>{
    return async (dispatch)=>{
        try{
            const response=await axios.put(`http://localhost:3220/api/employer/${id}`,formData,{headers:{"Authorization":localStorage.getItem('token')}})
            dispatch(setEditEmployerProfile(response.data))
            handleEdit()
            toast.success('successfull!')
           }catch(error){
            alert(error)
          }
       
        }
}

export const startDeleteEmployerProfile= (id)=>{
    return async (dispatch)=>{
        try{
            const response=await axios.delete(`http://localhost:3220/api/employer/${id}`,{headers:{"Authorization":localStorage.getItem('token')}})
            dispatch(setDeleteEmployerProfile(response.data))
           }catch(error){
            alert(error)
          }
       
        }
}

