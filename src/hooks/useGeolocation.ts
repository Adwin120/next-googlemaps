import { useEffect, useState } from "react";
import usePermission, { getPermission } from "./usePermission";
import { promiseGuard } from "@/utils/promiseUtils";

const geolocationOptions = {
    enableHighAccuracy: false,
    maximumAge: 5 * 1000,
};

const useGeolocation = () => {
    const [location, setLocation] = useState<GeolocationPosition | null>(null);
    const permission = usePermission("geolocation");

    useEffect(() => {
        if (permission !== "granted") return;
        const id = navigator.geolocation.watchPosition(
            setLocation,
            console.error,
            geolocationOptions
        );
        return () => {
            navigator.geolocation.clearWatch(id);
        };
    }, [permission]);

    return location;
};

export const getGeolocation = () =>
    getPermission("geolocation")
        .then(promiseGuard((perm) => perm === "granted"))
        .then(() => {
            return new Promise<GeolocationPosition>((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject, geolocationOptions)
            );
        });

export default useGeolocation;
