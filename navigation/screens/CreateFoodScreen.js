import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import TopNavigationHeader from "../../components/TopNavigationHeader";
import { FoodContext } from "../../components/FoodContext";
import { SecondaryButton } from "../../components/Button";

export default function CreateFoodScreen({ navigation, route }) {
  const [editCreate, setEditCreate] = useState("Create");
  const [foodName, setFoodName] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [calories, setCalories] = useState("");

  const [fat, setFat] = useState("");
  const [saturatedFat, setSaturatedFat] = useState("");
  const [transFat, setTransFat] = useState("");
  const [polyFat, setPolyFat] = useState("");
  const [monoFat, setMonoFat] = useState("");

  const [cholesterol, setCholesterol] = useState("");
  const [sodium, setSodium] = useState("");

  const [carbs, setCarbs] = useState("");
  const [fiber, setFiber] = useState("");
  const [sugar, setSugar] = useState("");

  const [protein, setProtein] = useState("");

  const { addFood, foods, editFood } = useContext(FoodContext);

  useEffect(() => {
    if (route.params) {
      console.log(route.params);
      const findFood = foods.find(
        (food) => food.foodName === route.params.foodName
      );
      setEditCreate("Edit");
      if (findFood) {
        console.log("food found");
        console.log(findFood);

        setFoodName(findFood.foodName ?? "");
        setServingSize(findFood.servingSize ?? "");
        setCalories(findFood.calories ?? "");
        setFat(findFood.fat ?? "");
        setSaturatedFat(findFood.saturatedFat ?? "");
        setTransFat(findFood.transFat ?? "");
        setPolyFat(findFood.polyFat ?? "");
        setMonoFat(findFood.monoFat ?? "");
        setCholesterol(findFood.cholesterol ?? "");
        setSodium(findFood.sodium ?? "");
        setCarbs(findFood.carbs ?? "");
        setFiber(findFood.fiber ?? "");
        setSugar(findFood.sugar ?? "");
        setProtein(findFood.protein ?? "");
      }
    }
  }, [route.params]);

  const handleSaveFood = async () => {
    console.log("saving food");
    try {
      // Create a new food object with values from the text input
      const newFood = {
        foodName: foodName,
        servingSize: servingSize,
        calories: calories,
        fat: fat,
        saturatedFat: saturatedFat,
        transFat: transFat,
        polyFat: polyFat,
        monoFat: monoFat,
        cholesterol: cholesterol,
        sodium: sodium,
        carbs: carbs,
        fiber: fiber,
        sugar: sugar,
        protein: protein,
      };

      console.log(editCreate);
      if (editCreate === "Create") {
        addFood(newFood);
      } else {
        editFood(newFood);
      }

      navigation.navigate("Saved Foods");
      console.log("Navingating back to savedFoodScreen");
    } catch (error) {
      console.log("Error saving food:", error);
    }
  };

  const handleScanNutritionLabel = () => {
    console.log("scan nutrition label");
    navigation.navigate("Nutrition Label Scanner");
  };

  const handleScanBarcode = async () => {
    console.log("handle scan barcode");
    navigation.navigate("Barcode Scanner");
  };

  const keyboardAvoidingBehavior =
    Platform.OS === "ios" ? "padding" : undefined;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={keyboardAvoidingBehavior}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TopNavigationHeader title="Nutrition facts" onSave={handleSaveFood} />

      <ScrollView>
        <View style={styles.addFoodButton}>
          <SecondaryButton
            title={"Scan nutrition label"}
            onPress={handleScanNutritionLabel}
          />
        </View>
        <View style={styles.addFoodButton}>
          <SecondaryButton title={"Add barcode"} onPress={handleScanBarcode} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Name</Text>
          <TextInput
            style={styles.infoInput}
            value={foodName}
            onChangeText={setFoodName}
            keyboardType="default"
            placeholder="ex. Apple"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Serving Size</Text>
          <TextInput
            style={styles.infoInput}
            value={servingSize}
            onChangeText={setServingSize}
            keyboardType="default"
            placeholder="ex. 1 cup"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Calories</Text>
          <TextInput
            style={styles.infoInput}
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Fat (g)</Text>
          <TextInput
            style={styles.infoInput}
            value={fat}
            onChangeText={setFat}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Saturated Fat (g)</Text>
          <TextInput
            style={styles.infoInput}
            value={saturatedFat}
            onChangeText={setSaturatedFat}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Trans Fat (g)</Text>
          <TextInput
            style={styles.infoInput}
            value={transFat}
            onChangeText={setTransFat}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Polyunsaturated Fat (g)</Text>
          <TextInput
            style={styles.infoInput}
            value={polyFat}
            onChangeText={setPolyFat}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Monounsaturated Fat (g)</Text>
          <TextInput
            style={styles.infoInput}
            value={monoFat}
            onChangeText={setMonoFat}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Cholesterol (mg)</Text>
          <TextInput
            style={styles.infoInput}
            value={cholesterol}
            onChangeText={setCholesterol}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Sodium (mg)</Text>
          <TextInput
            style={styles.infoInput}
            value={sodium}
            onChangeText={setSodium}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Total Carbohydrate (mg)</Text>
          <TextInput
            style={styles.infoInput}
            value={carbs}
            onChangeText={setCarbs}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Dietary Fiber (g)</Text>
          <TextInput
            style={styles.infoInput}
            value={fiber}
            onChangeText={setFiber}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Sugar (g)</Text>
          <TextInput
            style={styles.infoInput}
            value={sugar}
            onChangeText={setSugar}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Protein</Text>
          <TextInput
            style={styles.infoInput}
            value={protein}
            onChangeText={setProtein}
            keyboardType="numeric"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    // paddingHorizontal: 20,
    backgroundColor: "#E8EAED",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#CCCCCC",
  },

  label: {
    fontSize: 20,
    fontWeight: "bold",
    //   marginBottom: 20,
    textAlign: "center",
  },

  infoContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
  },

  infoLabel: {
    //   flex: 1,
    fontSize: 16,
    paddingTop: 5,
  },

  infoInput: {
    flex: 1,
    fontSize: 16,
    //   borderWidth: 1,
    // borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 30,
    textAlign: "right",
  },
});
