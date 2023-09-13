import { useRef, useState } from 'react';
import classes from './Checkout.module.css';


const isEmpty =value => value.trim()===''; // Helper function to validate the input are not empty
const isFiveChars =value=> value.trim().length === 6 || isEmpty(value);
const Checkout = (props) => {


    const [formInputValidity,setFromInputValidity] = useState({
        name:true,
        street: true,
        city:true,
        postelCode:true
    });


    const nameInputRef =useRef();
    const streetInputRef =useRef();
    const postelCodeInputRef =useRef();
    const cityInputRef =useRef();
  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName=nameInputRef.current.value; // Read the input valued that are entered by the users 
    const enteredStreet=streetInputRef.current.value;
    const enteredPostelCode=postelCodeInputRef.current.value;
    const enteredCity=cityInputRef.current.value;


     const enteredNameIsvalid =!isEmpty(enteredName);
     const enteredStreetIsvalid =!isEmpty(enteredStreet);
     const enteredPostelCodeIsvalid =isFiveChars(enteredPostelCode);
     const enteredCityIsvalid =!isEmpty(enteredCity);

     setFromInputValidity({
        name:enteredNameIsvalid,
        street:enteredStreetIsvalid,
        city:enteredCityIsvalid,
        postelCode:enteredPostelCodeIsvalid
     });

     const formIsValid =
         enteredNameIsvalid && 
         enteredCityIsvalid &&
         enteredPostelCodeIsvalid &&
         enteredStreetIsvalid;

     if (!formIsValid){
        return;
     }

        props.onConfirm({
          name:enteredName,
          street: enteredStreet,
          city:enteredCity,
          posterlCode:enteredPostelCode,
        });

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid }`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} title='Enter a valid Name'/>
        {!formInputValidity.name && <p>Please enter a valid name! </p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid }`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please enter a valid Street name! </p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.postelCode ? '' : classes.invalid }`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postelCodeInputRef} title='Please enter a valid postel code 6 chars long' />
        {!formInputValidity.postelCode && <p>Please enter a valid Postel Code! </p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid }`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p>Please enter a valid City name! </p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;