import React from 'react'
import Layout from '../Components/Layout/Layout'
import AdminMenu from '../Components/Layout/AdminMenu'

const AdminOrders = () => {
    
  return (
    <>
     <Layout>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All orders</h1>
            </div>
        </div>
        </Layout> 
    </>
  )
}

export default AdminOrders
