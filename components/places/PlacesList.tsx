import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { Place } from '../../types/places';

type Props = {
    places: Place[];
};

export default function PlacesList({ places }: Props) {
    return (
        <FlatList
            data={places}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.title}</Text>
                    <Text>{item.address}</Text>
                </View>
            )}
            keyExtractor={(item) => item.id}
        />
    );
}
