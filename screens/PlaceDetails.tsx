import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

import { RootStackParamList } from '../App';
import { StackScreenProps } from '@react-navigation/stack';

import { fetchPlace } from '../util/database';

import { Colors } from '../constants/colors';

import BaseButton from '../components/ui/BaseButton';
import { Place } from '../types/places';

type Props = StackScreenProps<RootStackParamList, 'PlaceDetails'>;

export default function PlaceDetails({ route, navigation }: Props) {
    const [fetchedPlace, setFetchedPlace] = React.useState<Place>();

    const { placeId } = route.params;

    React.useEffect(() => {
        if (!placeId) return;

        fetchPlace(placeId).then((place) => {
            setFetchedPlace(place);
            navigation.setOptions({ title: place.title });
        });
    }, [placeId]);

    function showOnMapHandler() {
        navigation.navigate('Map', {
            initialLocation: {
                lat: fetchedPlace?.lat || 37.78,
                lng: fetchedPlace?.lng || -122.43,
            },
        });
    }

    if (!fetchedPlace)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading place data...</Text>
            </View>
        );

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: fetchedPlace?.imageUri }} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{fetchedPlace?.address}</Text>
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
