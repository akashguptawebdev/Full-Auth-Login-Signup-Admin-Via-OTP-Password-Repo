import React from 'react'
import ProductForm from '../../component/ProductComponent/ProductForm'
import ProductUploader from '../../component/ProductComponent/ProductUploader'
import "./AddProductPage.scss"
import NavigateBack from '../../component/NavigateBack'
const AddProductPage = () => {
  return (
    <div className='add_product_main_Container'>
      <NavigateBack pageName={"Create New Product"}/>
      <div className='product_screen'>
        <ProductForm />
        <ProductUploader />
      </div>
    </div>
  )
}

export default AddProductPage