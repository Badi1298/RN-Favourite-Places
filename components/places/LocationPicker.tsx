import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';

import BaseButton from '../ui/BaseButton';

export default function LocationPicker() {
    function locateUserHandler() {}

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
