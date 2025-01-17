import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    size: number;
    color: string;
    onPress: () => void;
};

export default function IconButton({ icon, size, color, onPress }: Props) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    pressed: {
        opacity: 0.5,
    },
});
