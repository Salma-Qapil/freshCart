import axios from 'axios'
import React, {  useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'
import { Helmet } from 'react-helmet'


export default function Product() {

let {addToCartData, wishlistData ,setCartCount }  =useContext(CartContext)



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


async function addWishData(id){
let {data} = await  wishlistData(id)
if(data.status === "success"){

toast.success(data.message)
}else{
  toast.error("Error")
}
console.log(data.data);
}

  useEffect(()=>{
getProduct()
  },[])

  let [productList, setProduct] = useState([])

  async function getProduct(){
$(".loading").fadeIn(100)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
setProduct(data.data)
$(".loading").fadeOut(1000)
  }


  function changeColor(e){
let heart = document.getElementById("heart")
heart = e.target
heart.classList.add("redColor")
console.log(heart);

  }

  return (
    <>
    <Toaster/>
    <MainSlider/>
    <CategorySlider/>
    <div className="loading top-0 end-0 position-fixed bottom-0 bg-light start-0">
<i className='fa-solid fa-spinner fa-spin fa-4x '></i>
    </div>

<Helmet>
  <title>Home</title>
</Helmet>

    <div className="row my-5 g-4"> 
    {productList.map(    (product)=>{
      return <div key={product._id} className="col-md-3">
        <div className="product text-center">
      <Link to={'/ProductDetails/'  + product._id}>
      
        <img src={product.imageCover} className='w-100' alt="" />
        <p className="text-main">{product.category.name}</p>
        <h6>{product.title.split(" ").slice(0,2).join(" ")}</h6>
        <div className="d-flex justify-content-between">
<span>{product.price}EGP</span>
<span>
  <i  className='fa soild fa-star rating-color'></i>
  {product.ratingsAverage}
</span>
        </div>
    
      </Link>
      <button onClick={()=> {addWishData(product._id)}} className='heartbtn w-100 d-flex justify-content-end'>

    <i id='heart' onClick={changeColor} className="fa-solid fa-heart pt-4 pe-2 "></i>

      </button>
      <button onClick={()=>addCartDataaa(product._id)} className='btn bg-main text-white w-100 d-block mb-2 mt-3'>
      <i  className="fa-solid fa-bag-shopping mx-2 fa-1x"></i>Add To Cart</button>
  </div>
    </div>
    })}
    </div>
    </>
  )}

