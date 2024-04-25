import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from  "axios";
import { useNavigate } from 'react-router-dom';
import  toast  from 'react-hot-toast';
import Typed from 'typed.js';
const Register = () => {
    const[name,setName]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');;
    const [phone, setPhone] = useState('');
    const [addresh, setAddresh] = useState('');
    const [answer, setAnswer] = useState('');
    const el = React.useRef(null);
    const navigate=useNavigate();

    //typed js here
    React.useEffect(() => {
      const typed = new Typed(el.current, {
        strings: ['<i> Registration form here😊!</i>.'],
        typeSpeed: 90,
       // loop:true
      });
  
      return () => {
        // Destroy Typed instance during cleanup to stop animation
        typed.destroy();
      };
    }, []);

    //form function
    const handleSubmit= async(e,)=>{
e.preventDefault( );
//console.log("The form was submitted: ", {name, email, password,phone,addresh});
//toast.success("user Registration successfully!")
try{

const res=  await axios.post(`http://localhost:8080/api/v1/auth/register`,{
  name,
  email,
  password,
  phone,
  addresh,
  answer,
  
 
})
if (res.data.success){
  toast.success(res.data.message);
  navigate("/")
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

 <div className='register'>
    <h1 className='registerheading'><span ref={el} /></h1>
    <div className='allinputs'>
 <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <input type="text" placeholder="Enter Your Name" className='inputs'  value={name} onChange={(e)=>setName(e.target.value)} required  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <input type="email" placeholder="Enter Your email"  className='inputs'   value={email} onChange={(e)=>setEmail(e.target.value)}required  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <input type="password" placeholder="Enter Your password" className='inputs'   value={password} onChange={(e)=>setPassword(e.target.value)}required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <input type="text" placeholder="Enter Your Phone"  className='inputs'    value={phone} onChange={(e)=>setPhone(e.target.value)}required/>
      </Form.Group>
      <Form.Group className="mb-3" >
      <textarea class="form-control" id="exampleFormControlTextarea1"  className='inputs'   rows="3" placeholder="Enter Your Addrsh" value={addresh} onChange={(e)=>setAddresh(e.target.value)}></textarea>
      </Form.Group>
      <Form.Group className="mb-3" >
        <input type="text" placeholder="What is your favourite sports"  className='inputs'   value={answer} onChange={(e)=>setAnswer(e.target.value)}required />
      </Form.Group>
      <button  type="submit" className='registerbtn' >
        Submit
      </button>
   
    </Form>
    </div>
 </div>
      </Layout>
    </>
  )
}

export default Register
