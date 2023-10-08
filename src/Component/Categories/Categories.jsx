import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import axios from 'axios'
import { Helmet } from 'react-helmet'
export default function Categories() {
  let [categoryList , setAllCategory] = useState([])

async function getAllCategory(){
  $(".loading").fadeIn(1000)
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  setAllCategory(data.data)
  $(".loading").fadeOut(1000)
}

useEffect(  ()=>{
  getAllCategory()
    },[] )

  return (
    <>
    <div className="loading top-0 end-0 position-fixed bottom-0 bg-light start-0">
<i className='fa-solid fa-spinner fa-spin fa-4x '></i>
    </div>
<Helmet>
  <title>Categories</title>
</Helmet>
<div className="category  my-5">
<div className="row">
  {categoryList.map((el)=>{
return <div className="col-md-4 py-3">
<div className="CategoryCard border  text-center">
 <img src={el.image} alt="" className='w-100' />
  <h3 className='text-success text-center fw-bold'>{el.name}</h3>
</div>
</div>
  })}
</div>
</div>

    </>
  )
}
