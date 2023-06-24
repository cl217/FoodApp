import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SecondaryButton } from "../../components/Button";
import { FoodContext } from "../../components/FoodContext";
import { useNavigation } from "@react-navigation/native";
import TopNavigationHeader from "../../components/TopNavigationHeader";

export default function AddFoodScreen(props) {
  const { foods } = useContext(FoodContext);
  const navigation = useNavigation();
  const { addToFoodLog } = useContext(FoodContext);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddFoodItem = (itemKey) => {
    // console.log("Item pressed:", item.foodName);
    console.log("Itemkey: ", itemKey);

    // Check if the item is already selected
    const isSelected = selectedItems.includes(itemKey);

    if (isSelected) {
      // Item is already selected, remove it from the selected items array
      setSelectedItems(selectedItems.filter((key) => key !== itemKey));
    } else {
      // Item is not selected, add it to the selected items array
      setSelectedItems([...selectedItems, itemKey]);
    }
  };

  const handleSaveAddFoodItem = () => {
    console.log(props.route.params.date + " " + props.route.params.meal);
    selectedItems.map((foodName) => {
      console.log(foodName);
    });

    addToFoodLog(
      selectedItems,
      props.route.params.date,
      props.route.params.meal
    );
    navigation.navigate("Log Food");
  };

  const renderFlatListItem = ({ item }) => {
    const isSelected = selectedItems.includes(item.foodName);
    return (
      <TouchableOpacity onPress={() => handleAddFoodItem(item.foodName)}>
        <View
          style={[
            styles.foodListItem,
            { backgroundColor: isSelected ? "lightblue" : "white" },
          ]}
        >
          <View style={styles.foodName}>
            <Text>{item.foodName}</Text>
          </View>
          <View style={styles.foodCalories}>
            <Text>{item.foodCalories}</Text>
          </View>

          {isSelected && (
            <View style={styles.checkmarkContainer}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <TopNavigationHeader title="Add Foods" onSave={handleSaveAddFoodItem} />

        {/* <Text style={styles.sectionTitle}>{props.route.params.date}</Text> */}

        <View style={styles.items}>
          <FlatList
            data={foods}
            renderItem={renderFlatListItem}
            keyExtractor={(item) => item.foodName}
            // keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={styles.items}></View>
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
