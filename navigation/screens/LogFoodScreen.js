import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, ScrollView, Modal } from "react-native";
import Meal from "../../components/Meal";
import { SecondaryButton } from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FoodContext } from "../../components/FoodContext";

export default function LogFoodScreen({ navigation }) {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateString, setDateString] = useState("");
  const { foodLog, foods } = useContext(FoodContext);
  const [summaryCalories, setSummaryCalories] = useState(0);

  useEffect(() => {
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDateString(formattedDate);

    const fetchSummaryData = () => {
      let totalCalories = 0;
      if (foodLog && foodLog.length > 0) {
        const logForTheDay = foodLog.find((log) => log.date === dateString);
        if (logForTheDay) {
          console.log("dateString: " + dateString);
          console.log("logfortheday: " + JSON.stringify(logForTheDay));

          const mealLabel = ["Breakfast", "Lunch", "Dinner", "Snack"];
          mealLabel.forEach(function (mealStr) {
            logForTheDay[mealStr].forEach(function (fooditem) {
              console.log(mealStr + ": " + fooditem);
              const findFood = foods.find((food) => food.foodName === fooditem);
              if (findFood) {
                totalCalories += parseInt(findFood.calories);
              }
            });
          });
          console.log("totalCalories: " + totalCalories);
        }
      }
      setSummaryCalories(totalCalories);
    };
    fetchSummaryData();
  }, [selectedDate]);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const backDate = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() - 1);
    setSelectedDate(nextDay);
  };

  const forwardDate = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const clearSavedFoodLog = async () => {
    try {
      await AsyncStorage.removeItem("savedFoodLog");
      console.log("Saved food Log cleared");
    } catch (error) {
      console.log("Error clearing saved foods:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={backDate}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.label}>{dateString}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={selectedDate}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            themeVariant={"light"}
          />
          <TouchableOpacity onPress={forwardDate}>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.addFoodButton}>
          <SecondaryButton
            title={"Clear Food Log"}
            onPress={clearSavedFoodLog}
          />
        </View>

        <View style={styles.summary}>
          <View>
            <Text>Summary</Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={styles.summaryLabel}>
              <Text>Calories:</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text>{summaryCalories} / 200</Text>
            </View>
          </View>
          <View style={styles.summaryItem}>
            <View style={styles.summaryLabel}>
              <Text>Fiber:</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text>50 / 100</Text>
            </View>
          </View>
        </View>

        <View style={styles.items}>
          <Meal text={"Breakfast"} date={dateString}></Meal>
          <Meal text={"Lunch"} date={dateString}></Meal>
          <Meal text={"Dinner"} date={dateString}></Meal>
          <Meal text={"Snacks"} date={dateString}></Meal>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  summary: {
    marginTop: 30,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  summaryItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  summaryLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryValue: {
    marginLeft: "auto", // Pushes the button to the top right
  },
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
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
    marginBottom: 20,
  },

  label: {
    fontSize: 20,
    fontWeight: "bold",
    //   marginBottom: 20,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
  },
});
