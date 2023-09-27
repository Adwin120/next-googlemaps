import { Loader } from "@googlemaps/js-api-loader";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

interface GoogleMapsServices {
    maps: google.maps.MapsLibrary;
    marker: google.maps.MarkerLibrary;
    places: google.maps.PlacesLibrary;
    autocomplete: google.maps.places.AutocompleteService;
    geocoder: google.maps.Geocoder;
}

async function loadGoogleMapsServices(): Promise<GoogleMapsServices> {
    console.log("loading google maps API");
    const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API!,
    });

    const [maps, marker, places, geocoding] = await Promise.all([
        loader.importLibrary("maps"),
        loader.importLibrary("marker"),
        loader.importLibrary("places"),
        loader.importLibrary("geocoding"),
    ]);

    return {
        maps,
        marker,
        places,
        autocomplete: new places.AutocompleteService(),
        geocoder: new geocoding.Geocoder(),
    };
}

const useGoogleMapsAPI = <K extends keyof GoogleMapsServices>(name: K) => {
    const { data } = useSWRImmutable("singleton", loadGoogleMapsServices);
    return data?.[name] ?? null;
};
export default useGoogleMapsAPI;
