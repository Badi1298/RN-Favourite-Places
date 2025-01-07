import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { PlaceType } from '../../models/place';
import { Colors } from '../../constants/colors';

import PlaceItem from './PlaceItem';

type Props = {
    places: PlaceType[];
};

export default function PlacesList({ places }: Props) {
    const onSelectHandler = (place: PlaceType) => {
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
