"use client";
import { token } from "@/../styled-system-out/tokens";

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
import useLatLng from "@/hooks/useLatLng";
import { css } from "../../../styled-system-out/css";

const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

interface Props extends PropsWithChildren {
    fallback?: ReactNode;
}
const GoogleMap: React.FC<Props> = ({ fallback, children }) => {
    const { maps: mapsAPI } = useGoogleMaps();
    const clientLatLng = useLatLng();

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const container = mapContainerRef.current;

    const [map, setMap] = useState<google.maps.Map | null>(null); //TODO: change to global reducer

    useInitialize(() => {
        const startingPosition = !clientLatLng
            ? { zoom: 3, center: { lat: 0, lng: 0 } }
            : { zoom: 10, center: clientLatLng };

        setMap(
            //TODO: consider changing typing of google maps starting position is not optional, cursor options should have better autocompletion
            new mapsAPI!.Map(container!, {
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
            })
        ); //TODO: change to global reducer
    }, [mapsAPI, container]);
    
    return (
        <div
            ref={mapContainerRef}
            className={css({
                h: `calc(100vh - token(sizes.headerHeight))`,
            })}
        >
            {fallback}
            <MapContext.Provider value={map}>{children}</MapContext.Provider>
        </div>
    );
};

export const MapContext = createContext<google.maps.Map | null>(null);

export default GoogleMap;
