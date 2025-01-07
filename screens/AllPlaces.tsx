import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../App';
import { PlaceType } from '../models/place';

import PlacesList from '../components/places/PlacesList';

type Props = StackScreenProps<RootStackParamList, 'AllPlaces'>;

export default function AllPlaces({ route }: Props) {
    const [loadedPlaces, setLoadedPlaces] = React.useState<PlaceType[]>([]);

    React.useEffect(() => {
        if (!route.params) return;

        const place = route.params.place as PlaceType;

        setLoadedPlaces((prevPlaces) => [...prevPlaces, place]);
    }, [route]);

    return <PlacesList places={loadedPlaces} />;
}
