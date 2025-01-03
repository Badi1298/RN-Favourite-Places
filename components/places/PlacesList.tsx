import React from 'react';
import { FlatList } from 'react-native';

import PlaceItem from './PlaceItem';
import { Place } from '../../types/places';

type Props = {
    places: Place[];
};

export default function PlacesList({ places }: Props) {
    const onSelectHandler = (place: Place) => {
        console.log('Selected place:', place);
    };

    return (
        <FlatList
            data={places}
            renderItem={({ item }) => <PlaceItem place={item} onSelect={onSelectHandler} />}
            keyExtractor={(item) => item.id}
        />
    );
}
