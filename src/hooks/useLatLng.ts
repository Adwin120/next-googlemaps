import useGeolocation, { getGeolocation } from "./useGeolocation";

export const toGoogleMapsLatLng = (position: GeolocationPosition): google.maps.LatLngLiteral => ({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
});

const useLatLng = () => {
    const location = useGeolocation();
    return location ? toGoogleMapsLatLng(location) : null;
}

export const getLatLng = () => getGeolocation().then(toGoogleMapsLatLng)

export default useLatLng