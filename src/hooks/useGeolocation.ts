import { useEffect, useState } from "react";

const useGeolocation = () => {
    const [location, setLocation] = useState<GeolocationPosition>();
    useEffect(() => {
        navigator.geolocation.watchPosition(setLocation, console.error, {
            enableHighAccuracy: false,
            maximumAge: 5 * 1000,
        });
    }, []);

    return location;
};

export default useGeolocation;
