import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Meal from "../../components/Meal";

export default function LogFoodScreen({ navigation }) {
  const date = new Date();
  const dateString = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>{dateString}</Text>
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
});
