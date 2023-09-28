import React, { useRef, useState } from 'react'

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

//#TODO: Need to show a tooltip when user select more than 5 quantity
const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid]=useState(true);
    const amountInputRef = useRef();


    const submitHandler =event=>{
        event.preventDefault();
        

        const enteredAmount =amountInputRef.current.value;
        const enteredAmountNumber=+enteredAmount;
        // console.log(enteredAmountNumber)


        if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5){
            setAmountIsValid(false)
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <Input
            ref={amountInputRef} 
            label="Quantity:" input={{
            id:'amount_'+props.id,
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }}/>
        <button type='submit'>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  )
}

export default MealItemForm
