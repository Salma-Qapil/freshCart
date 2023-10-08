import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import $ from 'jquery'
import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'

export default function WishList() {
  let { getAllWishlistData , deletewishList, addToCartData , setCartCount} = useContext(CartContext)
  let [wishData, setwishData] = useState(null)

  useEffect(()=>{

    getAllWish()
    },[])


    async function deleteDataWishList(id){
      let {data}  = await deletewishList(id)
    setwishData(data.data)
    getAllWish()
}
    
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
  
      

  async function getAllWish(){
    $(".loading").fadeIn(100)
    let {data} = await getAllWishlistData()
setwishData(data.data)
  $(".loading").fadeOut(1000)
  }

  return (
    <>
<Toaster/>
<Helmet>
  <title>Wish List</title>
</Helmet>
<div className="loading top-0 end-0 position-fixed bottom-0 bg-light start-0">
<i className='fa-solid fa-spinner fa-spin fa-4x '></i>
    </div>

<div className="list my-5 py-5 px-3 bg-light">
<h2 className='ps-4'>My wish List</h2>

{wishData?.map((el)=>{
  return <div key={el._id}  className="row border-bottom py-3 align-items-center justify-content-between">


<div className="col-md-6">
    <div className="row align-items-center ">
    <div className="col-md-3">
      <img src={el.imageCover} className='w-100 mb-2' alt="" />
    </div>
    <div className="col-md-9">
      <h5>{el.title}</h5>
      <h6 className='fw-bold text-success'>{el.price} EGP</h6>
      <button onClick={()=> deleteDataWishList(el._id)}  className='text-danger heartbtn mb-2'><i className="fa-solid fa-trash"></i> Remove</button>
    </div>
    </div>
  </div>

  <div className="col-md-2">
    <button onClick={()=>addCartDataaa(el._id)} className=' listbtn p-2'>add To Cart</button>
  </div>
  

  </div>
  

})}

</div>

    </>
  )
}
