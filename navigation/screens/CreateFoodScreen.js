import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomPicker from 'react-native-custom-picker';
import {PrimaryButton, SecondaryButton} from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { savedFoodData } from '../../data/savedFoodData';







export default function CreateFoodScreen({ navigation }) {
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');


    const handleSaveFood = async () => {
        try {

          // Create a new food object with values from the text input
          const newFood = {
            name: foodName, 
            protein: parseFloat(protein),
          };
    
    
          // Add the new food object to the saved foods array
          savedFoodData.push(newFood); // Add the new food to savedFoodData array
    
          // Save the updated saved foods array back to AsyncStorage
          await AsyncStorage.setItem('savedFoods', JSON.stringify(savedFoodData)); // Update saved foods in AsyncStorage
    
          // Navigate back to the Foods screen or any desired screen
          navigation.navigate('SavedFoods');
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
    <ScrollView>
        <Text style={styles.label}>Nutrition Facts</Text>

        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Name</Text>
            <TextInput
            style={styles.infoInput}
            value={foodName}
            onChangeText={setFoodName}
            keyboardType="numeric"
            />
        </View>



        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Serving Size:</Text>
            <TextInput
            style={styles.infoInput}
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
            />
        </View>



         <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Calories:</Text>
            <TextInput
            style={styles.infoInput}
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
            />
        </View>


        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Fat:</Text>
            <TextInput
                style={styles.infoInput}
                value={fat}
                onChangeText={setFat}
                keyboardType="numeric"
            />
            <Text>g</Text>
        </View>
        <View style={styles.infoSubContainer}>
            <Text style={styles.infoSubLabel}>Saturated Fat:</Text>
            <TextInput
                style={styles.infoSubInput}
                value={fat}
                onChangeText={setFat}
                keyboardType="numeric"
            />
            <Text>g</Text>
        </View>
        <View style={styles.infoSubContainer}>
            <Text style={styles.infoSubLabel}>Trans Fat:</Text>
            <TextInput
                style={styles.infoSubInput}
                value={fat}
                onChangeText={setFat}
                keyboardType="numeric"
            />
            <Text>g</Text>
        </View>
        <View style={styles.infoSubContainer}>
            <Text style={styles.infoSubLabel}>Polyunsaturated Fat:</Text>
            <TextInput
                style={styles.infoSubInput}
                value={fat}
                onChangeText={setFat}
                placeholder="Enter fat"
                keyboardType="numeric"
            />
            <Text>g</Text>
        </View>
        <View style={styles.infoSubContainer}>
            <Text style={styles.infoSubLabel}>Monounsaturated Fat:</Text>
            <TextInput
                style={styles.infoSubInput}
                value={fat}
                onChangeText={setFat}
                placeholder="Monounsaturated fat"
                keyboardType="numeric"
            />
            <Text>g</Text>
        </View>


        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Cholesterol</Text>
            <TextInput
                style={styles.infoInput}
                value={carbs}
                onChangeText={setCarbs}
                placeholder="Enter carbs"
                keyboardType="numeric"
            />
            <Text>mg</Text>
        </View>

        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Sodium</Text>
            <TextInput
                style={styles.infoInput}
                value={carbs}
                onChangeText={setCarbs}
                placeholder="Enter carbs"
                keyboardType="numeric"
            />
            <Text>mg</Text>
        </View>



        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Total Carbohydrate</Text>
            <TextInput
                style={styles.infoInput}
                value={carbs}
                onChangeText={setCarbs}
                placeholder="Enter carbs"
                keyboardType="numeric"
            />
            <Text>g</Text>
        </View>
        <View style={styles.infoSubContainer}>
            <Text style={styles.infoSubLabel}>Dietary Fiber:</Text>
            <TextInput
                style={styles.infoSubInput}
                value={fat}
                onChangeText={setFat}
                placeholder="Monounsaturated fat"
                keyboardType="numeric"
            />
            <Text>g</Text>
        </View>
        <View style={styles.infoSubContainer}>
            <Text style={styles.infoSubLabel}>Sugar:</Text>
            <TextInput
                style={styles.infoSubInput}
                value={fat}
                onChangeText={setFat}
                placeholder="Monounsaturated fat"
                keyboardType="numeric"
            />
            <Text>g</Text>
        </View>







        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Protein</Text>
            <TextInput
                style={styles.infoInput}
                value={protein}
                onChangeText={setProtein}
                placeholder="Enter protein"
                keyboardType="numeric"
            />
            <Text>g</Text>
        </View>


        <View style={styles.addFoodButton}>
        <SecondaryButton 
            title={"Create Food"}
            onPress={handleSaveFood}        
        ></SecondaryButton> 


        <SecondaryButton 
            title={"Cancel"}
            onPress={() => navigation.navigate('SavedFoods')}
        ></SecondaryButton> 
        </View>
    </ScrollView>
    </KeyboardAvoidingView>

  );
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        // paddingBottom: 80,
        paddingHorizontal: 20,
    },
    label: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    infoContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoSubContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 20,
      },
    infoLabel: {
      flex: 1,
      fontSize: 16,
    },
    infoSubLabel: {
        flex: 1,
        fontSize: 12,
      },
    infoInput: {
      flex: 1,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
      borderRadius: 5,
      height: 30
    },
    infoSubInput: {
        flex: 1,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        borderRadius: 5,
        height: 23
      },
  });