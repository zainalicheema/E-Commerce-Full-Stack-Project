import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceHolder'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPop from './components/LoginPop/LoginPop'


const App = () => {

  const [showlogin,setshowlogin] = useState(false)

  return (
   <>
   {showlogin?<LoginPop setshowlogin={setshowlogin}/>:<></>}
    <div className='app'>
      <Navbar setshowlogin={setshowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
      </Routes>
    </div>
     <Footer/>
   </>
  )
}

export default App
