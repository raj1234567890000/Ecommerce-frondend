import React from 'react'

import Form from 'react-bootstrap/Form';
const CategoryForm = ({handleSubmit,value,setValue}) => {
  


  return (
    <>
      <Form  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
       
      <input type='text' className='categoryform' placeholder='Enter New Category' value={value} onChange={(e)=>setValue(e.target.value)}/>
    
      </Form.Group>
      <button type='submit' className='adminbtn'>Create Catageory</button>
      </Form>
    </>
  )
}

export default CategoryForm
