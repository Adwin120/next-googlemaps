"use client";

import useLatLng from "@/hooks/useLatLng";
import GoogleMap from "../maps/GoogleMap";
import MapMarker from "../maps/MapMarker";
import type { PropsWithChildren } from "react";
import { BlockLoadingSpinner } from "../utils/LoadingSpinner";
import GetLocationButton from "../maps/GetLocationButton";
import { useMainMapInitializer } from "./MainMapInstanceProvider";

interface Props extends PropsWithChildren {}
const MainMap: React.FC<Props> = ({ children }) => {
    const clientLatLng = useLatLng();
    const initializeMainMap = useMainMapInitializer();
    console.log("map (re)render");
    return (
        <main>
            <GoogleMap fallback={<BlockLoadingSpinner />} onReady={initializeMainMap}>
                {clientLatLng && <MapMarker position={clientLatLng} title="your location" />}
                {children}
            </GoogleMap>
            <GetLocationButton css={{ pos: "absolute", bottom: "8", right: "4" }} />
        </main>
    );
};

export default MainMap;
