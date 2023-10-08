import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
export default function CategorySlider() {

  let [CategoryList , setCategoryList] = useState([])
  useEffect(()=>{
    getCategoryData()
  },[])

async function getCategoryData(){
let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
setCategoryList(data.data)
}


  return (
    <>

<OwlCarousel className='owl-theme' items={6} autoPlay autoplayTimeout={100} loop  >
    {CategoryList.map((el)=>{
      return <div key={el._id} className='item'>
        <img src={el.image} className='smallImg' alt="" />
      </div>
    })}
      </OwlCarousel>


    </>
  )
}
