import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import PlaceItem from './PlaceItem';
import { Place } from '../../types/places';
import { Colors } from '../../constants/colors';

type Props = {
    places: Place[];
};

export default function PlacesList({ places }: Props) {
    const onSelectHandler = (place: Place) => {
        console.log('Selected place:', place);
    };

    if (places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No places found. Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={places}
            renderItem={({ item }) => <PlaceItem place={item} onSelect={onSelectHandler} />}
            keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 18,
        color: Colors.Primary200,
    },
});
