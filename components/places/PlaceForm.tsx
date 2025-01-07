import React from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';

import { Place, PlaceType } from '../../models/place';
import { Colors } from '../../constants/colors';

import LocationPicker from './LocationPicker';
import CameraImagePicker from './ImagePicker';

import BaseButton from '../ui/BaseButton';

type Props = {
    onCreatePlace: (place: PlaceType) => void;
};

export default function PlaceForm({ onCreatePlace }: Props) {
    const [place, setPlace] = React.useState({
        title: '',
        image: '',
        location: { lat: 0, lng: 0, address: '' },
    });

    const changeTitleHandler = (text: string) => {
        setPlace((prevPlace) => ({ ...prevPlace, title: text }));
    };

    const onImageTakenHandler = (image: string) => {
        setPlace((prevPlace) => ({ ...prevPlace, image }));
    };

    const onLocationPickedHandler = React.useCallback(
        (location: { lat: number; lng: number; address: string }) => {
            setPlace((prevPlace) => ({ ...prevPlace, location }));
        },
        []
    );

    const onSubmitHandler = async () => {
        const placeData = new Place(place.title, place.image, place.location);

        onCreatePlace(placeData);
    };

    return (
        <ScrollView style={styles.form}>
            <View style={{ marginTop: 16 }}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={place.title}
                    onChangeText={changeTitleHandler}
                />
            </View>
            <CameraImagePicker onImageTaken={onImageTakenHandler} />
            <LocationPicker onLocationPicked={onLocationPickedHandler} />
            <BaseButton style={{ marginVertical: 16 }} onPress={onSubmitHandler}>
                Save Place
            </BaseButton>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        paddingHorizontal: 24,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
        color: Colors.Primary500,
    },
    input: {
        marginVertical: 8,
        paddingVertical: 8,
        paddingHorizontal: 4,
        fontSize: 16,
        backgroundColor: Colors.Primary100,
        borderRadius: 6,
    },
});
