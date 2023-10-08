import axios from "axios";
import { createContext,  useEffect,  useState } from "react";



export let CartContext = createContext()


export default function CartContextProvider(props){

  let [cartCount , setCartCount] = useState(0)

  let headersData = {
    token: localStorage.getItem("dataToken")
  }

  useEffect(()=>{
  async function getData(){
  let {data} = await getAllCartData()
  setCartCount(data.numOfCartItems)
  }
  getData()
  },[])

  async function getAllCartData(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` ,{
      headers:headersData
    } )
  }
  async function getAllWishlistData(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` ,{
      headers:headersData
    } )
  }
  function deleteCartData(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{
      headers:headersData
    } )
  }
  function deletewishList(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` ,{
      headers:headersData
    } )
  }

function addToCartData(id){
  let body={
    "productId": id
}
  return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , body,{
      headers:headersData
    })
}


function checkPayment(id , shipingData){
let body ={
  shippingAddress : shipingData
}
return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000/` , body, {
  headers:headersData
})
}


function wishlistData(id){
  let body={
    "productId": id
}
  return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , body,{
    headers:headersData
  })
}



function updateCartData(id, count){
  let body={
    "count": count
}
  return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , body,{
      headers:headersData
    })
}

return <CartContext.Provider value={{addToCartData , getAllCartData,deleteCartData ,
  updateCartData , checkPayment , cartCount ,deletewishList, setCartCount ,getAllWishlistData, wishlistData}}>
  {props.children}
</CartContext.Provider>
}