import axios from "axios"
import { useEffect } from "react"
import { useState,useContext,createContext} from "react"


const AuthContext=createContext()


const AUthprovider = ({children}) =>{
const [auth,setAuth]=useState({
user:null,
token:''
})

axios.defaults.headers.common[ 'Authorization' ] = auth?.token
useEffect(()=>{
    const data =localStorage.getItem('auth')
    if (data){
        const parseData=JSON.parse(data)
        setAuth({
            ...auth,
            user:parseData.user,
            token:parseData.token,
        })
    }
    //eslint-disable-next-line
},[])
return(
    <AuthContext.Provider value={[auth, setAuth]}>
        {children}
    </AuthContext.Provider>

)
}

const useAuth=()=>useContext(AuthContext)
export{useAuth,AUthprovider}
