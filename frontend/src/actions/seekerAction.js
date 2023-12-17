import axios from "axios"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export const SET_SEEKER = "SET_SEEKER"
export const GET_SEEKER = "GET_SEEKER"
export const EDIT_SEEKER = "EDIT_SEEKER"
export const REMOVE_SEEKER = "REMOVE_SEEKER"
export const CLEAR_SEEKER = "CLEAR_SEEKER"

export const setAddSeeker = (user)=>{
    return  {
        type:SET_SEEKER,
        payload:user
    }
}

export const setGetSeeker = (user)=>{
    return  {
        type:GET_SEEKER,
        payload:user
    }
}

export const setEditSeeker = (user)=>{
    return  {
        type:EDIT_SEEKER,
        payload:user
    }
}

export const setDeleteSeeker = (user)=>{
    return  {
        type:REMOVE_SEEKER,
        payload:user
    }
}

export const setClearSeeker=()=>{
    return {
        type:CLEAR_SEEKER
    }
}

export const startAddSeeker =(formData,navigation)=>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.post('http://localhost:3220/api/seeker',formData,{headers:{"Authorization":localStorage.getItem('token')}})
                    dispatch(setAddSeeker(response.data));
                    toast.success('successfull!')
                    navigation()
                 
            }catch(e){
                console.log(e)
            }
        })()
    }
}

export const startGetSeeker =()=>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.get('http://localhost:3220/api/seeker',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setGetSeeker(response.data))
            }catch(e){
                console.log(e)
            }
        })()
    }
}



export const startEditSeeker= (formData,handleEdit,id)=>{
    return async (dispatch)=>{
        try{
            const response=await axios.put(`http://localhost:3220/api/seeker/${id}`,formData,{headers:{"Authorization":localStorage.getItem('token')}})
            dispatch(setEditSeeker(response.data))
            handleEdit()
            toast.success('successfull!')
           }catch(error){
            alert(error)
          }
       
        }
}

export const startDeleteSeeker = (id)=>{
    return async (dispatch)=>{
        try{
            const response=await axios.delete(`http://localhost:3220/api/seeker/${id}`,{headers:{"Authorization":localStorage.getItem('token')}})
            dispatch(setDeleteSeeker(response.data))
           }catch(error){
            alert(error)
          }
       
        }
}