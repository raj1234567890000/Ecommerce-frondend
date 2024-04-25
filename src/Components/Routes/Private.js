import { useState } from "react";
import { useAuth } from "../../context/auths";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spin from "./Spin";


export default function PrivateRoute(){
    const[ok,setOk]=useState(false);
    const [auth]=useAuth();
    useEffect(()=>{
const authCheck=async()=>{
    const res= await axios.get(`http://localhost:8080/api/v1/auth/user-auth`,{
       
    })
    if(res.data.ok){
        setOk(true)
    }else{
        setOk(false)
    }
}
if(auth?.token)authCheck();
    },[auth?.token])
    return ok ?<Outlet/>:<Spin/>

}