import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Modal } from "react-native";
import Meal from "../../components/Meal";
import { SecondaryButton } from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function LogFoodScreen({ navigation }) {
  const date = new Date();
  const dateString = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
          <Ionicons name="chevron-back-outline" size={24} color="black" />
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.label}>{dateString}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            themeVariant={"light"}
          />
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>

        <View style={styles.addFoodButton}>
          <SecondaryButton
            title={"Clear Food Log"}
            onPress={clearSavedFoodLog}
          />
        </View>

        <View style={styles.items}>
          <Meal text={"Breakfast"} date={dateString}></Meal>
          {/* <Meal text={"Lunch"} date={dateString}></Meal>
          <Meal text={"Dinner"} date={dateString}></Meal>
          <Meal text={"Snacks"} date={dateString}></Meal> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
