import React, { useCallback, useLayoutEffect, useState } from 'react';

import { Alert, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import MapView, { MapPressEvent, Marker, Region } from 'react-native-maps';

import { RootStackParamList } from '../App';

import IconButton from '../components/ui/IconButton';

type Props = StackScreenProps<RootStackParamList, 'Map'>;

export default function Map({ navigation }: Props) {
    // prettier-ignore
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);

    const initialRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    function selectLocationHandler(event: Region) {
        console.log(event);

        const { latitude, longitude } = event;

        setSelectedLocation({ lat: latitude, lng: longitude });
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('No location picked!', 'Please pick a location on the map.', [
                { text: 'Okay' },
            ]);
            return;
        }

        navigation.navigate('AddPlace', {
            pickedLocation: selectedLocation,
        });
    }, [navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton
                    icon="checkmark"
                    size={24}
                    onPress={savePickedLocationHandler}
                    color={tintColor || '#000'}
                />
            ),
        });
    }, [navigation, savePickedLocationHandler]);

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={initialRegion}
                style={styles.map}
                onRegionChangeComplete={selectLocationHandler}
            >
                {selectedLocation && (
                    <Marker
                        title="Picked Location"
                        coordinate={{
                            latitude: selectedLocation?.lat,
                            longitude: selectedLocation?.lng,
                        }}
                    />
                )}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
