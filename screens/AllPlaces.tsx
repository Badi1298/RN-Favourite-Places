import React from 'react';

import { Place } from '../types/places';
import PlacesList from '../components/places/PlacesList';

type Props = {
    places: Place[];
};

export default function AllPlaces({ places }: Props) {
    return <PlacesList places={places} />;
}
