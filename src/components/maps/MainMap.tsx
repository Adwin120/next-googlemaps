"use client"

import useLatLng from "@/hooks/useLatLng";
import GoogleMap from "./GoogleMap";
import MapMarker from "./MapMarker";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}
const MainMap: React.FC<Props> = ({ children }) => {
    const clientLatLng = useLatLng();
    return (
        <main>
            <GoogleMap fallback={<div>test</div>}>
                {/* TODO: change fallback */}
                {clientLatLng && <MapMarker position={clientLatLng} title="your location" />}
                {children}
            </GoogleMap>
        </main>
    );
};

export default MainMap;
