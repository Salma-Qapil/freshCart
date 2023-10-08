import React from 'react'
import error from "../../assets/images/error.svg"
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (
    <>
    <Helmet>
      <title>404 NotFound</title>
    </Helmet>
    <div className="container d-flex justify-content-center align-items-center mt-5">
    <img src={error} className='w-50' alt='' />
    </div>
    </>
  )
}
