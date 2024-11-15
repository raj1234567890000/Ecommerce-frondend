import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from  "axios";
import { useNavigate } from 'react-router-dom';
import  toast  from 'react-hot-toast';
import Typed from 'typed.js';

const  ForgetPassword = () => {
    
    const [email, setEmail] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const el = React.useRef(null);
 
    const navigate=useNavigate();
   
   //typed js here
   React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['<i> Reset your password here !</i>.'],
      typeSpeed: 90,
     // loop:true
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
    //form function
    const handleSubmit= async(e)=>{
e.preventDefault( );
//console.log("The form was submitted: ", {name, email, password,phone,addresh});
//toast.success("user Registration successfully!")
try{
const res=  await axios.post(`https://ecommerce-app-backend-qsdk.onrender.com/api/v1/auth/forgetpassword`,{

  email,
  newpassword,
  answer

})
if (res && res.data.success){
  toast.success(res.data && res.data.message);


 navigate("/login")
}
else{
  toast.error(res.data.message)
}
}catch(error){
console.log(error);
toast.error("something went wrong")
}
    }


  return (
    <>
    <Layout title={"Register"}>

 <div className='forgetpassword'>
    <h1><span ref={el} /></h1>
    <div className='forgetinputs'>
 <Form onSubmit={handleSubmit}>
   
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <input type="email" placeholder="Enter Your email"className='inputs'   value={email} onChange={(e)=>setEmail(e.target.value)}required  />
      </Form.Group>
      <Form.Group className="mb-3" >
        <input  type="text" placeholder="Enter Your favourite sports"className='inputs'  value={answer} onChange={(e)=>setAnswer(e.target.value)}required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <input  type="password" placeholder="Enter Your new password"className='inputs'   value={newpassword} onChange={(e)=>setNewPassword(e.target.value)}required />
      </Form.Group>
    
      <button type="submit" className='registerbtn' >
      Reset password
      </button>

    </Form>
 
 </div>
 </div>
      </Layout>
      
    </>
  )
}

export default  ForgetPassword;


