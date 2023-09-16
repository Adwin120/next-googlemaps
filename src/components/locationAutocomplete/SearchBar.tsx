"use client";
import { useRef, useState } from "react";
import { css } from "../../../styled-system-out/css";
import { useCombobox } from "downshift";
import AutocompleteMenuContent from "./AutocompleteMenuContent";
import { visuallyHidden } from "../../../styled-system-out/patterns";
import { HiMiniMagnifyingGlass, HiMiniChevronUp, HiMiniChevronDown } from "react-icons/hi2";
import {
    chevronIconsStyle,
    inputContainerStyle,
    inputIconsStyle,
    inputStyle,
    popupMenuStyle,
} from "./autocomplete.css";
import usePlacesAutocomplete from "@/hooks/usePlacesAutocomplete";

type Query = google.maps.places.QueryAutocompletePrediction;

const queryToString = (query: Query | null): string => query?.description ?? "";
const queryToId = (query: Query) => query.place_id ?? query.description;

interface Props {}
const SearchBar: React.FC<Props> = () => {
    const [query, setQuery] = useState<Query | null>(null);
    const [input, setInput] = useState<string>("");
    const [suggestionBoxOpen, setSuggestionBoxOpen] = useState<boolean>(false);

    //TODO: debounce this thing
    const [options, status] = usePlacesAutocomplete(input);

    const combobox = useCombobox({
        items: options ?? [],
        onInputValueChange(changes) {
            setInput(changes.inputValue ?? "");
            if (changes.inputValue === "") setSuggestionBoxOpen(false);
        },
        onStateChange(changes) {
            setQuery(changes.selectedItem ?? null);
        },
        itemToString: queryToString,
        isOpen: suggestionBoxOpen,
        onIsOpenChange(changes) {
            if (changes.inputValue !== "" || !changes.isOpen)
                setSuggestionBoxOpen(changes.isOpen ?? false);
        },
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const focusInput = () => {
        setSuggestionBoxOpen(true);
        inputRef.current?.focus();
    };

    const toggleButtonProps = combobox.getToggleButtonProps();

    return (
        <search className={css({ pos: "relative" })}>
            <div className={inputContainerStyle}>
                <label {...combobox.getLabelProps()} className={visuallyHidden()}>
                    search map
                </label>
                <HiMiniMagnifyingGlass className={inputIconsStyle} onClick={focusInput} />
                <input {...combobox.getInputProps({ ref: inputRef })} className={inputStyle} />
                <button
                    {...toggleButtonProps}
                    onClick={(e) => {
                        focusInput();
                        toggleButtonProps.onClick && toggleButtonProps.onClick(e);
                    }}
                >
                    {suggestionBoxOpen ? (
                        <HiMiniChevronUp className={chevronIconsStyle} />
                    ) : (
                        <HiMiniChevronDown className={chevronIconsStyle} />
                    )}
                </button>
            </div>
            <ul {...combobox.getMenuProps()} className={popupMenuStyle}>
                <AutocompleteMenuContent
                    combobox={combobox}
                    optionToString={queryToString}
                    optionToID={queryToId}
                    options={options ?? []}
                    status={status}
                />
            </ul>
        </search>
    );
};

export default SearchBar;
