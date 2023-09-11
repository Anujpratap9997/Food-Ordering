import { useState } from "react";

import Header from "./Componenets/Layout/Header";
import Meals from "./Componenets/Meals/Meals";
import Cart from "./Componenets/Cart/Cart";
import CartProvider from "./store/CartProvider";


function App() {
  const[cartIsShown, setCartIsShown]=useState(false);


  const ShowCartHandler=()=>{
    setCartIsShown(true);
  };

  const HideCartHandler=()=>{
    setCartIsShown(false);
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={HideCartHandler}/>}
      <Header onShowCart={ShowCartHandler}/>
      <main>
      <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
