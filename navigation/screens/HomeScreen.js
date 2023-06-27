import React, { useEffect, useState } from "react";
import { View, Text, NativeModules } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [savedFoodsBytes, setSavedFoodsBytes] = useState(0);
  const [savedFoodsMB, setSavedFoodsMB] = useState(0);

  const [savedFoodLogBytes, setSavedFoodLogBytes] = useState(0);
  const [savedFoodLogMB, setSavedFoodLogMB] = useState(0);

  useEffect(() => {
    const fetchMemoryUsed = async () => {
      try {
        const storedFoods = await AsyncStorage.getItem("savedFoods");
        if (storedFoods) {
          const memoryBytes = new Blob([storedFoods]).size;
          setSavedFoodsBytes(memoryBytes);
          const memoryMB = (memoryBytes / (1024 * 1024)).toFixed(2); // Convert to MB with 2 decimal places
          setSavedFoodsMB(memoryMB);
        }

        const storedFoodLog = await AsyncStorage.getItem("savedFoodLog");
        if (storedFoods) {
          const memoryBytes = new Blob([storedFoodLog]).size;
          setSavedFoodLogBytes(memoryBytes);
          const memoryMB = (memoryBytes / (1024 * 1024)).toFixed(2); // Convert to MB with 2 decimal places
          setSavedFoodLogMB(memoryMB);
        }
      } catch (error) {
        console.log("Error fetching memory used:", error);
      }
    };

    fetchMemoryUsed();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ marginBottom: 10 }}>
        savedFoods: {savedFoodsBytes} bytes, {savedFoodsMB} MB
      </Text>

      <Text style={{ marginBottom: 10 }}>
        savedFoodLog: {savedFoodLogBytes} bytes, {savedFoodLogMB} MB
      </Text>
    </View>
  );
}
