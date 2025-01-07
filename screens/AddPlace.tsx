import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../App';
import { PlaceType } from '../models/place';

import PlaceForm from '../components/places/PlaceForm';

type Props = StackScreenProps<RootStackParamList, 'AddPlace'>;

export default function AddPlace({ navigation }: Props) {
    function createPlaceHandler(placeData: PlaceType) {
        navigation.navigate('AllPlaces', { places: [placeData] });
    }

    return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
