
import Layout from '../Components/Layout/Layout'
import { useSearch } from '../context/Search'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/Cart';
const Search = () => {
   const [values]=useSearch();
   const navigate=useNavigate();
   const[cart,setCart]=useCart();
  return (
    <>
   <Layout title={"search reult"}>
<div className='conatiner'>
    <div className='text-center'>
        <h1>Search Result</h1>
    
        <div className='d-flex flex-wrap '>
        
         
        {
values?.result.map((product) => (
  <Card key={product._id} style={{ width: '18rem' }} className='card m-4 srachcard'>
    <Card.Img variant="top" src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt={product.name} className='searchimg' />
    <Card.Body className='searchcard'>
      <Card.Title > name : {product.name}</Card.Title>
      <Card.Text  >description : {product.description.slice(1, 5)}...</Card.Text>
      <Card.Text  >price : ${product.price}</Card.Text>
      <Button variant="primary ms-1 " onClick={()=>navigate(`/product/${product.slug}`)} className='searchbtns'>More detail</Button>
      <Button variant="secondary ms-4 "className='searchbtns'  onClick={()=>{setCart([...cart,product]);localStorage.setItem('cart',JSON.stringify([...cart,product]));toast.success("item added sucessfully")}}>Add to Cart</Button>
    </Card.Body>
  </Card>
))
}
        </div> 
    </div>
</div>
   </Layout>
   </>
  )
}

export default Search
