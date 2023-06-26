import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import foodListData from "../data/foodListData";
import { useNavigation } from "@react-navigation/native";
import { FoodContext } from "./FoodContext";

const Meal = (props) => {
  const navigation = useNavigation();
  const { foodLog } = useContext(FoodContext);
  const [foodList, setFoodList] = useState([]);
  const { foods } = useContext(FoodContext);

  const handleNavigateToAddFood = () => {
    navigation.navigate("Add Food", { date: props.date, meal: props.text });
  };

  useEffect(() => {
    // Fetch the food list based on the date and meal
    const fetchFoodList = () => {
      console.log("ALL SAVED FOODS: ");
      console.log(foods);
      foods.map((item) => {
        console.log(item.foodName + "(End)");
      });
      if (foodLog && foodLog.length > 0) {
        const { date, text: meal } = props;
        const selectedLog = foodLog.find((log) => log.date === date);
        console.log("selectedLog:");
        console.log(selectedLog);

        if (selectedLog && selectedLog[meal]) {
          getFoodList = [];

          console.log("selectedLog[meal]: " + selectedLog[meal]);
          console.log("length:" + selectedLog[meal].length);
          selectedLog[meal].map((item) => {
            console.log("loop item: " + item + "(End)");
            const findFood = foods.find(
              (food) => food.foodName === item.toString()
            );
            console.log("food found: " + findFood);
            if (findFood) {
              getFoodList.push(findFood);
            }
          });

          setFoodList(getFoodList);
        } else {
          setFoodList([]);
        }
      } else {
        setFoodList([]);
      }
    };

    fetchFoodList();
  }, [foodLog, props]);

  return (
    <View style={styles.meal}>
      <View style={styles.mealHeadingRow}>
        <View style={styles.mealHeading}>
          <Text style={styles.mealHeadingText}>{props.text}</Text>
        </View>
        {/* <View style={styles.mealHeading}>
          <Text style={styles.mealHeadingText}>{props.date}</Text>
        </View> */}
        <View style={styles.addFoodButton}>
          <PrimaryButton
            title={"Add Food"}
            onPress={handleNavigateToAddFood}
          ></PrimaryButton>
        </View>
      </View>

      <View>
        {foodList.map((item, index) => {
          return (
            <View style={styles.foodListItem} key={index}>
              <View style={styles.foodName}>
                <Text>{item.foodName}</Text>
              </View>
              <View style={styles.foodCalories}>
                <Text>{item.calories}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  meal: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mealHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  mealHeading: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealHeadingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  addFoodButton: {
    marginLeft: "auto", // Pushes the button to the top right
    width: 80,
  },
  foodList: {
    marginTop: 10,
  },
  foodListItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  foodName: {
    flexDirection: "row",
    alignItems: "center",
  },
  foodCalories: {
    marginLeft: "auto", // Pushes the button to the top right
  },
});

export default Meal;
