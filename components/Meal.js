import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import {PrimaryButton, SecondaryButton} from '../components/Button';
import foodListData from '../data/foodListData';
import { Card } from 'react-native-paper'; // Import Card from react-native-paper


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

const Meal = (props) => {
  return (
    <View style={styles.meal}>

      <View style={styles.mealHeadingRow}>
        <View style={styles.mealHeading}>
          <Text style={styles.mealHeadingText}>{props.text}</Text>
        </View>
        <View style={styles.addFoodButton}>
          <PrimaryButton title={"Add Food"}></PrimaryButton>
        </View>
      </View>

      <View>
        {foodListData.map((item, index) => {
          return (
            <View style={styles.foodListItem}>
              <View style={styles.foodName}>
                <Text>{item.name}</Text>
              </View>
              <View style={styles.foodCalories}>
                <Text>{item.calories}</Text>
              </View>
            </View>
          );
        })}
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  meal: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  mealHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mealHeading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealHeadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addFoodButton: {
    marginLeft: 'auto', // Pushes the button to the top right
  },
  foodList: {
    marginTop: 10,
  },
  foodListItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  foodName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodCalories: {
    marginLeft: 'auto', // Pushes the button to the top right
  },

});

export default Meal;