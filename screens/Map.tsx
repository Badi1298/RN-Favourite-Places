import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import MapView, { MapPressEvent, Marker } from 'react-native-maps';

export default function Map() {
    // prettier-ignore
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);

    const initialRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    function selectLocationHandler(event: MapPressEvent) {
        console.log(event.nativeEvent.coordinate);

        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({
            lat,
            lng,
        });
    }

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={initialRegion}
                style={styles.map}
                onPress={selectLocationHandler}
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
