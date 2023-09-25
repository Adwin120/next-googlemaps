"use client";

import useLatLng from "@/hooks/useLatLng";
import GoogleMap from "../../maps/GoogleMap";
import MapMarker from "../../maps/MapMarker";
import { useCallback, type PropsWithChildren, Suspense } from "react";
import { BlockLoadingSpinner } from "../../utils/LoadingSpinner";
import GetLocationButton from "../../maps/GetLocationButton";
import { useMainMap, useMainMapInitializer } from "../MainMapInstanceProvider";
import { useSearchParams } from "next/navigation";
import { useGoogleMaps } from "../../maps/GoogleMapsApiProvider";
import usePromise from "@/hooks/usePromise";
import SearchMarker from "./SearchMarker";

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
