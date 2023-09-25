"use client";
import usePlacesAutocomplete from "@/hooks/usePlacesAutocomplete";
import type { SearchOption } from "../SearchBar";
import { useCallback, useState } from "react";
import SearchBar from "../SearchBar";
import type { Consumer } from "@/types/functions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSearchParamsSetter from "@/hooks/useSearchParamsSetter";

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
    // TODO: debounce this thing
    const [input, setInput] = useState<string>("");
    const [queryResults, status] = usePlacesAutocomplete(input);
    const setSearchParams = useSearchParamsSetter();


    const options = queryResults?.map(createLocationOption);
    const isLoading = status === "loading";

    const onSearch = useCallback<Consumer<QueryResult>>((query) => {
        setSearchParams({search: query.place_id ?? ''})
    }, [setSearchParams]);

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
