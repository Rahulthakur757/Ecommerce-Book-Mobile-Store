import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeCard from './HomeCard.jsx';
import BookDetail from './BookDetail.jsx';
import NavBar from './NavBar.jsx';
import MobileCard from './phone/MobileCard.jsx';
import HomeFooter from './footer/HomeFooter.jsx';
import Profile from './profilesection/Profile.jsx';
import Orders from './profilesection/Orders.jsx';
import {Provider} from 'react-redux';
import {store } from './app/store.js';
import ShoppingCart from './ShoppingCart.jsx';
import CheckOut from './CheckOut.jsx';
import MobileDetail from './phone/MobileDetail.jsx';
import PaymentSuccess from './payment/PaymentSuccess.jsx';
import PaymentFailure from './payment/PaymentFailure.jsx';
import CheckOutSingle from './CheckOutSingle.jsx';

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
  <BrowserRouter>
  <div style={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
  <NavBar></NavBar>
  <div style={{flex:1}}>
    <Routes>
      <Route path='/' element={<HomeCard></HomeCard>}></Route>
      <Route path='/book/detail/:id' element={<BookDetail></BookDetail>}></Route>
      <Route path='/mobile/detail/:id' element={<MobileDetail></MobileDetail>}></Route>
      <Route path='/book' element={<HomeCard/>}></Route>
      <Route path='/mobile' element={<MobileCard/>}></Route>
      <Route path='/profile' element={<Profile></Profile>}></Route>
      <Route path='/orders' element={<Orders></Orders>}></Route>
      <Route path='/cart' element={<ShoppingCart></ShoppingCart>}></Route>
      <Route path='/checkout' element={<CheckOut></CheckOut>}></Route>
      <Route path='/payment/success' element={<PaymentSuccess></PaymentSuccess>}></Route>
      <Route path='/payment/failure' element={<PaymentFailure></PaymentFailure>}></Route>
      <Route path='/checkout/single' element={<CheckOutSingle></CheckOutSingle>}></Route>
    </Routes>
    </div>
    <HomeFooter></HomeFooter>
    </div>
  </BrowserRouter>
  </Provider>
)
