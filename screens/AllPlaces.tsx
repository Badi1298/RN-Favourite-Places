import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../App';

import PlacesList from '../components/places/PlacesList';

type Props = StackScreenProps<RootStackParamList, 'AllPlaces'>;

export default function AllPlaces({ route }: Props) {
    const { places } = route.params;

    return <PlacesList places={places} />;
}
