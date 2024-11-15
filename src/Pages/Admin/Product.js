import React, { useEffect, useState } from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'

const Product = () => {
    const[products,setProducts]=useState([])

    //get all product list here
    const getAllProducts=async()=>{
        try{
            const{data}=await axios.get(`https://ecommerce-app-backend-qsdk.onrender.com/api/v1/product/get-product`);
            setProducts(data.products)
        }catch(error){
console.log(error);
toast.error("Error Occurred in fetching data")
        }

    }
    useEffect(()=>{
        getAllProducts();
    },[])
  return (
    <>
    <Layout title={" DashBoard -All products"}>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9 '>
            <h1 className='allproductshere'>All products here !</h1>
          <div className='d-flex flex-wrap'>
          {
                products && products.map((p)=>(
                   
                    <>
                     <Link to={`/dashboard/admin/products/${p.slug}` } key={p._id} className='product-list'>
                     <Card style={{ width: '18rem' }} className='card m-2'>
      <Card.Img variant="top" src={`https://ecommerce-app-backend-qsdk.onrender.com/api/v1/product/product-photo/${p._id}`} alt={p.name} className='producthereimg' />
      <Card.Body >
        <Card.Text >name : {p.name}</Card.Text>
        <Card.Text >
        description : {p.description}
        </Card.Text>
       
      </Card.Body>
    </Card>
                     </Link>
    
                    </>
                ))
            }
          </div>
            </div>
        </div>
    </div>
      </Layout>
    </>
  )
}

export default Product
