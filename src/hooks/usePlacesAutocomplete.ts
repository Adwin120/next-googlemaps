import useSWR from "swr";
import useGoogleMapsAPI from "./useGoogleMapsAPI";
import type {
    AutocompleteSuggestion,
    AutocompleteService,
    GooglePlacesStatuses,
    LatLngBounds,
    LatLngBoundsObj,
} from "@/types/googleMapsServices";
import { useMainMap } from "@/components/layout/MainMapInstanceProvider";
import { useCallback, useMemo } from "react";

const autocompleteFetcher = (
    input: string,
    autocompleteService: AutocompleteService,
    influence?: LatLngBounds | LatLngBoundsObj
): Promise<AutocompleteSuggestion[]> => {
    return autocompleteService
        .getPlacePredictions({
            input,
            language: navigator.language,
            locationBias: influence,
        })
        .then((res) => res.predictions);
};

// const spreadedFetcher = (args: Parameters<typeof autocompleteFetcher>) =>
//     autocompleteFetcher(...args);

const useSearchAutocomplete = (input: string) => {
    const service = useGoogleMapsAPI("autocomplete");
    const mainMap = useMainMap();
    const regionBias = mainMap?.getBounds();

    const fetcher = useCallback(
        (input: string) => {
            // will run only with service defined due to (service && input) as SWR key
            return autocompleteFetcher(input, service!, regionBias);
        },
        [service, regionBias]
    );

    const { data } = useSWR(service && input, fetcher, {
        keepPreviousData: true,
    });

    return data ?? null;
};

export default useSearchAutocomplete;
