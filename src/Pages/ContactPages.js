import React from 'react'
import Layout from '../Components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const ContactPages = () => {
  return (
    <>
      <Layout  title={"Conatct us "}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <img src="https://github.com/techinfo-youtube/ecommerce-app-2023/blob/15-admin-orders-css/client/public/images/contactus.jpeg?raw=true" className='contactimg' alt=""/>
            </div>
            <div className='col-md-4'>
<h1 className='conatacthead'>Conatct us</h1>
<p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ContactPages
