import React from 'react'
import slider1 from "../../assets/images/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/images/slider-image-3.jpeg"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function MainSlider() {
  return (
    <>
    <div className="row my-5 g-0">
      <div className="col-md-9">
      <OwlCarousel className='owl-theme' items={1} autoPlay autoplayTimeout={100} loop  >
    <div className='item'>
    <img src={slider3} className='w-100 mainImg' alt="" />
    </div>
    <div className='item'>
    <img src={slider2} className='w-100 mainImg' alt="" />
    </div>
    <div className='item'>
    <img src={slider1} className='w-100 mainImg' alt="" />
    </div>
</OwlCarousel>

      </div>
      <div className="col-md-3">
      <img src={slider1} className='w-100 smallImg' alt="" />
      <img src={slider2} className='w-100 smallImg' alt="" />

      </div>
    </div>
    
    </>
  )
}
