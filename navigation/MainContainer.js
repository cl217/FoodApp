import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import SaveFoodScreen from './screens/SaveFoodScreen';
import LogFoodScreen from './screens/LogFoodScreen';

//Screen names
const homeName = "Home";
const LogFood = "Log";
const Foods = "Foods";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70},
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === LogFood) {
              iconName = focused ? 'clipboard' : 'clipboard-outline';

            } else if (rn === Foods) {
              iconName = focused ? 'fast-food' : 'fast-food-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={LogFood} component={LogFoodScreen} />
        <Tab.Screen name={Foods} component={SaveFoodScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;