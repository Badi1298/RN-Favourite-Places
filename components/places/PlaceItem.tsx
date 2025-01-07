import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

import { PlaceType } from '../../models/place';
import { Colors } from '../../constants/colors';

type Props = {
    place: PlaceType;
    onSelect: (place: PlaceType) => void;
};

export default function PlaceItem({ place, onSelect }: Props) {
    return (
        <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            onPress={() => onSelect(place)}
        >
            <Image source={{ uri: place.imageUri }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.location.address}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.Primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        overflow: 'hidden',
    },
    pressed: {
        opacity: 0.9,
    },

    image: {
        flex: 1,
        // borderBottomLeftRadius: 4,
        // borderTopLeftRadius: 4,
        height: 100,
    },
    info: {
        flex: 2,
        padding: 12,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.Gray700,
    },
    address: {
        fontSize: 12,
        color: Colors.Gray700,
    },
});
