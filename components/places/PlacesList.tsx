import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { PlaceType } from '../../models/place';
import { Colors } from '../../constants/colors';

import PlaceItem from './PlaceItem';
import { fetchPlace } from '../../util/database';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type NavigationProps = StackNavigationProp<RootStackParamList>;

type Props = {
    places: PlaceType[];
};

export default function PlacesList({ places }: Props) {
    const navigation = useNavigation<NavigationProps>();

    const onSelectHandler = (id: string) => {
        navigation.navigate('PlaceDetails', { placeId: id });
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
            style={styles.list}
            renderItem={({ item }) => <PlaceItem place={item} onSelect={onSelectHandler} />}
            keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        margin: 24,
    },
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
