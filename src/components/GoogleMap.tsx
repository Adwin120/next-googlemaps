"use client";

import {
    PropsWithChildren,
    ReactNode,
    createContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { useGoogleMaps } from "./GoogleMapsApiProvider";
import useGeolocation from "@/hooks/useGeolocation";
import useInitialize from "@/hooks/useInitialize";

interface Props extends PropsWithChildren {
    fallback?: ReactNode;
}
const GoogleMap: React.FC<Props> = ({ fallback, children }) => {
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
                mapId: "main-map",
                minZoom: 2,
            })
        ); //TODO change to global reducer
    }, [mapsAPI, container]);

    return (
        <div
            ref={mapContainerRef}
            style={{
                height: "100vh",
            }}
        >
            {fallback}
            <MapContext.Provider value={map}>{children}</MapContext.Provider>
        </div>
    );
};

export const MapContext = createContext<google.maps.Map | null>(null);

export default GoogleMap;
