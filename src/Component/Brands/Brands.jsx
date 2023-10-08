import axios from 'axios'
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { Helmet } from 'react-helmet'

export default function Brands() {
  let [brandsList , setBrandList] = useState([])

  useEffect(  ()=>{
getBrandData()
  },[] )

  async  function getBrandData(){
    $(".loading").fadeIn(100)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setBrandList(data.data)
    $(".loading").fadeOut(1000)
  }

  function brandModel(el){
document.getElementById("imgBrand").setAttribute("src" ,el.image )
  }

  
  return (
    <>
      <div className="loading top-0 end-0 position-fixed bottom-0 bg-light start-0">
<i className='fa-solid fa-spinner fa-spin fa-4x '></i>
    </div>
    <Helmet>
      <title>Brands</title>
    </Helmet>


    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
  <img src="" className='w-50' id='imgBrand' alt="" /> 

      </div>
      
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>




<div className="brands my-5 text-center ">
<h2 className='text-main fw-bold mb-5'>All Brands</h2>
<div className="row g-3">
  {brandsList.map(  (el)=>{
    return <div key={el._id} onClick={()=>brandModel(el)} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="col-md-3">
    <div className="card text-center mb-2">
    <img src={el.image} className='w-100' alt="" />

<p>{el.name}</p>
    </div>
  </div>
  }  )}
</div>
</div>




    </>
  )
}
