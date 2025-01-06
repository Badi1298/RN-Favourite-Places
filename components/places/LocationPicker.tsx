import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image, Text } from 'react-native';

import * as Location from 'expo-location';

import { Colors } from '../../constants/colors';
import { getMapPreviewImage } from '../../util/location';

import BaseButton from '../ui/BaseButton';

export default function LocationPicker() {
    const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);

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

        setLocation(location.coords);

        console.log(location.coords);
    }

    function pickOnMapHandler() {}

    return (
        <View>
            <View style={styles.mapPreview}>
                {location ? (
                    <Image source={{ uri: getMapPreviewImage(location) }} />
                ) : (
                    <Text>No location chosen yet.</Text>
                )}
            </View>
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
