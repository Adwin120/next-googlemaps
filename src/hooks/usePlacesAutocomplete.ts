import { useGoogleMaps } from "@/components/maps/GoogleMapsApiProvider";
import { useCallback } from "react";
import useMemoizedPromise from "./useMemoizedPromise";

type _Statuses = google.maps.places.PlacesServiceStatus;
type Statuses = `${_Statuses}`;
const fineStatuses: Statuses[] = ["OK", "NOT_FOUND", "ZERO_RESULTS"];

const usePlacesAutocomplete = (input?: string) => {
    const autocomplete = useGoogleMaps()?.autocomplete;

    const promise = useCallback(() => {
        if (!autocomplete || typeof input !== "string" || input.length === 0)
            return Promise.resolve([]);

        return new Promise<google.maps.places.QueryAutocompletePrediction[]>((resolve, reject) =>
            //TODO: influence by main map bounds
            autocomplete.getPlacePredictions(
                { input, language: navigator.language },
                (prediction, status) => {
                    if (fineStatuses.includes(status)) {
                        resolve(prediction!);
                    } else {
                        reject(status);
                    }
                }
            )
        );
    }, [autocomplete, input]);
    const predictions = useMemoizedPromise(promise);

    return predictions;
};

export default usePlacesAutocomplete;
