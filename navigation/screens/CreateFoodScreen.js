import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomPicker from 'react-native-custom-picker';
import {PrimaryButton, SecondaryButton} from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { savedFoodData } from '../../data/savedFoodData';
import { Header } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';





export default function CreateFoodScreen({ navigation }) {
    const [foodName, setFoodName] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [calories, setCalories] = useState('');

    const [fat, setFat] = useState('');
    const [saturatedFat, setSaturatedFat] = useState('');
    const [transFat, setTransFat] = useState('');
    const [polyFat, setPolyFat] = useState('');    
    const [monoFat, setMonoFat] = useState('');

    const [cholesterol, setCholesterol] = useState('');
    const [sodium, setSodium] = useState('');

    const [carbs, setCarbs] = useState('');
    const [fiber, setFiber] = useState('');
    const [sugar, setSugar] = useState('');

    const [protein, setProtein] = useState('');


    const handleSaveFood = async () => {
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
    
    
          // Add the new food object to the saved foods array
          savedFoodData.push(newFood); // Add the new food to savedFoodData array
    
          // Save the updated saved foods array back to AsyncStorage
          await AsyncStorage.setItem('savedFoods', JSON.stringify(savedFoodData)); // Update saved foods in AsyncStorage
    
          // Navigate back to the Foods screen or any desired screen
          navigation.navigate('Saved Foods');
          console.log('Navingating back to savedFoodScreen');
    
        } catch (error) {
          console.log('Error saving food:', error);
        }
      };


      const keyboardAvoidingBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={keyboardAvoidingBehavior}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >



    <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()}/>
          
          <Text style={styles.label}>Nutrition Facts</Text>

          <Ionicons
            name="checkmark"
            size={24}
            color="black"
            onPress={handleSaveFood}
          />
    </View>

    <ScrollView>

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
            value={calories}
            onChangeText={setServingSize}
            keyboardType="default"
            placeholder="ex. 1 cup"            />
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
                value={fat}
                onChangeText={setSaturatedFat}
                keyboardType="numeric"
            />
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Trans Fat (g)</Text>
            <TextInput
                style={styles.infoInput}
                value={fat}
                onChangeText={setTransFat}
                keyboardType="numeric"
            />
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Polyunsaturated Fat (g)</Text>
            <TextInput
                style={styles.infoInput}
                value={fat}
                onChangeText={setPolyFat}
                keyboardType="numeric"
            />
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Monounsaturated Fat (g)</Text>
            <TextInput
                style={styles.infoInput}
                value={fat}
                onChangeText={setMonoFat}
                keyboardType="numeric"
            />
        </View>


        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Cholesterol (mg)</Text>
            <TextInput
                style={styles.infoInput}
                value={carbs}
                onChangeText={setCholesterol}
                keyboardType="numeric"
            />
        </View>

        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Sodium (mg)</Text>
            <TextInput
                style={styles.infoInput}
                value={carbs}
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
                value={fat}
                onChangeText={setFiber}
                keyboardType="numeric"
            />
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Sugar (g)</Text>
            <TextInput
                style={styles.infoInput}
                value={fat}
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


        {/* <View style={styles.addFoodButton}>
        <SecondaryButton 
            title={"Create Food"}
            onPress={handleSaveFood}        
        ></SecondaryButton> 


        <SecondaryButton 
            title={"Cancel"}
            onPress={() => navigation.navigate('Saved Foods')}
        ></SecondaryButton> 
        </View> */}
    </ScrollView>
    </KeyboardAvoidingView>

  );
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        // paddingHorizontal: 20,
        backgroundColor: '#E8EAED',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },

    label: {
      fontSize: 20,
      fontWeight: 'bold',
    //   marginBottom: 20,
      textAlign: 'center',
    },


    infoContainer: {
      flexDirection: 'row',
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#ccc',
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
      textAlign: 'right'
    },
  });