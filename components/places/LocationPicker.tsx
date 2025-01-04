import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';

import * as Location from 'expo-location';

import { Colors } from '../../constants/colors';

import BaseButton from '../ui/BaseButton';

export default function LocationPicker() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    async function locateUserHandler() {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Permission denied!',
                'You need to enable location permissions to use this feature.'
            );
            return;
        }

        const location = await Location.getCurrentPositionAsync({
            accuracy: 6,
        });

        setLocation(location);

        console.log(location.coords);
    }

    function pickOnMapHandler() {}

    return (
        <View>
            <View style={styles.mapPreview}></View>
            <View style={styles.actions}>
                <BaseButton variant="outline" icon="location-outline" onPress={locateUserHandler}>
                    Locate User
                </BaseButton>
                <BaseButton variant="outline" icon="map-outline" onPress={pickOnMapHandler}>
                    Pick on Map
                </BaseButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Primary100,
        borderRadius: 6,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});
