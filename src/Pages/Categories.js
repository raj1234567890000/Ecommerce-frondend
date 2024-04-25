import React from 'react'
import Layout from '../Components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories=useCategory();
  return (
    <>
      <Layout title={"All Categories"}>
       <div className='conatiner'>
        <div className='row'>
          <div className='all'>
            {
                categories.map((c)=>(
                    <div className='col-md-6 mt-5 mb-3 gx-3 gy-3 ml-4 allcategories' key={c._id}>
                       
                        <Link to={`/category/${c.slug}`} className='categories'>{c.name}</Link>
                        
                        
                    </div>
                ))
            }
            </div>
            <div className='col-md-6'>
               
            </div>
        </div>
       </div>

      </Layout>
    </>
  )
}

export default Categories
