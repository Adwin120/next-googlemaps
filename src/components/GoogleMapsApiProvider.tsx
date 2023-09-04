"use client";

import usePromise from "@/hooks/usePromise";
import { Loader } from "@googlemaps/js-api-loader";
import dynamic from "next/dynamic";
import {
    PropsWithChildren,
    ReactNode,
    Suspense,
    createContext,
    use,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API!;

// const _GoogleMapsApiProvider: React.FC<PropsWithChildren> = ({ children }) => (
//     <Suspense fallback={<div>suspense fallback</div>}>
//         <GoogleMapsApiProvider1>{children}</GoogleMapsApiProvider1>
//     </Suspense>
// );

const GoogleMapsApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [mapApi, status] = usePromise(loadMapsApi);
    const contextValue = status === "success" ? {
        maps: mapApi[0]
    } : defaultContext
    return (
        <GoogleMapsAPIContext.Provider value={contextValue}>
            {children}
        </GoogleMapsAPIContext.Provider>
    );
};

const loadMapsApi = () => {
    const loader = new Loader({
        apiKey: API_KEY,
    });
    return Promise.all([
        loader.importLibrary("maps"), //add more as necessary
    ]);
};

interface GoogleMapsApiContext {
    maps: google.maps.MapsLibrary | null;
}
const defaultContext = {
    maps: null,
}
const GoogleMapsAPIContext = createContext<GoogleMapsApiContext>(defaultContext);
export const useGoogleMaps = () => useContext(GoogleMapsAPIContext);

export default GoogleMapsApiProvider;
