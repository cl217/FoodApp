import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';




const TopNavigationHeader = (props) => {

    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()}/>
            <Text style={styles.label}>{props.title}</Text>
            <Ionicons name="checkmark" size={24} color="black" onPress={props.onSave}/>
        </View>
    );
};

export default TopNavigationHeader;



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
});
