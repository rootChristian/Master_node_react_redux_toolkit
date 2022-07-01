import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import { useSelector } from "react-redux";
////import Product from './pages/Product';
import NotFound from './components/NotFound';
////import Users from './admin/pages/Users';
////import User from './admin/pages/User';
////import Products from './admin/pages/Products';
////import Prod from './admin/pages/Product';
////import Categories from './admin/pages/Categories';
////import Category from './admin/pages/Category';

function App() {
  /*const login = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : [];

  const { currentUser } = useSelector((state) => state.user);
*/

  const auth = useSelector((state) => state.auth);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' exact element={<Home />} />
        {auth.role === "ADMIN" || auth.role === "ROOT" ? (
          <>


          </>
        ) : (<></>)}
        <Route path='/login' exact element={auth.data.token ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' exact element={auth.data.token ? <Navigate to='/' /> : <Register />} />
        <Route path='/products' exact element={<ProductList />} />
        <Route path='/cart' exact element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
