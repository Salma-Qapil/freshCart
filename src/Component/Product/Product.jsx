import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../Context/CartContext'
import toast ,{ Toaster } from 'react-hot-toast'




export default function Product() {

  let {addToCartData, setCartCount} =useContext(CartContext)

  let [ searchList , setsearchList] = useState([])

  async function addProductToCart(id){
  let {data} = await addToCartData(id)
  if(data.status === "success"){
    setCartCount(data.numOfCartItems)
  toast.success(data.message)
  }else{
    toast.error("Error")
  }
  }

  useEffect(()=>{
getProduct()
$(".pageItem").on("click" , function(e){
  let page = $(e.target).html()
  getProduct(page)
})
  },[])

  let [productList, setProduct] = useState([])

  async function getProduct(page = 1){
$(".loading").fadeIn(100)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
setProduct(data.data)
setsearchList(data.data)
$(".loading").fadeOut(1000)
  }


  function searchInput(e){
let searchValue = e.target.value

let mypro = [...searchList]
mypro = searchList.filter((el)=>{
return el.title.toLowerCase().includes(searchValue.toLowerCase())
})
setProduct(mypro)
}



  return (
    <>
   <Toaster/>
    <div className="loading top-0 end-0 position-fixed bottom-0 bg-light start-0">
<i className='fa-solid fa-spinner fa-spin fa-4x '></i>
    </div>

<Helmet>
  <title>Product</title>
</Helmet>
<div className="d-flex justify-content-center">
<input onChange={searchInput}  type="text" className='form-control my-5 w-75 ' placeholder='search...' />
</div>
    <div className="row my-4 g-4"> 
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
  <i className='fa soild fa-star rating-color'></i>
  {product.ratingsAverage}
</span>
        </div>
    
      </Link>
      <button onClick={()=>addProductToCart(product._id)} className='btn bg-main text-white w-100 d-block my-3'>
      <i className="fa-solid fa-bag-shopping mx-2 fa-1x"></i>Add To Cart</button>
      </div>
    </div>
    }   )}
    </div>

    <nav className='d-flex justify-content-center' aria-label="Page navigation example">
  <ul className="pagination cursor-pointer">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link pageItem" >1</a></li>
    <li className="page-item"><a className="page-link pageItem">2</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    </>
  )
}
