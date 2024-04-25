import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from  "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import  toast  from 'react-hot-toast';
import { useAuth } from '../../context/auths';
import Typed from 'typed.js';

const  Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');;
    const[auth,setAuth]=useAuth()
    const navigate=useNavigate();
    const loaction=useLocation();   
    const el = React.useRef(null);
    //form function
    const handleSubmit= async(e)=>{
e.preventDefault( );
//console.log("The form was submitted: ", {name, email, password,phone,addresh});
//toast.success("user Registration successfully!")
try{

const res=  await axios.post(`http://localhost:8080/api/v1/auth/login`,{

  email,
  password,

})
if (res && res.data.success){
  toast.success(res.data && res.data.message);
 setAuth({
    ...auth,
    user:res.data.user,
    token:res.data.token
 })
 localStorage.setItem('auth',JSON.stringify(res.data))
 navigate(loaction.state || '/')
}
else{
  toast.error(res.data.message)
}
}catch(error){
console.log(error);
toast.error("something went wrong")
}
    }

   //typed js here
   React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['<i> Login here😊!</i>.'],
      typeSpeed: 90,
     // loop:true
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
  return (
    <>
    <Layout title={"user login"}>

 <div className='login'>
    <h1><span ref={el} /></h1>
    <div className='loginallinputs'>
 <Form onSubmit={handleSubmit}>
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <input type="email" placeholder="Enter Your email"className='inputs'  value={email} onChange={(e)=>setEmail(e.target.value)}required  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <input type="password" placeholder="Enter Your password"className='inputs'  value={password} onChange={(e)=>setPassword(e.target.value)}required />
      </Form.Group>
      <button  type="submit" className='registerbtn' >
        Login
      </button>
    <div className='mb-3 mt-2' >
    <button  type="submit"  className='registerbtn' onClick={()=>navigate('/forgetpassword')}>
        Forget password
      </button>
     
    </div>
    </Form>
    </div>

 </div>
      </Layout>
    </>
  )
}

export default  Login;

