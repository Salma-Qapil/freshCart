import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function ForgetPassword() {
let nav = useNavigate()
  let [errors,setError] = useState()
let validationSchema = Yup.object({
  email:Yup.string().required("Email Required").email("Enter Valid Email")
})

let forgetPass = useFormik({
  initialValues:{
    email:""
  },
  validationSchema,
  onSubmit:handelForgetPass
})

async function handelForgetPass(val) {
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , val).catch((err)=>{
    console.log(err)
  })
  console.log(data)
  if(data.statusMsg == "success"){
document.getElementById("reset").classList.remove("d-none")
document.getElementById("forget").classList.add("d-none")
  }
}

let validation = Yup.object({
  resetCode:Yup.string().required("ResetCode Required").matches(/^[0-9]+$/, "must be numbers")
})

let reseet= useFormik({
  initialValues:{
    resetCode:""
  },
  validationSchema:validation,
  onSubmit:handelreset
})

async function handelreset(val){
let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , val).catch((err)=>{
  setError(err.response.data.message)
})
if(data.status == "Success"){
  nav("/ResetPassword")
}
}

  return (
    <>

    <Helmet>
      <title>Forget Password</title>
    </Helmet>

<div id='forget' className="form my-5">
  <form onSubmit={forgetPass.handleSubmit}>
    <label htmlFor="email" className='mb-2'>Enter Your Email</label>
    <input onBlur={forgetPass.handleBlur} onChange={forgetPass.handleChange} type="email" name="email" id="email" className='form-control' />
    
    {forgetPass.touched.email ? <p className='text-danger mb-0 mt-2'>{forgetPass.errors.email}</p> :""}
    
    
    <button disabled={!(forgetPass.isValid && forgetPass.dirty)} className='btn btn-success mt-3 px-3'>Send Code</button>
  </form>
</div>

<div id='reset' className="form2 my-5 d-none">

{errors? <div className="alert alert-danger text-center my-3">{errors}</div> :  ""}
  <form onSubmit={reseet.handleSubmit} >
<label htmlFor="resetCode" className='mb-2'>resetCode</label>
<input onBlur={reseet.handleBlur} onChange={reseet.handleChange} type="text" name='resetCode' id='resetCode' className='form-control' />

{reseet.touched.resetCode ? <p className='text-danger mb-0 mt-2'>{reseet.errors.resetCode}</p> :""}
<button  disabled={!(reseet.isValid && reseet.dirty)} className='mt-3 px-3 btn btn-success'>Verify Code</button>
  </form>
</div>

    </>
  )
}
