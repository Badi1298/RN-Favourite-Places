import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';

import LocationPicker from './LocationPicker';
import ImagePickerExample from './ImagePicker';

export default function PlaceForm() {
    const [title, setTitle] = useState('');

    const changeTitleHandler = (text: string) => {
        setTitle(text);
    };

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={changeTitleHandler} />
            </View>
            <ImagePickerExample />
            <LocationPicker />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
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
