import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AppContextProvider, useAppContext } from './context/AppContext'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProducts from './pages/seller/AddProducts'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'


const App = () => {

  const isSellerPath = useLocation().pathname.includes('seller');
  const { showUserLogin, isSeller } = useAppContext()
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'> {/**this is added section from the video */}

      {isSellerPath ? null : <Navbar/>} {/**Navbar is conditionally shown */}
      {showUserLogin ? <Login/> : null}
      <Toaster /> {/**Toasts show globally */}
      <div className= {`${isSellerPath ? "" : " px-6 md:px-16 lg:px-24 xl:px-32"}`}> {/**Page content changes by route */}
        <Routes>
          <Route path='/' element={<Home/ >} />
          <Route path='/products' element={<AllProducts/ >} />
          <Route path='/products/:category' element={<ProductCategory/>} />
          <Route path='/products/:category/:id' element={<ProductDetails/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/add-address' element={<AddAddress/>} />
          <Route path='/my-orders' element={<MyOrders/>} />
          {/**seller routes */}
          <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
            <Route index element={<AddProducts/>} />
            <Route path='product-list' element={<ProductList/>} />
            <Route path='orders' element={<Orders/>} />
          </Route>






          
        </Routes>
      </div>
      {!isSellerPath && <Footer />} {/**we have to make sure that footer is seen in all the pages */}
      
    </div>
  )
}

export default App