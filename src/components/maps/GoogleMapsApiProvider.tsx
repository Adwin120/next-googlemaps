"use client";

import usePromise from "@/hooks/usePromise";
import { Loader } from "@googlemaps/js-api-loader";
import { PropsWithChildren, createContext, useContext } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API!;

const GoogleMapsApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [mapApi, status] = usePromise(loadMapsApi);
    const contextValue =
        status === "success"
            ? {
                  maps: mapApi[0],
                  marker: mapApi[1],
              }
            : defaultContext;

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
        loader.importLibrary("maps"),
        loader.importLibrary("marker"), //add more as necessary
    ]);
};

interface GoogleMapsApiContext {
    maps: google.maps.MapsLibrary | null;
    marker: google.maps.MarkerLibrary | null;
}
const defaultContext = {
    maps: null,
    marker: null,
};
const GoogleMapsAPIContext = createContext<GoogleMapsApiContext>(defaultContext);
export const useGoogleMaps = () => useContext(GoogleMapsAPIContext);

export default GoogleMapsApiProvider;
