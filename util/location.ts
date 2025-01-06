import * as Location from 'expo-location';

export function getMapPreviewImage(location: Location.LocationObjectCoords) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&sensor=false&markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}&key=AIzaSyBQ-T95zgSRqCVr90YOX-e1ICxJwA4AC9k`;
}
