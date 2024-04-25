
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import HomePages from "./Pages/HomePages";
import AboutPages from "./Pages/AboutPages";
import ContactPages from "./Pages/ContactPages";
import Policy from "./Pages/Policy";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./Components/Routes/Private";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCatageory from "./Pages/Admin/CreateCatageory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Order from "./user/Order";
import Profile from "./user/Profile";
import Product from "./Pages/Admin/Product";
import UpdateProducts from "./Pages/Admin/UpdateProducts";
import Search from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";
import Categories from "./Pages/Categories";
import CategoryProduct from "./Pages/CategoryProduct";
import CartPage from "./Pages/CartPage";
//import AdminOrders from "./Pages/AdminOrders";



function App() {
  return (
    <>
    <Router>
   <Routes>
<Route path="/" element={<HomePages/>}></Route>
<Route path="/search" element={<Search/>}></Route>
<Route path="/product/:slug" element={<ProductDetails/>}></Route>
<Route path="/categories" element={<Categories/>}></Route>
<Route path="/cart" element={<CartPage/>}></Route>
<Route path="/category/:slug" element={<CategoryProduct/>}></Route>
<Route path="/dashboard" element={<PrivateRoute/>}>
  <Route path="user" element={<Dashboard/>}/>
  <Route path="user/orders" element={<Order/>}/>
  <Route path="user/profile" element={<Profile/>}/>
</Route>
<Route path="/dashboard" element={<AdminRoute/>}>
  <Route path="admin" element={<AdminDashboard/>}/>
  <Route path="admin/create-category" element={<CreateCatageory/>}/>
  <Route path="admin/create-product" element={<CreateProduct/>}/>
  <Route path="admin/product" element={<Product/>}/>
    <Route path="admin/products/:id" element={<UpdateProducts/>}/>
  <Route path="admin/create-user" element={<Users/>}/>
 {/* <Route path="admin/orders" element={<AdminOrders/>}/>*/}
</Route>

<Route path="/about" element={<AboutPages/>}></Route>
<Route path="/contact" element={<ContactPages/>}></Route>
<Route path="/policy" element={<Policy/>}></Route>
<Route path="/register" element={<Register/>}></Route>
<Route path="/login" element={<Login/>}></Route>
<Route path="/forgetpassword" element={<ForgotPassword/>}></Route>
<Route path="*" element={<PageNotFound/>}></Route>
   </Routes>
   </Router>

    </>
  );
}

export default App;
