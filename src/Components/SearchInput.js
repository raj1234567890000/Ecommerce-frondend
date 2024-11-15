
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSearch } from '../context/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values,setValues]=useSearch();
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
const{data}=await axios.get(`https://ecommerce-app-backend-qsdk.onrender.com/api/v1/product/search/${values.keyword}`)
setValues({...values, result:data})
navigate("/search")
            
        }catch(error){
            console.log(error)

        }
    }
  return (
    <>
     <Form className="d-flex" onSubmit={handleSubmit}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-1 searchbox"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e)=>setValues({...values,keyword:e.target.value})}
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
      
    </>
  )
}

export default SearchInput
