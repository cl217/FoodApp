import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { SecondaryButton } from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FoodContext } from "../../components/FoodContext";
import { Swipeable } from "react-native-gesture-handler";

export default function SaveFoodScreen({ navigation }) {
  const { foods, removeFood } = useContext(FoodContext);

  let row = [];
  let prevOpenedRow;

  const handleEditFood = (item) => {
    const foodName = item.foodName;
    console.log(foodName);
    navigation.navigate("Create Food", { foodName });
  };

  const renderFlatListItem = ({ item, index }, onDelete) => (
    <Swipeable
      renderRightActions={(progress, dragX) => renderRightView(onDelete)}
      onSwipeableOpen={() => closeRow(index)}
      ref={(ref) => (row[index] = ref)}
      rightOpenValue={-100}
    >
      <TouchableOpacity onPress={() => handleEditFood(item)}>
        <View style={styles.foodListItem}>
          <View style={styles.foodName}>
            <Text>{item.foodName}</Text>
          </View>
          <View style={styles.foodCalories}>
            <Text>{item.calories}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  const clearSavedFoods = async () => {
    try {
      await AsyncStorage.removeItem("savedFoods");
      console.log("Saved foods cleared successfully");
    } catch (error) {
      console.log("Error clearing saved foods:", error);
    }
  };

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
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>{"My Foods"}</Text>

        <View style={styles.addFoodButton}>
          <SecondaryButton
            title={"Create Food"}
            onPress={() => navigation.navigate("Create Food")}
          />
        </View>
        <View style={styles.addFoodButton}>
          <SecondaryButton title={"Clear Food"} onPress={clearSavedFoods} />
        </View>

        <View style={styles.items}>
          <FlatList
            data={foods}
            renderItem={(rowItem) =>
              renderFlatListItem(rowItem, () => {
                console.log("deleting item: ", rowItem.item.foodName);
                removeFood(rowItem.item.foodName);
                row[rowItem.index].close();
              })
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
    marginBottom: 80,
  },
  foodList: {
    marginTop: 20,
    flex: 1,
  },
  foodListItem: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    marginBottom: 5,
    padding: 15,
    borderRadius: 10,
  },
  foodName: {
    flexDirection: "row",
    alignItems: "center",
  },
  foodCalories: {
    marginLeft: "auto", // Pushes the button to the top right
  },
  addFoodButton: {
    marginTop: 10,
  },
});
