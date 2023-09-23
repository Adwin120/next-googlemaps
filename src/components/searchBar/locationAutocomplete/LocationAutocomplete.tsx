"use client"
import usePlacesAutocomplete from "@/hooks/usePlacesAutocomplete";
import type { SearchOption } from "../SearchBar";
import { useState } from "react";
import SearchBar from "../SearchBar";

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

    const options = queryResults?.map(createLocationOption)
    const isLoading = status === "loading"
    
    return <SearchBar 
        input={input}
        onInputChange={setInput}
        isLoading={isLoading}
        options={options ?? []}
        onSearch={console.log}
    />;
};

export default LocationAutocomplete;
