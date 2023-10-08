import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import * as Yup from "yup"

export default function CheckOut() {
  let {id} = useParams()
  let {checkPayment} = useContext(CartContext)

let validationSchema = Yup.object({
  details: Yup.string().required("Details is required"),
  phone: Yup.string().required("Phone is required").matches(/^01[1250][0-9]{8}$/, "Enter valid phone"),
  city: Yup.string().required("City is required")
})

  let shippingForm = useFormik({
    initialValues:{
      details:"",
      phone:"",
      city:""
    },
    validationSchema,
    onSubmit:function(val){
      payShipping(val)
    }
  })

  async function payShipping(val){
let {data} = await checkPayment(id, val)
if(data.status === "success"){
  window.location.href = data.session.url
}
  }
  return (
    <>

    <Helmet>
      <title>CheckOut</title>
    </Helmet>
<form className='py-4' onSubmit={shippingForm.handleSubmit}>

<label htmlFor="details" className='mb-2 ps-1'>Details</label>
<input onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} type="text" className='form-control' name="details" id="details" />
{shippingForm.touched.details ?<p className='text-danger  my-2'>{shippingForm.errors.details}</p> :"" }


<label htmlFor="phone" className='mt-3 mb-2 ps-1'>Phone</label>
<input onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} type="tel" className='form-control mb-3'  name="phone" id="phone" />
{shippingForm.touched.phone ?<p className='text-danger  my-2'>{shippingForm.errors.phone}</p> :"" }

<label htmlFor="city" className='mb-2 ps-1'>City</label>
<input onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} type="text" className='form-control'  name="city" id="city" />
{shippingForm.touched.city ?<p className='text-danger  my-2'>{shippingForm.errors.city}</p> :"" }


<button className='btn bg-main text-white d-block mx-auto my-3 px-4 '>Pay<i className="fa-brands fa-cc-visa px-2"></i></button>


</form>
    </>
  )
}
