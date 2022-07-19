import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Navbar, Products, Cart, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  
  const fetchProducts = async () => {
    const {data}= await commerce.products.list();

    setProducts(data);
  } 
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) =>{
    const {cart} = await commerce.cart.add(productId, quantity);

    setCart(cart);
  }

  const handleUpdateQty = async (productId, quantity) => {
    const {cart} = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  }
  const handleRemoveFromCart = async (productId) => {
    const {cart} = await commerce.cart.remove(productId);

    setCart(cart);
  }
  const handleEmptyCart = async () => {
    const {cart} = await commerce.cart.empty();

    setCart(cart);
  }

  useEffect(() =>{
    fetchProducts();
    fetchCart();
  },[]);

  return (
    <Router>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route path = "/" element={<Products onAddToCart={handleAddToCart} products = {products} />} />
        <Route path = "/cart" element={
        <Cart cart={cart}
          handleUpdateQty={handleUpdateQty}
          handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}
        />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
