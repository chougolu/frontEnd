import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Login } from './components/UserComponents/Login';
import { Register } from './components/UserComponents/Register';
import { ForgetPassword } from './components/UserComponents/ForgetPassword';
import { Profile } from './components/UserComponents/Profile';
import { ResetPassword } from './components/UserComponents/ResetPassword';
import { ProfileUpdate } from './components/UserComponents/ProfileUpdate';
import { PageNotFound } from './components/PageNotFound';
import { Protected } from './components/UserComponents/Protected';
import { ResetPassProtected } from './components/UserComponents/ResetPassProtected';
import { ProfileUpProtected } from './components/UserComponents/ProfileUpProtected';
import { AddCategory } from './components/CategoryComponents/AddCategory';
import { ShowCategory } from './components/CategoryComponents/ShowCategory';
import { UpdateCategory } from './components/CategoryComponents/UpdateCategory';
import { AddProduct } from './components/ProductComponents/AddProduct';
import { ShowProduct } from './components/ProductComponents/ShowProduct';
import { ProductDetails } from './components/ProductComponents/ProductDetails';
import { UpdateProduct } from './components/ProductComponents/UpdateProduct';
import { Home } from './components/Home';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* ---------- User's router ---------- */}
          <Route path='/register' element={<Protected RegisterCmnt={Register} />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/forget-password' element={<ForgetPassword />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/reset-password/:id' element={<ResetPassProtected ResetPassword={ResetPassword} />}></Route>
          <Route path='/profile-update' element={<ProfileUpProtected ProfileUpdate={ProfileUpdate} />}></Route>
          <Route path='*' element={<PageNotFound />}></Route>
          <Route path='/' element={<Home />}></Route>

          {/* ---------- Product's router ---------- */}
          <Route path='/add-product' element={<AddProduct />}></Route>
          <Route path='/show-products' element={<ShowProduct />}></Route>
          <Route path='/product-details/:readMoreId' element={<ProductDetails />}></Route>
          <Route path='/update-product/:editId' element={<UpdateProduct />}></Route>

          {/* ---------- Category's router ---------- */}
          <Route path='/add_category' element={<AddCategory />}></Route>
          <Route path='/show_category' element={<ShowCategory />}></Route>
          <Route path='/update_category/:editId' element={<UpdateCategory />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
