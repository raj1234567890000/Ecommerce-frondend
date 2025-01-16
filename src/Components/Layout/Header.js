import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink ,Link} from 'react-router-dom';
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from '../../context/auths';
import toast from 'react-hot-toast';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchInput from '../SearchInput';
import { useCart } from '../../context/Cart';
import { Badge } from "antd";



function Header() {
  const [auth,setAuth]=useAuth();
  const [cart]=useCart()
 // const categories=useCategory();
  const handleLogout=()=>{
 setAuth({
  ...auth,user:null,token:''
 })
 localStorage.removeItem('auth')
 toast.success("Successfully Logged Out");
    
  }
    return (
    <Navbar collapseOnSelect expand="lg" className="navbar ">
      <Container>
      <Link to="/" className="brand"><GiShoppingBag  className='bag'/>Ecommerce-App</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
           
                 {
            !auth.user ?  (
              <>
 <NavLink to="/register" className="navlinks" >Register</NavLink>
            <NavLink to="/login" className="navlinks">Login</NavLink>
           
              </>
            ):(
              <>
               <SearchInput />
            <NavLink to="/" className="navlinks" >Home</NavLink>
            <NavLink to="/categories" className="navlinks" >All Categories</NavLink>    
         
          <NavDropdown title={auth?.user?.name} id="collapsible-nav-dropdown" >
          
          <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin":"user"}` }className="navlinks" style={{color:"black"}}>dashboard</NavLink>
              <NavDropdown.Item href="#action/3.2">
              <NavLink to="/login" className="navlinks"onClick={handleLogout} style={{color:"black"}} >logout</NavLink>
              </NavDropdown.Item>
           
             
             
            </NavDropdown>
            <Badge count={cart?.length} showZero>
           <NavLink to="/cart"className="navlinks" >cart</NavLink>  
            
            </Badge> 
            
         
              </>
            )
            
           }
         
             
          </Nav>
          <Nav>           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
