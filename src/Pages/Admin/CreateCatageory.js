import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import CategoryForm from '../../Components/CategoryForm'
import{ Modal} from 'antd'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateCatageory = () => {
  const [Catagories,setCatagories]=useState([]);
  const[name,setName]=useState("");
  const[visible,setVisible]=useState(false);
  const [selected,setSelected]=useState(false);
  const[updateName,setUpdateName]=useState('');

//crete category
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
const{data}=await axios.post(`https://ecommerce-app-backend-qsdk.onrender.com/api/v1/category/create-category`,{name});
if(data?.success){
  toast.success(`${name} added successfully`)
  getAllCategory();
}else{
  toast.error(data.message)
}

    }catch(error){
      console.log(error)
      toast.error("something wrong in tinput form")

    }

  }
  //get all catagories data
  const getAllCategory=async()=>{
    try{
const {data}=await axios.get(`https://ecommerce-app-backend-qsdk.onrender.com/api/v1/category/get-category`)
if(data?.success){
  setCatagories(data?.category)
}
    }catch(error){
      console.log(error)
      toast.error("something went wrong in gettting categoies")

    }
  }
  useEffect(()=>{

    getAllCategory()

  },[])
//upadte category
  const handleUpdate=async(e)=>{
e.preventDefault(e);
try{
 const {data}=await axios.put(`https://ecommerce-app-backend-qsdk.onrender.com/api/v1/category/update-category/${selected._id}`,{name:updateName});
 if(data.success){
  toast.success(`${updateName}is updated`);
  setSelected(null);
  setUpdateName('');
  setVisible(false);
  getAllCategory();
 }else{
  toast.error(data.message);
 }

}catch(error){
console.log(error)
toast.error("Something Went Wrong In Updating Category");
}
  }

  //delted category
  const handleDelete=async(id)=>{
    
    try{
     const {data}=await axios.delete(`https://ecommerce-app-backend-qsdk.onrender.com/api/v1/category/delete-category/${id}`);
     if(data.success){
      toast.success(`category is deleted successyully`);
    
     
      
      getAllCategory();
     }else{
      toast.error(data.message);
     }
    
    }catch(error){
    console.log(error)
    toast.error("Something Went Wrong In Updating Category");
    }
      }
  return (
    <>
    <Layout title={" DashBoard - Catageory"}>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
            <h1 className='text-center'>Manage Catgeory</h1>
            <div className='p-3 w-50 '><CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/></div>
            <div className='w-60'>
            <Table striped bordered hover size="sm">
      <thead>
        <tr>
       
          <th className='text-center'>  Name</th>
          <th className='text-center'>Action</th>
     
        </tr>
      </thead>
      <tbody>
      {
              
              Catagories && Catagories.map((c)=>(
            <>
            <tr className='menutr'>
              <td key={c._id} className='menucategeory'>{c.name}</td>
               
             <td> <button className='editbtn' onClick={()=>{setVisible(true);setUpdateName(c.name);setSelected(c)}}><EditIcon /></button></td>  
             <td> <button className='deletebtn' onClick={()=>handleDelete(c._id)}><DeleteIcon/></button></td> 
              
              
            </tr>
            </>
              ))
             
             }
     
     
      </tbody>
    </Table>
            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
              <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate}/>
            </Modal>
            </div>
        </div>
    </div>
      </Layout>
    </>
  )
}

export default CreateCatageory
