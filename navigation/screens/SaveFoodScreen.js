import React, {Component, useEffect, useState} from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import {PrimaryButton, SecondaryButton} from '../../components/Button';
import COLORS from '../../consts/colors'
import CreateFoodScreen from './CreateFoodScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { savedFoodData } from '../../data/savedFoodData';


// class FlatListItem extends Component{
//   render(){
//     return (
//       <View style={styles.foodListItem}>
//         <View style={styles.foodName}>
//           <Text>{this.props.item.name}</Text>
//         </View>
//         <View style={styles.foodCalories}>
//           <Text>{this.props.item.calories}</Text>
//         </View>
//       </View>
//     )
//   }
// };



export default function SaveFoodScreen({ navigation }) {
    useEffect(() => {
        loadSavedFoods(); // Call the function to load saved foods when the component mounts
      }, []);
    
      const loadSavedFoods = async () => {
        try {
          const storedFoods = await AsyncStorage.getItem('savedFoods');
    
          if (storedFoods) {
            const parsedFoods = JSON.parse(storedFoods);
            savedFoodData.splice(0, savedFoodData.length, ...parsedFoods); // Replace the contents of savedFoodData with parsedFoods
          }
        } catch (error) {
          console.log('Error loading saved foods:', error);
        }
      };
    const renderFlatListItem = ({ item }) => (
      <View style={styles.foodListItem}>
        <View style={styles.foodName}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.foodCalories}>
          <Text>{item.protein}</Text>
        </View>
      </View>
    );

    return (
        <View style={styles.container}>
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>{"My Foods"}</Text>
    
            <View style={styles.addFoodButton}>
              <SecondaryButton
                title={"Create Food"}
                onPress={() => navigation.navigate('Create Food')}
              />
            </View>
    
            <View style={styles.items}>
              <FlatList
                data={savedFoodData}
                renderItem={renderFlatListItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingBottom: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',

    },
    items: {
        marginTop: 30,
    },
    foodList: {
        marginTop: 20,
        flex: 1,
    },
    foodListItem: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        marginBottom: 5,
        padding: 15,
        borderRadius: 10,
    },
    foodName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    foodCalories: {
        marginLeft: 'auto', // Pushes the button to the top right
    },    
    addFoodButton: {
        marginTop: 10,
    },

  });
  