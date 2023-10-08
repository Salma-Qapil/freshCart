import React, { useEffect, useState } from 'react'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home'
import Product from './Component/Product/Product'
import Login from './Component/Login/Login'
import Register from './Component/Register/Register'
import NotFound from './Component/NotFound/NotFound'
import jwtDecode from 'jwt-decode'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import Cart from './Component/Cart/Cart'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword'
import ResetPassword from './Component/ResetPassword/ResetPassword'
import Brands from './Component/Brands/Brands'
import CartContextProvider from './Context/CartContext'
import CheckOut from './Component/CheckOut/CheckOut'
import Categories from './Component/Categories/Categories'
import WishList from './Component/WishList/WishList'



export default function App() {

  let [userData, setUserData] = useState(null)

  useEffect(()=>{
    if (localStorage.getItem("dataToken")) {
      let token = localStorage.getItem("dataToken")
      let data = jwtDecode(token)
      saveUserData(data)
    }
  },[])

  function saveUserData(data){
setUserData(data)
  }

function ProtectedData(props) {
  if (localStorage.getItem("dataToken")) {
    return props.children
  }else{
  return  <Navigate to='/login' />
  }
}

function LogOut(){
  saveUserData(null)
  localStorage.removeItem("dataToken")
  return  <Navigate to='/login' />
}




  let routes = createHashRouter([
    {path:"", element:<Layout LogOut={LogOut} userData={userData}/> , children:[
      {path:"home" , element:<ProtectedData><Home/></ProtectedData>},
      {path:"cart" , element:<ProtectedData><Cart/></ProtectedData>},
      {path:"wishList" , element:<ProtectedData><WishList/></ProtectedData>},
      {path:"product" , element:<ProtectedData><Product/></ProtectedData>},
      {path:"CheckOut/:id" , element:<ProtectedData><CheckOut/></ProtectedData>},
      {path:"brands" , element:<ProtectedData><Brands/></ProtectedData>},
      {path:"categories" , element:<ProtectedData><Categories/></ProtectedData>},
      {path:"ProductDetails/:id" , element:<ProtectedData><ProductDetails/></ProtectedData>},
      {path:"ForgetPassword" , element:<ForgetPassword/>},
      {path:"ResetPassword" , element:<ResetPassword/>},
      {path:"login" , element:<Login saveUserData={saveUserData}/>},
      {index:true , element:<Register/>},
      {path:"*" , element:<NotFound/>}
    ]}
  ])
  return (
    <>
<CartContextProvider>
<RouterProvider router={routes} />
</CartContextProvider>


    </>
  )
}
