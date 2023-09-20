"use client";

import {
    createContext,
    useMemo,
    useRef,
    type PropsWithChildren,
    type ReactNode,
    type ElementRef,
    useEffect,
} from "react";
import { useGoogleMaps } from "./GoogleMapsApiProvider";
import { css } from "../../../styled-system-out/css";
import { getLatLng } from "@/hooks/useLatLng";
import usePromise from "@/hooks/usePromise";

const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

interface Props extends PropsWithChildren {
    fallback?: ReactNode;
    onReady?: (map: google.maps.Map) => void
}
const GoogleMap: React.FC<Props> = ({ fallback, children, onReady = () => {} }) => {
    const { maps: mapsAPI } = useGoogleMaps();

    const [initialGeolocation, initialGeolocationStatus] = usePromise(getLatLng);

    const mapContainerRef = useRef<ElementRef<"div">>(null);
    const container = mapContainerRef.current;

    const map = useMemo(() => {
        if (!mapsAPI || !container || initialGeolocationStatus === "loading") return null;
        const startingPosition = !initialGeolocation
            ? { zoom: 3, center: { lat: 0, lng: 0 } }
            : { zoom: 10, center: initialGeolocation };

        const mapInstance = new mapsAPI!.Map(container, {
            ...startingPosition,
            scrollwheel: true,
            disableDefaultUI: true,
            draggableCursor: "default",
            draggingCursor: "move",
            gestureHandling: "greedy",
            mapId: MAP_ID,
            minZoom: 2.8,
            restriction: {
                strictBounds: true,
                latLngBounds: {
                    north: 85,
                    south: -85,
                    east: 180,
                    west: -180,
                },
            },
        });
        return mapInstance;
    }, [mapsAPI, container, initialGeolocationStatus, initialGeolocation]);

    useEffect(() => {
        if (!map) return;
        onReady(map)
    }, [map, onReady])

    return (
        <div
            ref={mapContainerRef}
            className={css({
                h: "underHeaderHeight",
            })}
        >
            {fallback}
            <MapContext.Provider value={map}>{children}</MapContext.Provider>
        </div>
    );
};

export const MapContext = createContext<google.maps.Map | null>(null);

export default GoogleMap;
