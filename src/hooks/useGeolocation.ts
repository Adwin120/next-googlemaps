import { useEffect, useState } from "react";

const useGeolocation = () => {
    //TODO: manage permissions
    const [location, setLocation] = useState<GeolocationPosition | null>(null);
    useEffect(() => {
        navigator.geolocation.watchPosition(setLocation, console.error, {
            enableHighAccuracy: false,
            maximumAge: 5 * 1000,
        });
    }, []);

    return location;
};

export default useGeolocation;
