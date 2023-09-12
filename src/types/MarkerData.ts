export default interface MarkerData {
    id: string;
    name: string;
    description: string;
    images: string[],
    latLng: google.maps.LatLngLiteral
}