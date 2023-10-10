import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast'

export default function ProductDetails() {
  let {addToCartData ,setCartCount }  =useContext(CartContext)

  async function addCartDataaa(id){
    let {data} = await  addToCartData(id)
    if(data.status === "success"){
    
      setCartCount(data.numOfCartItems)
    toast.success(data.message)
    }else{
      toast.error("Error")
    }
    console.log(data.data);
    }
    

  let {id} = useParams()
  let [productDetails , setProductDetails] = useState(null)

  useEffect(() =>{
    getProductDetails()
  }, [])


  async function getProductDetails(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    console.log(data);
    setProductDetails(data.data)
  }
  return (
    <>
{productDetails !=null?<div className="row my-5 align-items-center">
  <Toaster/>
  <Helmet>
    <title>{productDetails?.title}</title>
  </Helmet>
  <div className="col-md-3">

  <OwlCarousel className='owl-theme' items={1} autoPlay autoplayTimeout={100} loop >

  {productDetails.images.map((el)=>{
return     <div className='item'>
<img src={el} className='w-100' alt="" />   </div>
  })}

</OwlCarousel>
  
  </div>

  <div className="col-md-9">
    <h2>{productDetails.title}</h2>
    <p className="text-muted">
      {productDetails.description}</p>

      <p className="text-main">{productDetails.category.name}</p>
        <div className="d-flex justify-content-between">
<span>{productDetails.price}EGP</span>
<span>
  <i className='fa soild fa-star rating-color'></i>
  {productDetails.ratingsAverage}
</span>
        </div>
        <button onClick={()=>addCartDataaa(productDetails._id)} className='w-100 btn bg-main text-white mt-4'>  <i className="fa-solid fa-bag-shopping mx-2 fa-1x"></i>Add To Cart</button>
  </div>
</div>
:"" }

    </>
  )
}
