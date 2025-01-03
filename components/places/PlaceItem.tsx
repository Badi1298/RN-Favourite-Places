import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

import { Place } from '../../types/places';

type Props = {
    place: Place;
    onSelect: (place: Place) => void;
};

export default function PlaceItem({ place, onSelect }: Props) {
    return (
        <Pressable onPress={() => onSelect(place)}>
            <Image source={{ uri: place.imageUri }} style={{ width: 100, height: 100 }} />
            <View>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({});
