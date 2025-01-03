import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Place } from './types/places';

import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';

export type RootStackParamList = {
    AllPlaces: { places: Place[] };
    AddPlace: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen name="AllPlaces" component={AllPlaces} />
                <RootStack.Screen name="AddPlace" component={AddPlace} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
