import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout({userData , LogOut}) {
  return (
    <>
    <Navbar LogOut={LogOut} userData={userData}/>
  <div className="container my-3 py-5">
    <Outlet/>
  </div>
    </>
  )
}
