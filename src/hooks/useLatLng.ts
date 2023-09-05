import useGeolocation from "./useGeolocation";

const toGoogleMapsLatLng = (position: GeolocationPosition): google.maps.LatLngLiteral => ({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
});

const useLatLng = () => {
    const location = useGeolocation();
    return location ? toGoogleMapsLatLng(location) : null;
}

export default useLatLng