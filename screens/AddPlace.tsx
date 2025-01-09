import React from 'react';

import { RootStackParamList } from '../App';
import { StackScreenProps } from '@react-navigation/stack';

import { insertPlace } from '../util/database';

import { PlaceType } from '../models/place';

import PlaceForm from '../components/places/PlaceForm';

type Props = StackScreenProps<RootStackParamList, 'AddPlace'>;

export default function AddPlace({ navigation }: Props) {
    async function createPlaceHandler(placeData: PlaceType) {
        await insertPlace(
            placeData.title,
            placeData.imageUri,
            placeData.location.address,
            placeData.location.lat,
            placeData.location.lng
        );

        navigation.navigate('AllPlaces');
    }

    return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
