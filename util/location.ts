import * as Location from 'expo-location';

export function getMapPreviewImage(location: Location.LocationObjectCoords | null) {
    if (!location) return '';

    return `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&sensor=false&markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
}
