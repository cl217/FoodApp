import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedFoods = await AsyncStorage.getItem('savedFoods');
        if (storedFoods !== null) {
          setFoods(JSON.parse(storedFoods));
        }
      } catch (error) {
        console.log('Error fetching foods:', error);
      }
    };

    fetchData();
  }, []);

  const addFood = async (food) => {
    try {
      const updatedFoods = [...foods, food];
      await AsyncStorage.setItem('savedFoods', JSON.stringify(updatedFoods));
      setFoods(updatedFoods);
    } catch (error) {
      console.log('Error adding food:', error);
    }
  };

  return (
    <FoodContext.Provider value={{ foods, addFood }}>
      {children}
    </FoodContext.Provider>
  );
};