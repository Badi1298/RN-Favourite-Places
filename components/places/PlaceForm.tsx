import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';

export default function PlaceForm() {
    const [title, setTitle] = useState('');

    const changeTitleHandler = (text: string) => {
        setTitle(text);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={changeTitleHandler} />
            </View>
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
        borderBottomWidth: 2,
        backgroundColor: Colors.Primary100,
        borderBottomColor: Colors.Primary700,
    },
});
