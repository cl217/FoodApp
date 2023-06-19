import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import COLORS from '../consts/colors';

const PrimaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{...style.btnContainer, ...style.primaryButton}}>
        <Text style={style.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const SecondaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{...style.btnContainer, ...style.secondaryButton}}>
        <Text style={{...style.title}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};



const style = StyleSheet.create({
  title: {
    color: COLORS.buttonText, 
    fontSize: 15,

  },
  btnContainer: {
    height: 24,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#E8EAED',
    borderColor: '#39739d', // Add this line to set the black border
    borderWidth: 1, // Adjust the border width as needed
    width: 80,

  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
    borderColor: '#39739d', // Add this line to set the black border
    borderWidth: 1, // Adjust the border width as needed
    width: '100%',
    height: 30,
  }
});



export {PrimaryButton, SecondaryButton};



// /* CSS */
// .button-8 {
//   background-color: #e1ecf4;
//   border-radius: 3px;
//   border: 1px solid #7aa7c7;
//   box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;
//   box-sizing: border-box;
//   color: #39739d;
//   cursor: pointer;
//   display: inline-block;
//   font-family: -apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif;
//   font-size: 13px;
//   font-weight: 400;
//   line-height: 1.15385;
//   margin: 0;
//   outline: none;
//   padding: 8px .8em;
//   position: relative;
//   text-align: center;
//   text-decoration: none;
//   user-select: none;
//   -webkit-user-select: none;
//   touch-action: manipulation;
//   vertical-align: baseline;
//   white-space: nowrap;
// }

// .button-8:hover,
// .button-8:focus {
//   background-color: #b3d3ea;
//   color: #2c5777;
// }

// .button-8:focus {
//   box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
// }

// .button-8:active {
//   background-color: #a0c7e4;
//   box-shadow: none;
//   color: #2c5777;
// }