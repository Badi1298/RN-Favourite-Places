import React from 'react';
import { Text, Pressable, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';

type Props = {
    icon?: keyof typeof Ionicons.glyphMap;
    iconSize?: number;
    iconColor?: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    variant?: 'primary' | 'secondary' | 'outline';
    textStyle?: StyleProp<TextStyle>;
    onPress: () => void;
};

export default function BaseButton({
    icon,
    iconSize,
    iconColor,
    variant,
    style,
    children,
    textStyle,
    onPress,
}: Props) {
    const buttonStyle = {
        primary: {
            backgroundColor: Colors.Primary500,
        },
        secondary: {
            backgroundColor: Colors.Accent500,
        },
        outline: {
            borderWidth: 1,
            borderColor: Colors.Primary500,
        },
    }[variant || 'primary'];

    const textStyles = {
        primary: {
            color: Colors.Gray700,
        },
        secondary: {
            color: Colors.Gray700,
        },
        outline: {
            color: Colors.Primary500,
        },
    }[variant || 'primary'];

    return (
        <Pressable
            style={({ pressed }) => [styles.button, buttonStyle, style, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Ionicons
                name={icon}
                style={styles.icon}
                size={iconSize || 18}
                color={iconColor || Colors.Gray700}
            />
            <Text style={[styles.text, textStyle, textStyles]}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    pressed: {
        opacity: 0.5,
    },

    icon: {
        marginRight: 6,
    },

    text: {
        fontSize: 16,
    },
});
