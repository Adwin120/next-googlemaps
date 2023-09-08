"use client";

import useLatLng from "@/hooks/useLatLng";
import GoogleMap from "./GoogleMap";
import MapMarker from "./MapMarker";
import { PropsWithChildren } from "react";
import { BlockLoadingSpinner } from "../utils/LoadingSpinner";

interface Props extends PropsWithChildren {}
const MainMap: React.FC<Props> = ({ children }) => {
    const clientLatLng = useLatLng();
    return (
        <main>
            <GoogleMap fallback={<BlockLoadingSpinner />}>
                {clientLatLng && <MapMarker position={clientLatLng} title="your location" />}
                {children}
            </GoogleMap>
        </main>
    );
};

export default MainMap;
