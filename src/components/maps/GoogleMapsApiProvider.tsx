"use client";

import usePromise from "@/hooks/usePromise";
import { Loader } from "@googlemaps/js-api-loader";
import { PropsWithChildren, createContext, useCallback, useContext } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API!;

//TODO: instead of just returning record with nulls, return status too
const GoogleMapsApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const loadMapsApi = useCallback(() => {
        const loader = new Loader({
            apiKey: API_KEY,
        });
        return Promise.all([
            loader.importLibrary("maps"),
            loader.importLibrary("marker"),
            loader.importLibrary("places") //add more as necessary
        ]);
    }, []);
    const [mapApi, status] = usePromise(loadMapsApi);
    const contextValue =
        status === "success"
            ? {
                  maps: mapApi[0],
                  marker: mapApi[1],
                  places: mapApi[2],
                  autocomplete: new mapApi[2].AutocompleteService()
              }
            : defaultContext;

    return (
        <GoogleMapsAPIContext.Provider value={contextValue}>
            {children}
        </GoogleMapsAPIContext.Provider>
    );
};



type GoogleMapsApiContext = {
    maps: google.maps.MapsLibrary | null;
    marker: google.maps.MarkerLibrary | null;
    places: google.maps.PlacesLibrary | null;
    autocomplete: google.maps.places.AutocompleteService | null
}

const defaultContext = {
    maps: null,
    marker: null,
    places: null,
    autocomplete: null
};
const GoogleMapsAPIContext = createContext<GoogleMapsApiContext>(defaultContext);
export const useGoogleMaps = () => useContext(GoogleMapsAPIContext);

export default GoogleMapsApiProvider;
