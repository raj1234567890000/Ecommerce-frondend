import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
 
  return (
    <>
  <div className=' text-center'>
    <h3>Admin Pannel</h3>
    <ListGroup className='adminlistgroup'>
    <ListGroup.Item><NavLink to="/dashboard/admin/create-category" className="adminnav">Create Caatgeory</NavLink></ListGroup.Item>
    <ListGroup.Item>    <NavLink to="/dashboard/admin/create-product" className="adminnav">Create product</NavLink></ListGroup.Item>
    <ListGroup.Item>    <NavLink to="/dashboard/admin/product" className="adminnav"> products</NavLink></ListGroup.Item>
    <ListGroup.Item>    <NavLink to="/dashboard/admin/orders"className="adminnav"> orders</NavLink></ListGroup.Item>
    <ListGroup.Item>   <NavLink to="/dashboard/admin/create-user"className="adminnav">User</NavLink></ListGroup.Item>
    
   
    </ListGroup>

  </div>
      
    </>
  )
}

export default AdminMenu
