export function getMapPreviewImage(location: { latitude: number; longitude: number }) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&sensor=false&markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}&key=AIzaSyBQ-T95zgSRqCVr90YOX-e1ICxJwA4AC9k`;
}

export async function getAddressFromCoordinates(
    latitude: number,
    longitude: number
): Promise<string> {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBQ-T95zgSRqCVr90YOX-e1ICxJwA4AC9k`
    );
    if (!response.ok) {
        throw new Error('Failed to fetch address');
    }
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
        throw new Error('No address found');
    }
    return data.results[0].formatted_address;
}
