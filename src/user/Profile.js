import React, { useEffect } from 'react'
import Layout from './../Components/Layout/Layout'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from  "axios";
import  toast  from 'react-hot-toast';
import { useAuth } from '../context/auths';

const Profile = () => {
  //context
  const[auth,setAuth]=useAuth();
  const[name,setName]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');;
    const [phone, setPhone] = useState('');
    const [addresh, setAddresh] = useState('');
   

   

    //form function
    const handleSubmit= async(e,)=>{
e.preventDefault( );
//console.log("The form was submitted: ", {name, email, password,phone,addresh});
//toast.success("user Registration successfully!")
try{

const {data}=  await axios.put(`http://localhost:8080/api/v1/auth/profile`,{
  name,
  email,
  password,
  phone,
  addresh,

  
 
})
if (data?.error){
  toast.error(data?.error);
  
}
else{
  setAuth({...auth, user:data?.updateUser})
  let ls=localStorage.getItem('auth')
  ls=JSON.parse(ls)
  ls.user=data.updateUser
  localStorage.setItem('auth', JSON.stringify(ls))
  toast.success( "Profile has been updated Successfully!");
}
}catch(error){
console.log(error);
toast.error("something went wrong")
}
    }

//get user data
useEffect(()=>{
  const{email,name,phone,addresh}=auth?.user
  setName(name)
  setEmail(email)
  setPhone(phone) 
  setAddresh(addresh)
},[auth?.user])
  return (
    <>
    <Layout title={"Register"}>

 <div className='register'>
    <h1>user Profile</h1>
 <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter Your email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Enter Your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Control type="text" placeholder="Enter Your Phone"  value={phone} onChange={(e)=>setPhone(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter Your Addrsh" value={addresh} onChange={(e)=>setAddresh(e.target.value)}></textarea>
      </Form.Group>
    
      <Button variant="primary" type="submit" >
        Update
      </Button>
    </Form>

 </div>
      </Layout>
    </>
  )
}

export default Profile
