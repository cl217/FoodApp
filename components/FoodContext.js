import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [foodLog, setFoodLog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedFoods = await AsyncStorage.getItem("savedFoods");
        if (storedFoods !== null) {
          setFoods(JSON.parse(storedFoods));
        }

        const storedFoodLog = await AsyncStorage.getItem("savedFoodLog");
        if (storedFoodLog != null) {
          setFoodLog(JSON.parse(storedFoodLog));
        }
      } catch (error) {
        console.log("Error fetching foods:", error);
      }
    };

    fetchData();
  }, []);

  const addFood = async (food) => {
    try {
      const updatedFoods = [...foods, food];
      await AsyncStorage.setItem("savedFoods", JSON.stringify(updatedFoods));
      setFoods(updatedFoods);
    } catch (error) {
      console.log("Error adding food:", error);
    }
  };

  const removeFood = async (food) => {
    try {
      const updatedFoods = foods.filter((item) => item.foodName !== food);
      setFoods(updatedFoods);
      await AsyncStorage.setItem("savedFoods", JSON.stringify(updatedFoods));
    } catch (error) {
      console.log("Error removing food:", error);
    }
  };

  const removeFromFoodLog = async (foodsToRemove, date, meal) => {
    try {
      const existingFoodLogForDate = foodLog.find((log) => log.date === date);
      if (existingFoodLogForDate) {
        // FoodLog with the specified date exists
        const updatedFoodLog = foodLog.map((log) => {
          if (log.date === date) {
            // Remove the food from the specified meal (breakfast, lunch, dinner)
            const updatedMeal = log[meal].filter(
              (food) => !foodsToRemove.includes(food)
            );
            return { ...log, [meal]: updatedMeal };
          }
          return log;
        });

        console.log("updatedFoodLog");
        console.log(updatedFoodLog);
        await AsyncStorage.setItem(
          "savedFoodLog",
          JSON.stringify(updatedFoodLog)
        );
        setFoodLog(updatedFoodLog);
      }
    } catch (error) {
      console.log("Error removing from food log:", error);
    }
  };

  const addToFoodLog = async (foodsToAdd, date, meal) => {
    try {
      const existingFoodLogForDate = foodLog.find((log) => log.date === date);
      if (existingFoodLogForDate) {
        // FoodLog with the specified date already exists
        const updatedFoodLog = foodLog.map((log) => {
          if (log.date === date) {
            // Update the specific meal (breakfast, lunch, dinner) with the new food item
            const updatedMeal = [...log[meal], ...foodsToAdd];
            return { ...log, [meal]: updatedMeal };
          }
          return log;
        });

        await AsyncStorage.setItem(
          "savedFoodLog",
          JSON.stringify(updatedFoodLog)
        );
        setFoodLog(updatedFoodLog);
      } else {
        // FoodLog with the specified date doesn't exist, create a new entry
        const newFoodLog = {
          date,
          Breakfast: [],
          Lunch: [],
          Dinner: [],
          Snack: [],
        };
        newFoodLog[meal] = [...newFoodLog[meal], ...foodsToAdd];

        const updatedFoodLog = [...foodLog, newFoodLog];
        await AsyncStorage.setItem(
          "savedFoodLog",
          JSON.stringify(updatedFoodLog)
        );
        setFoodLog(updatedFoodLog);
      }
    } catch (error) {
      console.log("Error adding to food log:", error);
    }
  };

  return (
    <FoodContext.Provider
      value={{
        foods,
        foodLog,
        addFood,
        addToFoodLog,
        removeFood,
        removeFromFoodLog,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
