"use client";
import { type PropsWithChildren, Suspense } from "react";

import useLatLng from "@/hooks/useLatLng";
import { useMainMapInitializer } from "../MainMapInstanceProvider";

import GoogleMap from "../../maps/GoogleMap";
import MapMarker from "../../maps/MapMarker";
import SearchMarker from "./SearchMarker";
import { BlockLoadingSpinner } from "../../utils/LoadingSpinner";
import GetLocationButton from "../../maps/GetLocationButton";

interface Props extends PropsWithChildren {}
const MainMap: React.FC<Props> = ({ children }) => {
    const clientLatLng = useLatLng();
    const initializeMainMap = useMainMapInitializer();

    return (
        <main>
            <GoogleMap fallback={<BlockLoadingSpinner />} onReady={initializeMainMap}>
                {clientLatLng && <MapMarker position={clientLatLng} title="your location" />}
                <Suspense>
                    <SearchMarker />
                </Suspense>
                {children}
            </GoogleMap>
            <GetLocationButton css={{ pos: "absolute", bottom: "8", right: "4" }} />
        </main>
    );
};

export default MainMap;
