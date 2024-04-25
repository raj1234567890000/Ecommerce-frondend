import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

const Spin = (path="login") => {
    const [count,setCount]=useState(4)
    const navigate=useNavigate()
    const location = useLocation() ;
    useEffect(()=>{
const interval =setInterval(()=>{
    setCount((preValue)=>--preValue);
},1000);
count === 0 && navigate(`/${path}`,{
    state:location.pathname,
});
return()=>clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <>
       <p className='text-center'>redirect to you in {count} second...</p>
            <Spinner animation="border" variant="primary" />
    </>
  )
}

export default Spin
