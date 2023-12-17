import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const SET_JOBPOST = "SET_JOBPOST"
export const GET_JOBPOST = "GET_JOBPOST"
export const EDIT_JOBPOST = "EDIT_JOBPOST"
export const REMOVE_JOBPOST = "REMOVE_JOBPOST"
export const GETALL_JOBPOST = "GETALL_JOBPOST"
export const SET_APPLICANT = "SET_APPLICANT"
export const GET_EMPLOYEE_JOBPOST = "GET_EMPLOYEE_JOBPOST"
export const SEARCH_JOBPOSTS = "SEARCH_JOBPOSTS"
export const EDIT_EMPLOYEE_JOBPOST ="EDIT_EMPLOYEE_JOBPOST"
export const REMOVE_EMPLOYEE_JOBPOST ="REMOVE_EMPLOYEE_JOBPOST "

export const setAddJobPost = (user)=>{
    return  {
        type:SET_JOBPOST,
        payload:user
    }
}

export const setAddApplicant = (user)=>{
    return  {
        type:SET_APPLICANT,
        payload:user
    }
}


export const setGetJobPost = (user)=>{
    return  {
        type:GET_JOBPOST,
        payload:user
    }
}

export const setEditJob = (user)=>{
    return  {
        type:EDIT_JOBPOST,
        payload:user
    }
}

export const setDeleteJobPost = (user)=>{
    return  {
        type:REMOVE_JOBPOST,
        payload:user
    }
}

export const setGetAllJobPost = (user)=>{
    return  {
        type:GETALL_JOBPOST,
        payload:user
    }
}

export const setEmployeeJobPost = (user)=>{
    return  {
        type:GET_EMPLOYEE_JOBPOST,
        payload:user
    }
}

export const setEditApplicant = (user)=>{
    return  {
        type:EDIT_EMPLOYEE_JOBPOST,
        payload:user
    }
}

export const setRemoveApplicant = (user)=>{
    return  {
        type:REMOVE_EMPLOYEE_JOBPOST,
        payload:user
    }
}

export const startAddJobPost =(formData,navigation)=>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.post('http://localhost:3220/api/jobPost',formData,{headers:{"Authorization":localStorage.getItem('token')}})
                    dispatch(setAddJobPost(response.data));
                    navigation()
                    toast.success('successfull!')
            }catch(e){
                console.log(e)
            }
        })()
    }
}

export const startAddApplicant =(id,status)=>{
    
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.post(`http://localhost:3220/api/jobPost/${id}`,{status},{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setAddApplicant(response.data));      
            }catch(e){
                console.log(e)
            }
        })()
    }
}

export const startEditApplicant =(id,applicantId,status)=>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.put(`http://localhost:3220/api/jobPost/applicant/${id}/${applicantId}`,{status},{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setEditApplicant(response.data));     
            }catch(e){
                console.log(e)
            }
        })()
    }
}

export const startRemoveApplicant =(id,applicantId)=>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.delete(`http://localhost:3220/api/jobApplicant/${id}/${applicantId}`,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setRemoveApplicant(response.data));    
            }catch(e){
                console.log(e)
            }
        })()
    }
}

export const startGetAllJobPosts =()=>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.get('http://localhost:3220/api/jobPost',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setGetAllJobPost(response.data))
            }catch(e){
                console.log(e)
            }
        })()
    }
}

export const startGetJobPost =()=>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.get('http://localhost:3220/api/jobPost/list',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setGetJobPost(response.data))
            }catch(e){
                console.log(e)
            }
        })()
    }
}



export const startEditJob= (formData,handleEdit,id)=>{
    return async (dispatch)=>{
        try{
            const response=await axios.put(`http://localhost:3220/api/jobPost/${id}`,formData,{headers:{"Authorization":localStorage.getItem('token')}})
            dispatch(setEditJob(response.data))
            handleEdit()
            toast.success('successfull!')
           }catch(error){
            alert(error)
          }
       
        }
}

export const startDeleteJobPost = (id)=>{
    return async (dispatch)=>{
        try{
            const response=await axios.delete(`http://localhost:3220/api/jobPost/${id}`,{headers:{"Authorization":localStorage.getItem('token')}})
            dispatch(setDeleteJobPost(response.data))
           }catch(error){
            alert(error)
          }
       
        }
}

export const startGetEmployeeJobPost = (id)=>{
    return async (dispatch)=>{
        try{
            const response=await axios.get('http://localhost:3220/api/employeeJobPosts',{headers:{"Authorization":localStorage.getItem('token')}})
            dispatch(setEmployeeJobPost(response.data))
           }catch(error){
            alert(error)
          }
       
        }
}

export const startSearchJobPosts = (value)=>{
  
    return (dispatch)=>{
        (   
            async()=>{
                try {
                    const response = await axios.get(`http://localhost:3220/api/jobPost/search?search=${value}`,{headers:{"Authorization":localStorage.getItem('token')}})
                    dispatch(setGetAllJobPost(response.data.items))
                } catch (error) {
                    alert(error.message)          
                }
            }
        )()
    }
}

