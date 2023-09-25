"use client";

import useLatLng from "@/hooks/useLatLng";
import GoogleMap from "../maps/GoogleMap";
import MapMarker from "../maps/MapMarker";
import { useCallback, type PropsWithChildren } from "react";
import { BlockLoadingSpinner } from "../utils/LoadingSpinner";
import GetLocationButton from "../maps/GetLocationButton";
import { useMainMap, useMainMapInitializer } from "./MainMapInstanceProvider";
import { useSearchParams } from "next/navigation";
import { useGoogleMaps } from "../maps/GoogleMapsApiProvider";
import usePromise from "@/hooks/usePromise";

interface Props extends PropsWithChildren {}
const MainMap: React.FC<Props> = ({ children }) => {
    const clientLatLng = useLatLng();
    const initializeMainMap = useMainMapInitializer();
    const map = useMainMap();

    // TODO: refactor for readability
    const geocoder = useGoogleMaps()?.geocoder;
    const params = useSearchParams();
    const searchResultPlaceID = params.get("search");
    const getSearchLocation = useCallback(() => {
        if (!geocoder) return Promise.reject("google maps service not initialized");
        if (!searchResultPlaceID) return Promise.reject();
        return geocoder
            .geocode({ placeId: searchResultPlaceID })
            .then((res) => res.results[0]?.geometry.location)
            .then((location) => {
                if (location) {
                    map?.panTo(location);
                }
                return location;
            });
    }, [geocoder, map, searchResultPlaceID]);
    const [searchLocation] = usePromise(getSearchLocation);
    
    return (
        <main>
            <GoogleMap fallback={<BlockLoadingSpinner />} onReady={initializeMainMap}>
                {clientLatLng && <MapMarker position={clientLatLng} title="your location" />}
                {searchLocation && <MapMarker position={searchLocation} title="search result" />}
                {children}
            </GoogleMap>
            <GetLocationButton css={{ pos: "absolute", bottom: "8", right: "4" }} />
        </main>
    );
};

export default MainMap;
