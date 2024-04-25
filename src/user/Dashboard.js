import React from 'react'
import Layout from '../Components/Layout/Layout'
import UserMenu from '../Components/Layout/UserMenu'
import { useAuth } from '../context/auths'


const Dashboard = () => {
  const[auth]=useAuth()
   return (
    <>
<Layout title={"Dashboard"}>
<div className='container-fluid p-3 m-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                 <div className='card w-75 p-3'>
                  <h3>Name : {auth?.user?.name}</h3>
                  <h3>Email : {auth?.user?.email}</h3>
                  <h3>Addresh : {auth?.user?.addresh}</h3>
                 </div>
                </div>
            </div>
        </div>
</Layout>
    </>
  )
}

export default Dashboard
