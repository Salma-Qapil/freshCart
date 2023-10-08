import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/freshcart-logo.svg"
import { CartContext } from '../../Context/CartContext'

export default function Navbar({userData , LogOut}) {
  let {cartCount} = useContext(CartContext)
  return (
    <>
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <Link className="navbar-brand" to="home">
<img src={logo} className='logo' alt="" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
    {userData != null ?   <ul className="navbar-nav mx-auto mb-2 me-5 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="home" >Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="cart" >Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="wishList" >wish list</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="product" >Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="categories" >Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="brands" >Brands</Link>
        </li>
      
      </ul> :""}



      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {userData == null ? <>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="login" >Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/" >Register</Link>
        </li> </>: <>
        <li className="nav-item">
        <Link className="nav-link pe-3 position-relative" aria-current="page" to="cart" >
        <i className="fa-solid fa-cart-shopping fs-4 text-black"></i>
  <span className="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-success">
  {cartCount}
  </span>

        </Link>
      </li>
        
        <li className="nav-item">
          <span onClick={LogOut} className="nav-link cursor-pointer " aria-current="page" to="product" >LogOut</span>
        </li></> }
        
      
      </ul>
      
    </div>
  </div>
</nav>
    </>
  )
}
