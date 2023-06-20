import React, {Component} from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import savedFoodData from '../../data/savedFoodData';
import {PrimaryButton, SecondaryButton} from '../../components/Button';
import COLORS from '../../consts/colors'
import CreateFoodScreen from './CreateFoodScreen';

class FlatListItem extends Component{
  render(){
    return (
      <View style={styles.foodListItem}>
        <View style={styles.foodName}>
          <Text>{this.props.item.name}</Text>
        </View>
        <View style={styles.foodCalories}>
          <Text>{this.props.item.calories}</Text>
        </View>
      </View>
    )
  }
};


export default function SaveFoodScreen({ navigation }) {
    return (

        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>{"My Foods"}</Text>

                <View style={styles.addFoodButton}>
                    <SecondaryButton 
                        title={"Create Food"}
                        onPress={() => navigation.navigate('Create Food')}
                    ></SecondaryButton> 
                </View>


                <View style={styles.items}>
                    <FlatList
                        data={savedFoodData}
                        renderItem={({item, index})=>{
                            return(
                                <FlatListItem item={item} index={index}></FlatListItem>
                            )
                        }
                    }
                    >
                    </FlatList>
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
  