import { useEffect, useState } from "react";

const geolocationOptions = {
    enableHighAccuracy: false,
    maximumAge: 5 * 1000,
};

const useGeolocation = () => {
    //TODO: manage permissions
    const [location, setLocation] = useState<GeolocationPosition | null>(null);
    useEffect(() => {
        const id = navigator.geolocation.watchPosition(
            setLocation,
            console.error,
            geolocationOptions
        );
        return () => {
            navigator.geolocation.clearWatch(id);
        };
    }, []);

    return location;
};

//TODO: manage permissions
export const getGeolocation = () =>
    new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, geolocationOptions)
    );

export default useGeolocation;
