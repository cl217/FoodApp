import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import foodListData from "../data/foodListData";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FoodContext } from "./FoodContext";
import { Swipeable } from "react-native-gesture-handler";

const Meal = (props) => {
  const navigation = useNavigation();
  const { foodLog, foods, removeFromFoodLog } = useContext(FoodContext);
  const [foodList, setFoodList] = useState([]);

  let row = [];
  let prevOpenedRow;

  const handleNavigateToAddFood = () => {
    navigation.navigate("Add Food", { date: props.date, meal: props.text });
  };

  useEffect(() => {
    // Fetch the food list based on the date and meal
    const fetchFoodList = () => {
      if (foodLog && foodLog.length > 0) {
        const { date, text: meal } = props;
        const selectedLog = foodLog.find((log) => log.date === date);
        if (selectedLog && selectedLog[meal]) {
          getFoodList = [];

          selectedLog[meal].map((item) => {
            const findFood = foods.find(
              (food) => food.foodName === item.toString()
            );
            if (findFood) {
              getFoodList.push(findFood);
            } else {
              const unfoundFood = {
                foodName: item.toString(),
                calories: "no data",
              };
              getFoodList.push(unfoundFood);
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
  }, [foodLog, foods, props]);

  const closeRow = (index) => {
    console.log("closerow");
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderRightView = (onDeleteHandler) => {
    return (
      <View
        style={{
          margin: 0,
          alignContent: "center",
          justifyContent: "center",
          width: 70,
        }}
      >
        <Button
          color="red"
          onPress={(e) => {
            onDeleteHandler(e);
          }}
          title="DELETE"
        ></Button>
      </View>
    );
  };

  return (
    <View style={styles.meal}>
      <View style={styles.mealHeadingRow}>
        <View style={styles.mealHeading}>
          <Text style={styles.mealHeadingText}>{props.text}</Text>
        </View>
        <View style={styles.addFoodButton}>
          <PrimaryButton
            title={"Add Food"}
            onPress={handleNavigateToAddFood}
          ></PrimaryButton>
        </View>
      </View>

      <View>
        {foodList.map((item, index) => {
          const onDelete = () => {
            console.log(
              "Deleting item:",
              item.foodName,
              ", Date:",
              props.date,
              ", Meal:",
              props.text
            );
            removeFromFoodLog(item.foodName, props.date, props.text);
            row[index].close();
          };
          return (
            <Swipeable
              renderRightActions={(progress, dragX) =>
                renderRightView(onDelete)
              }
              onSwipeableOpen={() => closeRow(index)}
              ref={(ref) => (row[index] = ref)}
              rightOpenValue={-100}
            >
              <View style={styles.foodListItem} key={index}>
                <View style={styles.foodName}>
                  <Text>{item.foodName}</Text>
                </View>
                <View style={styles.foodCalories}>
                  <Text>{item.calories}</Text>
                </View>
              </View>
            </Swipeable>
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
