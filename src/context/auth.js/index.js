 

 import React ,{createContext,useState,useEffect} from "react";
 import api from "../../services/api";
 import {useNavigate} from 'react-router-dom'




 export const AuthContext=createContext()


 export default function AuthProvider({children}){
    


  //  const navigate=useNavigate()
   const [autenticado,setAutinticado]=useState(false)
   const [loadinng,setLoading]=useState(true)


   async function logar(username,password){
    try {
     
        const response= await api.post('/userlogin',{
            username,
            password,
           
        })
        const data= await response.data.data
        console.log(data)
        if(response.status==200){
            localStorage.setItem("user",JSON.stringify(data))  
            setAutinticado(true)
           // alert(autenticado)
            return alert("usuario logado com sucesso")
        }
      
      
        } catch (error) { 
            console.log(error.response.data.message)
            alert("usuario invalidp")
          return  error.response.data.message
        }
   }

   useEffect(()=>{
    const user=localStorage.getItem('user')
    console.log(user)
     if(user){
        const userData=JSON.parse(user)
        const token=userData.token
        console.log(token)
        setAutinticado(true)
     }
     setLoading(false)
   },[])


   function PriviteRoute({children}){
   
     if(loadinng){
        return(
            <div>
                carregando...
            </div>
        )
     }
     if(!autenticado){
        return(
            <div>
                fazer login...
            </div>
        )
     }
     return children
     
   }



    return(
        <AuthContext.Provider value={{autenticado:autenticado,logar,loadinng,PriviteRoute}}  >
            {children}
        </AuthContext.Provider>
    )
 }