import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import { savedFoodData } from '../data/savedFoodData'



const SavedFoodList = (props) => {




    const renderFlatListItem = ({ item }) => (
        <View style={styles.foodListItem}>
          <View style={styles.foodName}>
            <Text>{item.foodName}</Text>
          </View>
          <View style={styles.foodCalories}>
            <Text>{item.calories}</Text>
          </View>
        </View>
      );
    

      console.log("refresh")

    return (
        <FlatList
        data={savedFoodData}
        renderItem={renderFlatListItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
        marginBottom: 80,
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
  

  export default SavedFoodList;