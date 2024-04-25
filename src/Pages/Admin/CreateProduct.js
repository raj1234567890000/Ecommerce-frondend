import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom';

const{Option}=Select

const CreateProduct = () => {
 
  const[categories,setCategories]=useState([]);
  const[photo, setPhoto] = useState('');
  const[name, setName] = useState('');
  const[description, setDescription] = useState('');
  const[price, setPrice] = useState('');
  const[quantity, setQuantity] = useState('');
 // const[setShipping] = useState('');
  const[category, setCategory] = useState('');
const navigate=useNavigate();


    //get all catagories data
    const getAllCategory=async()=>{
      try{
  const {data}=await axios.get(`http://localhost:8080/api/v1/category/get-category`)
  if(data?.success){
    setCategories(data?.category)
  }
      }catch(error){
        console.log(error)
        toast.error("something went wrong in gettting categoies")
  
      }
    }
    useEffect(()=>{
  
      getAllCategory();
  
    },[])

    // create products

    const handleCreate=async(e)=>{
      e.preventDefault()
try{
  const productData= new FormData()
  productData.append('name',name)
  productData.append('description',description)
  productData.append('price',price)
  productData.append('quantity',quantity)
  productData.append('photo',photo)
  productData.append('category',category)
 

  const{data}= axios.post(`http://localhost:8080/api/v1/product/create-product`,productData)
  if(data?.success){
 
    
    toast.error("product not created ")
  }else{
  
  
    toast.success("Product created successfully");
     navigate('/dashboard/admin/product');
  }

}catch(error){
  console.log(error)
  toast.error("Something Went Wrong In Creating Product");

}
     }
  
  return (
    <>
    <Layout title={" DashBoard -Product"}>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
            <h1>create Product!</h1>
            <div className='m-1 w-75'>
              <Select border={false} placeholder="select a caegory" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>

                {
               categories && categories.map((c)=>(
                    <Option key={c._id} value={c._id}>{c.name}</Option>
                  ))
                }
              </Select>
              <div className='mb-3'>
                <label  className='btn btn-outline-secondary col-md-12' >
                  {photo && photo.name }
<input type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden={false}></input>
                </label>
              </div>
              <div className='mb-3'>
                {
                  photo &&(
                    <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt="product _image" height='250px' width='250px' className='img img-responsive'/>

                    </div>
                  )
                }

              </div>
              <div className='mb-3'>
                <input type="text" value={name} placeholder='write a name' className='form-control' onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className='mb-3'>
                <textarea rows="4" cols="50" value={description} placeholder='write a descrriptions' className='form-control' onChange={(e)=>setDescription(e.target.value)}/>
              </div>
              <div className='mb-3'>
                <input type="text" value={price} placeholder='write price here' className='form-control' onChange={(e)=>setPrice(e.target.value)}/>
              </div>
              <div className='mb-3'>
                <input type="text" value={quantity} placeholder='write qunatity here' className='form-control' onChange={(e)=>setQuantity(e.target.value)}/>
              </div>
            {/*  <div className='mb-3'>
                <Select border="false" placeholder='select shipping' className='form-select mb-3' size="lagre" onChange={(value)=>setShipping(value)}>
            
                <Option vlaue="0">NO</Option>
                <Option vlaue="1">Yes</Option>
                </Select>
              </div>*/}
              <div className='mb-6'>
                <button className='btn btn-primary ' onClick={handleCreate}  >Create product</button>
              </div>
            </div>
            </div>
        </div>
    </div>
      </Layout>
    </>
  )
}

export default CreateProduct
