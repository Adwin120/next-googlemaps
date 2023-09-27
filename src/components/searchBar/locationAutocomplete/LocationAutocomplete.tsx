"use client";
import { useCallback, useState } from "react";
import usePlacesAutocomplete from "@/hooks/usePlacesAutocomplete";
import useSearchParamsSetter from "@/hooks/useSearchParamsSetter";

import type { SearchOption } from "../SearchBar";
import SearchBar from "../SearchBar";

import type { Consumer } from "@/types/functions";
import { useDebounced } from "@/hooks/useDebounced";

type QueryResult = google.maps.places.QueryAutocompletePrediction;
const createLocationOption = (query: QueryResult): SearchOption<QueryResult> => ({
    data: query,
    get label() {
        return this.data.description;
    },
    get id() {
        return this.data.place_id ?? this.data.description;
    },
});

interface Props {}
const LocationAutocomplete: React.FC<Props> = () => {
    const [input, setInput] = useState<string>("");
    const debouncedInput = useDebounced(input, 300);

    const queryResults = usePlacesAutocomplete(debouncedInput);
    const setSearchParams = useSearchParamsSetter();

    const options = queryResults?.map(createLocationOption);
    const isLoading = !queryResults;

    const onSearch = useCallback<Consumer<QueryResult>>(
        (query) => {
            setSearchParams({ search: query.place_id ?? "" });
        },
        [setSearchParams]
    );

    return (
        <SearchBar
            input={input}
            onInputChange={setInput}
            isLoading={isLoading}
            options={options ?? []}
            onSearch={onSearch}
        />
    );
};

export default LocationAutocomplete;
