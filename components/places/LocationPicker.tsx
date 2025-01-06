import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Image, Text } from 'react-native';

import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Location from 'expo-location';

import { Colors } from '../../constants/colors';
import { getMapPreviewImage } from '../../util/location';

import BaseButton from '../ui/BaseButton';

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function LocationPicker() {
    const navigation = useNavigation<NavigationProps>();
    const route = useRoute();

    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const pickedLocation = route.params as { pickedLocation?: { lat: number; lng: number } };

    useEffect(() => {
        if (pickedLocation?.pickedLocation) {
            setLocation(pickedLocation.pickedLocation);
        }
    }, [pickedLocation]);

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

        setLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {location ? (
                    <Image
                        source={{
                            uri: getMapPreviewImage({
                                latitude: location.lat,
                                longitude: location.lng,
                            }),
                        }}
                        style={styles.image}
                    />
                ) : (
                    <Text style={styles.placeholderText}>No location chosen yet.</Text>
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
        overflow: 'hidden',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    image: {
        width: '100%',
        height: '100%',
    },
    placeholderText: {
        fontSize: 16,
    },
});
