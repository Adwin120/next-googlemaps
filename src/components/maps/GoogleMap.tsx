"use client";

import { createContext, useMemo, useRef, useEffect, useContext } from "react";
import type { PropsWithChildren, ReactNode, ElementRef } from "react";
import { css } from "../../../styled-system-out/css";
import { getLatLng } from "@/hooks/useLatLng";
import useGoogleMapsAPI from "@/hooks/useGoogleMapsAPI";
import useSWRImmutable from "swr/immutable";
import { getGeolocation } from "@/hooks/useGeolocation";

const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

interface Props extends PropsWithChildren {
    fallback?: ReactNode;
    onReady?: (map: google.maps.Map) => void;
}
const GoogleMap: React.FC<Props> = ({ fallback, children, onReady = () => {} }) => {
    const mapsAPI = useGoogleMapsAPI("maps");

    const mapContainerRef = useRef<ElementRef<"div">>(null);
    const container = mapContainerRef.current;

    const { data: initialLocation, isLoading: isInitialLocationLoading } = useSWRImmutable(
        "userLocation",
        getLatLng
    );

    const map = useMemo(() => {
        if (!mapsAPI || !container || isInitialLocationLoading) return null;
        const startingPosition = !initialLocation
            ? { zoom: 3, center: { lat: 0, lng: 0 } }
            : { zoom: 10, center: initialLocation };

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
    }, [container, initialLocation, isInitialLocationLoading, mapsAPI]);

    useEffect(() => {
        if (!map) return;
        console.log("looks problematic, infinite loop potential");
        onReady(map);
    }, [map, onReady]);

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
export const useParentMap = () => useContext(MapContext);
export default GoogleMap;
