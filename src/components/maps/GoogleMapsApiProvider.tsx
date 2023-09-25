"use client";

import { createContext, useCallback, useContext, type PropsWithChildren } from "react";
import usePromise from "@/hooks/usePromise";
import { Loader } from "@googlemaps/js-api-loader";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API!;

const GoogleMapsApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const loadMapsApi = useCallback(() => {
        const loader = new Loader({
            apiKey: API_KEY,
        });
        return Promise.all([
            loader.importLibrary("maps"),
            loader.importLibrary("marker"),
            loader.importLibrary("places"),
            loader.importLibrary("geocoding") //add more as necessary
        ]);
    }, []);
    const [mapApi, status] = usePromise(loadMapsApi);
    const contextValue =
        status === "success"
            ? {
                  maps: mapApi[0],
                  marker: mapApi[1],
                  places: mapApi[2],
                  autocomplete: new mapApi[2].AutocompleteService(),
                  geocoder: new mapApi[3].Geocoder()
              }
            : null;

    return (
        <GoogleMapsAPIContext.Provider value={contextValue}>
            {children}
        </GoogleMapsAPIContext.Provider>
    );
};

type GoogleMapsApiContext = {
    maps: google.maps.MapsLibrary;
    marker: google.maps.MarkerLibrary;
    places: google.maps.PlacesLibrary;
    autocomplete: google.maps.places.AutocompleteService;
    geocoder: google.maps.Geocoder
} | null;

const GoogleMapsAPIContext = createContext<GoogleMapsApiContext>(null);
export const useGoogleMaps = () => useContext(GoogleMapsAPIContext);

export default GoogleMapsApiProvider;
