import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';

import LocationPicker from './LocationPicker';
import CameraImagePicker from './ImagePicker';

import BaseButton from '../ui/BaseButton';

export default function PlaceForm() {
    const [place, setPlace] = useState({ title: '', image: '', location: { lat: 0, lng: 0 } });

    const changeTitleHandler = (text: string) => {
        setPlace((prevPlace) => ({ ...prevPlace, title: text }));
    };

    const onImageTakenHandler = (image: string) => {
        setPlace((prevPlace) => ({ ...prevPlace, image }));
    };

    const onLocationPickedHandler = (location: { lat: number; lng: number }) => {
        setPlace((prevPlace) => ({ ...prevPlace, location }));
    };

    const onSubmitHandler = () => {
        console.log(place);
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
