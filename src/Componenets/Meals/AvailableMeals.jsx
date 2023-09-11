
import React, { useEffect, useState } from 'react'

import Card from '../UI/Card';
import Spinner from '../Layout/Spinner';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css'




const AvailableMeals = () => {
  const [meals, setmeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  
  const [httpsError, setHttpsError] =useState();

    useEffect(()=>{
      const fetchMeals = async () =>{
        const response = await fetch('https://food-ordering-b572a-default-rtdb.firebaseio.com/meals.json');
        
        if (!response.ok){
          throw new Error('Something went wrong!!');
        }
        
        const responseData = await response.json(); // firebase specific response data

        const loadedMeals =[];

        for (const key in responseData){
          loadedMeals.push({
            id:key, // this key is working as m1, m2 , m3, m4
            name: responseData[key].name, // fetching the data from firebase for aeach key
            price:+responseData[key].price,
            description:responseData[key].description
          });
        }

        setmeals(loadedMeals);
        setIsLoading(false);

      };

        fetchMeals().catch((error)=>{
          setIsLoading(false);
          setHttpsError(error.message);
        });
  


    },[]);

    if (isLoading){
      return(
        <section className={classes.MealLoading}>
          <Card>
            <Spinner/> 
          </Card>
          
        </section>
      );
    }

    if (httpsError){
      return (
        <section className={classes.MealError}>
        <Card>
          <p>{httpsError}</p> 
        </Card>
        
      </section>
      );
    }


    const mealsList = meals.map((meal)=> (
    <MealItem
    id={meal.id}
     key={meal.id}
     name={meal.name} 
     description={meal.description} 
     price={meal.price}
      />
      ));

  return (
    <section className={classes.meals}>
        <Card>
        <ul>
            {mealsList}
        </ul>
        </Card>
    </section>
  )
}

export default AvailableMeals;
