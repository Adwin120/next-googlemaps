"use client";
import { useContext, useEffect } from "react";
import { MapContext } from "./GoogleMap";
import useGoogleMapsAPI from "@/hooks/useGoogleMapsAPI";

interface Props {
    position: google.maps.marker.AdvancedMarkerElement["position"];
    title?: string;
    pinConfig?: google.maps.marker.PinElementOptions;
}
const MapMarker: React.FC<Props> = ({ position, title, pinConfig }) => {
    const map = useContext(MapContext);
    const markerApi = useGoogleMapsAPI("marker");

    useEffect(() => {
        if (!map || !markerApi) return;
        const marker = new markerApi.AdvancedMarkerElement({
            map,
            position,
            title,
            content: pinConfig ? new markerApi.PinElement(pinConfig).element : null,
        });
        return () => {
            marker.map = null;
        };
    }, [map, markerApi, pinConfig, position, title]);

    return null;
};

export default MapMarker;
