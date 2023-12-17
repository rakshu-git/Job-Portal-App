import axios from "axios"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export const SET_USER = "SET_USER"
export const SET_ALLUSER = "SET_ALLUSER"
export const SET_REMOVE = "SET_REMOVE"
export const SET_ADMIN = "SET_ADMIN"
export const SET_DESTROYALL = "SET_DESTROYALL"
export const SET_DESTROYALL2="SET_DESTROYALL2"
export const SET_JOBSEEKERS = "SET_JOBSEEKERS"
export const SET_DESTROYUSER = "SET_DESTROYUSER"

export const setLoggedInUser = (user)=>{
    return  {
        type:SET_USER,
        payload:user
    }
}

export const setAllDetails = (user)=>{
    return  {
        type:SET_ALLUSER,
        payload:user
    }
}

export const setRemoveUser = (user)=>{
    return  {
        type:SET_REMOVE,
        payload:user
    }
}

export const setAdminDetails =(user)=>{
    return {
        type : SET_ADMIN,
        payload:user
    }
}

export const setDelete = ()=>{
    return{
        type: SET_DESTROYALL
        
    }
}

export const setDeleteUser = ()=>{
    return{
        type: SET_DESTROYUSER
        
    }
}


export const startRegisterUser = (formData,navigation)=>{
  
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.post('http://localhost:3220/api/users/register',formData)
                
                toast.success('Registered successfully!')
                navigation()
               
            }catch(e){
            
                navigation(e.response.data.errors)
            }
        })()
    }    

}


export const startLoginUser = (formData,navigation) =>{
    console.log(formData)
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.post('http://localhost:3220/api/users/login',formData)
                if(!response.data?.error){
                    localStorage.setItem('token',response.data.token)   
                    toast.success('Login successfull!')
                    dispatch(startGetAccount())
                    navigation()
                }else{
                    toast.error("Invalid email ")
                }
            }catch(e){
              console.log(e)
            }
        })()
    }
}

export const startGetAccount = () =>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.get('http://localhost:3220/api/users/account',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setLoggedInUser(response.data))
            }catch(e){
                if( 'undefined'){
                    console.log(e)
                }
            }
        })()
    }
}


export const startGetUserDetails =()=>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.get('http://localhost:3220/api/users',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setAllDetails(response.data))
            }catch(e){
                console.log(e)
            }
        })()
    }
}

export const startRemoveUser = (id) =>{
    console.log(id)
    return (dispatch)=>{
        (async ()=>{
            try{
               const response = await axios.delete(`http://localhost:3220/api/users/${id}`,{headers:{"Authorization":localStorage.getItem('token')}})
               dispatch(setRemoveUser(response.data))
            }catch(e){
                console.log(e)
            }
        })()
    }
}

export const startGetAdminDetails =()=>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.get('http://localhost:3220/api/users/admindata',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setAdminDetails(response.data))
            }catch(e){
                console.log(e)
            }
        })()
    }
}

export const startSearch = (value)=>{
  
    return (dispatch)=>{
        (   
            async()=>{
                try {
                    const response = await axios.get(`http://localhost:3220/api/users/search?search=${value}`,{headers:{"Authorization":localStorage.getItem('token')}})
                    dispatch(setAllDetails(response.data.items))
                } catch (error) {
                    alert(error.message)          
                }
            }
        )()
    }
}

export const startDeleteAccount=(deleteAcc)=>{
    return (dispatch)=>{
    (async()=>{
        try{
            const response = await axios.delete('http://localhost:3220/api/users/removeAll',{headers:{"Authorization":localStorage.getItem('token')}})
            dispatch(setDelete())
            dispatch(setDeleteUser())
            deleteAcc()
            
        }catch(e){
            console.log(e)
        }
    })()
}
}
