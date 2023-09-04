"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGoogleMaps } from "./GoogleMapsApiProvider";
import useGeolocation from "@/hooks/useGeolocation";
import useInitialize from "@/hooks/useInitialize";

interface Props {
    fallback?: ReactNode;
}
const GoogleMap: React.FC<Props> = ({ fallback }) => {
    const { maps: mapsAPI } = useGoogleMaps();
    const geolocation = useGeolocation();

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const container = mapContainerRef.current;

    const [map, setMap] = useState<google.maps.Map | null>(null); //TODO change to global reducer

    useInitialize(() => {
        const startingPosition = !geolocation
            ? { zoom: 3, center: { lat: 0, lng: 0 } }
            : {
                  zoom: 10,
                  center: { lat: geolocation.coords.latitude, lng: geolocation.coords.longitude },
              };
        setMap(
            new mapsAPI!.Map(container!, {
                ...startingPosition,
                scrollwheel: true,
                minZoom: 2,
            })
        ); //TODO change to global reducer
    }, [mapsAPI, container]);

    return (
        <div
            ref={mapContainerRef}
            style={{
                width: "100vh",
                height: "100vw",
            }}
        >
            {fallback}
        </div>
    );
};

export default GoogleMap;
