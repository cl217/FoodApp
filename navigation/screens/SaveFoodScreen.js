import React, {Component, useEffect, useState} from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import {PrimaryButton, SecondaryButton} from '../../components/Button';
import COLORS from '../../consts/colors'
import CreateFoodScreen from './CreateFoodScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { savedFoodData } from '../../data/savedFoodData';
import SavedFoodList from '../../components/SavedFoodList';


export default function SaveFoodScreen({ navigation }) {
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
              <SavedFoodList></SavedFoodList>
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
  