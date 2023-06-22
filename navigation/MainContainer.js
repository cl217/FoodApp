import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';


// Screens
import HomeScreen from './screens/HomeScreen';
import SaveFoodScreen from './screens/SaveFoodScreen';
import LogFoodScreen from './screens/LogFoodScreen';
import CreateFoodScreen from './screens/CreateFoodScreen';

//Screen names
const homeName = "Home";
const LogFood = "Log";
const SavedFoods = "SavedFoods";
const Foods = "Foods";
const createFood = "Create Food";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function SaveFoodScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SavedFoods} component={SaveFoodScreen} options={{ headerShown: false, unmountOnBlur: true }}/>
      <Stack.Screen name={createFood} component={CreateFoodScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        //screenOptions ={{headerShown: false}}
        screenOptions={({ route }) => ({
          headerShown: false,
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
        <Tab.Screen name={Foods} component={SaveFoodScreenStack} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;