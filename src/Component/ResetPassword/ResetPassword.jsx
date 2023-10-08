import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function ResetPassword() {
  let [errorMessage, setErrorMessage] = useState("")
let nav = useNavigate()
  let validationSchema = Yup.object({
    email:Yup.string().required("Email Required").email("Enter Valid Email"),
    newPassword:Yup.string().required("newPassword Required").matches(/^[A-z][a-z0-9]{3,16}$/ , "Enter Valid Password")
  })
  let newPass = useFormik({
    initialValues:{
      email:"",
      newPassword:""
    },
    validationSchema,
    onSubmit:handelNewPass
  })

  async function handelNewPass(val){
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` ,val).catch((error)=>{
      setErrorMessage(error.response.data.message)
    })
    if(data.token){
  nav("/login")
    }
  }
  return (
    <>
    <div className="reset my-5">
    {errorMessage === "" ? "" :<div className="alert alert-danger text-center">{errorMessage}</div> }
      <form onSubmit={newPass.handleSubmit}>
        <label htmlFor="email">Enter Your Email</label>
        <input onBlur={newPass.handleBlur} onChange={newPass.handleChange} type="email" className='form-control my-1 ' name='email' id='email'/>
        {newPass.touched.email ? <p className='text-danger mb-0 mt-2'>{newPass.errors.email}</p> :""}

        <label htmlFor="newPassword" className='mt-3'>Enter New Password</label>
        <input onBlur={newPass.handleBlur} onChange={newPass.handleChange} type="password" className='form-control my-1' name='newPassword' id='newPassword'/>
        {newPass.touched.newPassword ? <p className='text-danger mb-0 mt-2'>{newPass.errors.newPassword}</p> :""}

  <button disabled={!(newPass.isValid && newPass.dirty)} className='btn btn-success mt-3 px-3'>Reset Password</button>
      </form>
    </div>
    </>
  )
}
