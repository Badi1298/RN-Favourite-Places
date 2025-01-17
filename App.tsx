import React from 'react';
import { View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';

import { init } from './util/database';
import { Colors } from './constants/colors';

import Map from './screens/Map';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import PlaceDetails from './screens/PlaceDetails';

import IconButton from './components/ui/IconButton';

export type RootStackParamList = {
    AllPlaces: undefined;
    AddPlace: { pickedLocation?: { lat: number; lng: number } };
    Map: { initialLocation?: { lat: number; lng: number } };
    PlaceDetails: { placeId: string };
};

const RootStack = createStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync().catch((error) => {
    console.warn(error);
});

export default function App() {
    const [dbInitialized, setDbInitialized] = React.useState(false);

    React.useEffect(() => {
        init().then(() => {
            setDbInitialized(true);
        });
    }, []);

    const onLayoutRootView = React.useCallback(() => {
        if (dbInitialized) {
            SplashScreen.hide();
        }
    }, [dbInitialized]);

    if (!dbInitialized) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <NavigationContainer>
                <RootStack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: Colors.Primary500 },
                        headerTintColor: Colors.Gray700,
                        cardStyle: { backgroundColor: Colors.Gray700 },
                    }}
                >
                    <RootStack.Screen
                        name="AllPlaces"
                        component={AllPlaces}
                        options={({ navigation }) => ({
                            title: 'Your Favourite Places',
                            headerRight: ({ tintColor }) => (
                                <IconButton
                                    icon="add"
                                    size={24}
                                    color={tintColor || '#000'}
                                    onPress={() => navigation.navigate('AddPlace', {})}
                                />
                            ),
                        })}
                    />
                    <RootStack.Screen
                        name="AddPlace"
                        component={AddPlace}
                        options={{
                            title: 'Add a new Place',
                        }}
                    />
                    <RootStack.Screen
                        name="Map"
                        component={Map}
                        options={{
                            title: 'Map',
                        }}
                    />
                    <RootStack.Screen
                        name="PlaceDetails"
                        component={PlaceDetails}
                        options={{
                            title: 'Loading Place...',
                        }}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </View>
    );
}
