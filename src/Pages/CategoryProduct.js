import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/Cart';


const CategoryProduct = () => {
    const params=useParams();
    const[cart,setCart]=useCart();
    const[products,setProducts]=useState([])
    const[setCategory]=useState([])
    const navigate=useNavigate();
    const getProductsByCat=async()=>{
        try{
const {data}=await axios.get(`https://ecommerce-app-backend-qsdk.onrender.com/api/v1/product/product-category/${params.slug}`);
setProducts(data?.products);
setCategory(data?.category);

        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
if(params?.slug)getProductsByCat()
// eslint-disable-next-line
    },[params?.slug])

  return (
    <>
      <Layout>
      <div className='container mt-3'>
   
      <div className='row'>
      <div className='d-flex flex-wrap '>
        
         
        {
       products?.map((p)=>(
            <>
              
            <Card style={{ width: '18rem' }} className='card m-2'>
<Card.Img variant="top" src={`https://ecommerce-app-backend-qsdk.onrender.com/api/v1/product/product-photo/${p._id}`} alt={p.name} className='categorycollectionimg' />
<Card.Body className='categorucollectionbody'>
<Card.Title>Name :{p.name}</Card.Title>
<Card.Text> description :{p.description.substring(1, 16)}...</Card.Text>
<Card.Text>price : ${p.price}</Card.Text>
<Button variant="primary ms-1 " onClick={()=>navigate(`/product/${p.slug}`)} >More detail</Button>
 <Button variant="secondary ms-4 "  onClick={()=>{setCart([...cart,p]);localStorage.setItem('cart',JSON.stringify([...cart,p]));toast.success("item added sucessfully")}}>Add to Cart</Button>


</Card.Body>
</Card>
          

           </>
          ))
        }
        </div>
    
      </div>
     
    </div>
      
  
      </Layout>
    </>
  )
}

export default CategoryProduct
