import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {

let {getAllCartData, deleteCartData, updateCartData , setCartCount} =useContext(CartContext)

let [cartData, setCartData] = useState(null)

useEffect(()=>{

  getAllData()
  },[])


  async function deleteproduct(id){
  let {data}  = await deleteCartData(id)
  setCartCount(data.numOfCartItems)
setCartData(data.data)
  }

  async function getAllData(){
    $(".loading").fadeIn(100)
    let {data} = await getAllCartData()
  setCartData(data.data)
  $(".loading").fadeOut(1000)
  }

  async function updateCount(id, count){
let {data} = await updateCartData(id, count)
setCartData(data.data)
  }

  


  return (
    <>
        <div className="loading top-0 end-0 position-fixed bottom-0 bg-light start-0">
<i className='fa-solid fa-spinner fa-spin fa-4x '></i>
    </div>
    <Helmet>
      <title>Cart</title>
    </Helmet>
      <div className=" cart bg-light my-5 p-4">
      <div className="row justify-content-between">
<div className="col-md-6">
<h5 className='fs-3 fw-bold my-3'>Cart Shop</h5>
</div>
<div className="col-md-2">
  <Link to={"/CheckOut/" + cartData?._id}>
  <span className='btn bg-main text-white w-100 d-block my-3'>Check Out</span>
  </Link>
</div>
      </div>
        
<h3 className='fs-5 mt-3'>total price: <span className='text-main'>{cartData?.totalCartPrice}</span></h3>

{cartData?.products?.map((el) => {
return <div key={el.product._id} className="row border-bottom py-3 align-items-center justify-content-between">
<div className="col-md-6">
  <div className="row align-items-center ">
  <div className="col-md-3">
    <img src={el.product.imageCover} className='w-100 mb-2' alt="" />
  </div>
  <div className="col-md-9">
    <h5>{el.product.title}</h5>
    <h6 className='fw-bold'>{el.price} EGP</h6>
    <button onClick={()=>deleteproduct(el.product._id)} className='text-danger mb-2'><i className="fa-solid fa-trash"></i> Remove</button>
  </div>
  </div>
</div>




<div className="col-md-2 mb-4 carticon">
  <span onClick={()=>updateCount(el.product._id , el.count + 1)}><i className="fa-solid fa-plus"></i></span>
  <span className="px-3">{el.count}</span>

  {el.count  <= 1 ? <button className='listbtn'
  onClick={()=>deleteproduct(el.product._id)}><i className="fa-solid fa-minus"></i></button> 
  :<button className='listbtn'
  onClick={()=>updateCount(el.product._id , el.count - 1)}><i className="fa-solid fa-minus"></i></button>  }
</div>

</div>
})}



</div>   
      
    </>
  )}
