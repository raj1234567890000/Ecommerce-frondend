import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
 
  return (
    <>
  <div className=' text-center'>
    <h3>Dashboard</h3>
    <ListGroup>
    <ListGroup.Item><NavLink to="/dashboard/user/profile"> Profile</NavLink></ListGroup.Item>
    <ListGroup.Item>    <NavLink to="/dashboard/user/orders">Orders</NavLink></ListGroup.Item>
    </ListGroup>

  </div>
      
    </>
  )
}

export default UserMenu;
