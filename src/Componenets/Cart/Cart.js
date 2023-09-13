import React, { useState } from 'react'

import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import Spinner from "../Layout/Spinner";

const Cart = (props) => {
  const [isCheckout, setIsCheckoiut] = useState(false);
  const [isSubmitting,setIsSubmiting] = useState(false);
  const [disSubmit, setDidSbmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount= `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler=id=>{
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler=item=>{
        cartCtx.addItem({...item,amount:1});
    };

    const orderHandler=()=>{
      setIsCheckoiut(true);
    }; 

    const submitOrderhandler=async(userData)=>{
      setIsSubmiting(true);
      const response = await fetch('https://food-ordering-b572a-default-rtdb.firebaseio.com/order.json',{
        method:'POST',
        body: JSON.stringify({
          user:userData,
          orderedItems:cartCtx.items
        })
      });
      setIsSubmiting(false);
      setDidSbmit(true);
      cartCtx.clearCart();

    }

 
    const Cartitems=(
    <ul className={classes['cart-items']}>
        {cartCtx.items.map((item)=>{
        return(
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}

               />
        )
    })}
    </ul>
    );

    const modalActions =(
        <div className={classes.actions}>
        <button className={classes['botton--alt']} onClick={props.onClose}>Close</button>
        {hasItems&&<button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
  )


  const cartModalContent = 
  <React.Fragment>
              {Cartitems}
              <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
              </div>
              {isCheckout && <Checkout onConfirm={submitOrderhandler} onCancel={props.onClose}/>} 
              {!isCheckout && modalActions}
  </React.Fragment>

  const isSubmittingModalContent = <Spinner/>

  const didSubmitModelContent = <React.Fragment>
    <p>Succesfully sent the order</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick ={props.onClose}>
        Close
      </button>

    </div>
    </React.Fragment>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !disSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && disSubmit && didSubmitModelContent}
    </Modal>
  )
}

export default Cart;
