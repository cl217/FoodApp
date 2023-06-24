import React, { useContext } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { SecondaryButton } from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FoodContext } from "../../components/FoodContext";

export default function SaveFoodScreen({ navigation }) {
  const { foods } = useContext(FoodContext);

  const renderFlatListItem = ({ item }) => (
    <View style={styles.foodListItem}>
      <View style={styles.foodName}>
        <Text>{item.foodName}</Text>
      </View>
      <View style={styles.foodCalories}>
        <Text>{item.calories}</Text>
      </View>
    </View>
  );

  const clearSavedFoods = async () => {
    try {
      await AsyncStorage.removeItem("savedFoods");
      console.log("Saved foods cleared successfully");
    } catch (error) {
      console.log("Error clearing saved foods:", error);
    }
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
            renderItem={renderFlatListItem}
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
