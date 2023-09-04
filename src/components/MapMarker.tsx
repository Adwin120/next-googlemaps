"use client"
import { useContext, useEffect } from "react";
import { MapContext } from "./GoogleMap";
import { useGoogleMaps } from "./GoogleMapsApiProvider";

interface Props {
    position: google.maps.marker.AdvancedMarkerElement["position"];
    title?: string;
}
const MapMarker: React.FC<Props> = ({ position, title }) => {
    const map = useContext(MapContext);
    const { marker: markerApi } = useGoogleMaps();

    useEffect(() => {
        if (!map || !markerApi) return;
        const marker = new markerApi.AdvancedMarkerElement({
            map,
            position,
            title,
        });
        return () => {
            marker.map = null;
        };
    }, [map, markerApi, position, title]);

    return null;
};

export default MapMarker;
