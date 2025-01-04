import { useState } from 'react';
import { Button, Image, View, StyleSheet, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/colors';

export default function ImagePickerExample() {
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

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text>No image taken yet.</Text>
                )}
            </View>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
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
});
