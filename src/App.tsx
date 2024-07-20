import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './components/Products/Products';
import CartList from './components/CartList/CartList';
import { Notifications } from 'react-push-notification';


function App() {
  return (
    <>
      <Notifications position='bottom-right' />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/cart' element={<CartList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
