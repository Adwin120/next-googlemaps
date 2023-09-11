import { useGoogleMaps } from "@/components/maps/GoogleMapsApiProvider";
import { useCallback, useMemo } from "react";
import usePromise from "./usePromise";
import useMemoizedPromise from "./useMemoizedPromise";

type _Statuses = google.maps.places.PlacesServiceStatus;
type Statuses = `${_Statuses}`;
const fineStatuses: Statuses[] = ["OK", "NOT_FOUND", "ZERO_RESULTS"];

const usePlacesAutocomplete = (input?: string) => {
    const { autocomplete } = useGoogleMaps();

    const promise = useCallback(() => {
        if (!autocomplete || typeof input !== "string" || input.length === 0) return Promise.resolve([]);
        return new Promise<google.maps.places.QueryAutocompletePrediction[]>((resolve, reject) =>
            //TODO: influence by main map bounds
            autocomplete.getQueryPredictions({ input }, (prediction, status) => {
                console.log(prediction)
                if (fineStatuses.includes(status)) {
                    resolve(prediction!);
                } else {
                    reject(status);
                }
            })
        );
    }, [autocomplete, input]);
    const predictions = useMemoizedPromise(promise);

    return predictions;
};

export default usePlacesAutocomplete;
