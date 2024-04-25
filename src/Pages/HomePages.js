import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import{Checkbox,Radio} from 'antd'
import { Prices } from '../Components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import toast from 'react-hot-toast';






const HomePages = () => {
const navigate=useNavigate();
const[cart,setCart]=useCart()
  const[products,setProducts]=useState([]);
  const [categories,setCategories]=useState([]);
  const[checked, setChecked]=useState([]);
  const[radio,setRadio]=useState([])
  const[totals,setTotal]=useState(0);
  const[page,setPage]=useState(1)
  const[loading,setLoading]=useState(false);

  //get total count
  const getTotal=async()=>{
    try{
    
const{data}=await axios.get(`http://localhost:8080/api/v1/product/product-count`)
setTotal(data?.totals)


    }catch(error){
      
      console.log(error)
    }
  }
  useEffect(()=>{
    getTotal();
  },[])

  /******************************* */
  // Get all  categories
  const getAllCategory=async()=>{
    try{
const {data}=await axios.get(`http://localhost:8080/api/v1/category/get-category`)
if(data?.success){
  setCategories(data?.category)
}
    }catch(error){
      console.log(error)
      

    }
  }
  useEffect(()=>{

   if(!checked.length || !radio.length) getAllCategory();

  },[checked.length , radio.length]);

  useEffect(()=>{
    if(checked.length || radio.length)filterProduct();
  // eslint-disable-next-line 
  },[checked,radio])

    //get filter products
    const  filterProduct=async()=>{
      try{
        const {data}=await  axios.post(`http://localhost:8080/api/v1/product/product-filter`,{checked,radio})
        setProducts(data?.products)
      }catch(error){
      console.log(error)
      }
        }

  //get products

  const getAllProducts=async()=>{
    try{
      setLoading(true);
const{data}= await  axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
setLoading(false);
      setProducts(data.products)
      
     

  
    }catch(error){
      setLoading(false)
console.log(error)
    }

  }
  useEffect(()=>{
getAllProducts();

// eslint-disable-next-line
  },[])
  
  //filter category
  const handleFilter=(value,id)=>{
    let all=[...checked];
    if(value){
      all.push(id)
    }else{
      all=all.filter(c=>c!==id)
    }
    setChecked(all);

  }

  //loadmore 
  const  loadMore = async() => {
    try{
      setLoading(true)
const{data}=await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
setLoading(false)
setProducts([...products,...data?.products])
    }catch(error){
      setLoading(false)
console.log(error)
    }

  }

  useEffect(()=>{
    if(page===1)return
    loadMore()
     // eslint-disable-next-line 
  },[page])



    return (
 <>
      <Layout  title={"Home All products Best offer"}>
     <div className='row mt-9 '>
      <div className='col-md-2 mt-5 '>
        <div className='allhome'>
        <h4 className='text-center filterhead'> Filter by category</h4>
    <div className='d-flex flex-column ml-4' >
     
    {
          categories?.map((c)=>(
            <>
            <div c className='filtercategory'>
            <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id) }>
              {c.name}
              
              </Checkbox>
              </div>
            </>
          ))
        }
      
    </div>
    <h4 className='text-center pricehead'> Filter by price</h4>
    <div className='d-flex flex-column'>
   <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
    {
     Prices?.map((p)=>(
        <>
         <div key={p._id} className='filterradio'>
         <Radio value={p.array}>
          {p.name}
         
         </Radio>

          </div>
        </>
      )
      )
    }
   </Radio.Group>
      </div>

<div className='d-flex flex-wrap mt-3'>
  <button className='resetbtn' onClick={()=>window.location.reload()}>Reset filter</button>
</div>
</div>

</div>
      <div className='col-md-10'>
       
        <h1 className='text-center'style={{marginTop:"20px"}}>All Products</h1>
        <div className='d-flex flex-wrap '>
        
         
          {
         products?.map((p)=>(
              <>
                <div className='allproducts'>
              <Card style={{ width: '18rem' }} className='card m-2 card'>
<Card.Img variant="top" src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt={p.name}  className='productimg'
/>
<div class="flip-box">
  <div class="flip-box-inner">
    <div class="flip-box-front">
    <Card.Body className='cardbody'>
 <Card.Title className='pname' style={{color:"black"}}>Name : {p.name}</Card.Title>
 <Card.Text className='pdesc' style={{color:"black"}} > Description : {p.description.substring(1, 60)}</Card.Text>
 <Card.Text className='pprice'  style={{color:"red",textDecoration:"underline"}}>Price : ${p.price}</Card.Text>
 
</Card.Body>
    </div>
    <div class="flip-box-back">
    <Button variant="primary ms-1 " onClick={()=>navigate(`/product/${p.slug}`)} className='productbtns'>More detail</Button>
 <Button variant="secondary ms-4 "className='productbtns'  onClick={()=>{setCart([...cart,p]);localStorage.setItem('cart',JSON.stringify([...cart,p]));toast.success("item added sucessfully")}}>Add to Cart</Button>

    </div>
  </div>
</div>
</Card>
</div>

             </>
            ))
          }
          </div>
     <div className='m-2 p-3  d-flex justify-content-center'>
     {products?.length < totals && (
      <>
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
         
           
         
              </>  
              
              )}            
     </div>
        </div>
       
      </div>
     
      </Layout>
      </>
  )
}

export default HomePages
