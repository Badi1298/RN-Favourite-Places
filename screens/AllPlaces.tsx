import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../App';
import { PlaceType } from '../models/place';

import PlacesList from '../components/places/PlacesList';
import { fetchPlaces } from '../util/database';
import { Place } from '../types/places';

type Props = StackScreenProps<RootStackParamList, 'AllPlaces'>;

export default function AllPlaces({ route }: Props) {
    const [loadedPlaces, setLoadedPlaces] = React.useState<PlaceType[]>([]);

    React.useEffect(() => {
        fetchPlaces().then((places: Place[]) => {
            setLoadedPlaces(
                places.map((place) => ({
                    id: place.id,
                    title: place.title,
                    imageUri: place.imageUri,
                    location: { lat: place.lat, lng: place.lng, address: place.address },
                }))
            );
        });
    }, [route]);

    return <PlacesList places={loadedPlaces} />;
}
