import React from 'react';
import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Place } from './types/places';

import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import IconButton from './components/ui/IconButton';

export type RootStackParamList = {
    AllPlaces: { places: Place[] };
    AddPlace: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen
                    name="AllPlaces"
                    component={AllPlaces}
                    initialParams={{ places: [] }}
                    options={({ navigation }) => ({
                        headerRight: ({ tintColor }) => (
                            <IconButton
                                icon="add"
                                size={24}
                                color={tintColor || '#000'}
                                onPress={() => navigation.navigate('AddPlace')}
                            />
                        ),
                    })}
                />
                <RootStack.Screen name="AddPlace" component={AddPlace} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
