import { useState } from 'react';
import { Image, View, StyleSheet, Alert, Text } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { Colors } from '../../constants/colors';

import BaseButton from '../ui/BaseButton';

type Props = {
    onImageTaken: (image: string) => void;
};

export default function CameraImagePicker({ onImageTaken }: Props) {
    const [image, setImage] = useState<string | null>(null);
    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    async function requestPermissionAsync() {
        if (status?.status === ImagePicker.PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (status?.status === ImagePicker.PermissionStatus.DENIED) {
            Alert.alert(
                'Permission denied!',
                'You need to enable camera permissions to use this feature.'
            );
            return false;
        }

        return true;
    }

    const pickImage = async () => {
        const hasPermission = await requestPermissionAsync();

        if (!hasPermission) return;

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            onImageTaken(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text style={styles.placeholder}>No image taken yet.</Text>
                )}
            </View>
            <BaseButton variant="outline" icon="camera-outline" onPress={pickImage}>
                Take Image
            </BaseButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        marginVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Primary100,
        borderRadius: 6,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        fontSize: 16,
        color: Colors.Gray700,
    },
});
