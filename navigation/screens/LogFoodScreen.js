import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Meal from '../../components/Meal';

export default function LogFoodScreen({ navigation }) {


    const date = new Date();
    const dateString = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    
    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>{dateString}</Text>
                <View style={styles.items}>
                    <Meal text={"Breakfast"}></Meal>
                    <Meal text={"Lunch"}></Meal>
                    <Meal text={"Dinner"}></Meal>
                    <Meal text={"Snacks"}></Meal>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',

    },
    items: {
        marginTop: 30,
    }
})