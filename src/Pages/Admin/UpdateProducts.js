import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const{Option}=Select

const UpdateProducts = () => {
 
  const[categories,setCategories]=useState([]);
  const[photo, setPhoto] = useState('');
  const[name, setName] = useState('');
  const[description, setDescription] = useState('');
  const[price, setPrice] = useState('');
  const[quantity, setQuantity] = useState('');
 // const[setShipping] = useState('');
  const[category, setCategory] = useState('');
const navigate=useNavigate();
const params=useParams();
const [id, setId] = useState("");
//get single products

const singleProduct=async()=>{
    try{
const {data}=await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.id}`);
setName(data.product.name)
setDescription(data.product.description)
setPrice(data.product.price)
setQuantity(data.product.quantity)
setCategory(data.product.category._id)
setId(data.product._id);

console.log(data)
    }catch(error){
        console.log(error)
        //toast.message("eror in update products")

    }
}
useState(()=>{
    singleProduct();
},[])



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

    const handleUpdate=async()=>{
     // e.preventDefault()
try{
  const productData= new FormData()
  productData.append('name',name)
  productData.append('description',description)
  productData.append('price',price)
  productData.append('quantity',quantity)
  photo && productData.append('photo',photo)
  productData.append('category',category)
 

  const{data}= await axios.put(`http://localhost:8080/api/v1/product/update-product/${id}`,productData)
  if(data?.success){
    toast.success(data?.message);
    navigate('/dashboard/admin/product');
    
  
  }else{
  
    toast.error(data?.message)
   
  
  }

}catch(error){
  console.log(error)
  toast.error("Something Went Wrong In upadte  Product");

}
     }
     //delte produtc

     const  handleDelete= async () => {
      try{
        let answer=window.prompt("Are you sure want to dalete this product ?")
        if(!answer) return
const {data} =await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`);

toast.success(data?.message);
navigate('/dashboard/admin/product');
console.log(data,"data")

      }catch(error){
console.log(error)
toast.error("Error in delete the product")
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
            <h1>update Product!</h1>
            <div className='m-1 w-75'>
              <Select border={false} placeholder="select a caegory" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}} value={category}>

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
                  photo ?(
                    <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt="product _image" height='250px' width='250px' className='img img-responsive'/>

                    </div>
                  ):(
                    <div className='text-center' >
                         
                   <img src={`http://localhost:8080/api/v1/product/product-photo/${id}`} alt="product _image" height='250px' width='250px' className='img img-responsive'/>

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
              <div className='mb-3'>
                <button className='btn btn-primary ' onClick={handleUpdate}  >update product</button>
              </div>
              <div className='mb-3 '>
                <button className='btn btn-danger ' onClick={handleDelete}  >Delete  product</button>
              </div>
            </div>
            </div>
        </div>
    </div>
      </Layout>
    </>
  )
}

export default UpdateProducts
