"use client";

import { PropsWithChildren, ReactNode, createContext, useMemo, useRef } from "react";
import { useGoogleMaps } from "./GoogleMapsApiProvider";
import { css } from "../../../styled-system-out/css";

const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

interface Props extends PropsWithChildren {
    fallback?: ReactNode;
}
const GoogleMap: React.FC<Props> = ({ fallback, children }) => {
    const { maps: mapsAPI } = useGoogleMaps();

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const container = mapContainerRef.current;

    const map = useMemo(() => {
        if (!mapsAPI || !container) return null;
        //TODO: If user had given permission for geolocation then wait for it using use() + Suspense and center on it
        // const startingPosition = !clientLatLng
        //     ? { zoom: 3, center: { lat: 0, lng: 0 } }
        //     : { zoom: 10, center: clientLatLng };
        const startingPosition = { zoom: 3, center: { lat: 0, lng: 0 } };

        return new mapsAPI!.Map(container, {
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
    }, [mapsAPI, container]);

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
