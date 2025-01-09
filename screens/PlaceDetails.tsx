import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

import { Colors } from '../constants/colors';

import BaseButton from '../components/ui/BaseButton';

export default function PlaceDetails() {
    function showOnMapHandler() {}

    return (
        <ScrollView>
            <Image style={styles.image} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>Address</Text>
                </View>
                <BaseButton icon="map-outline" onPress={showOnMapHandler}>
                    View on Map
                </BaseButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '35%',
        minHeight: 300,
    },

    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.Primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
