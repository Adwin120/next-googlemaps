"use client";

import { useRef, useState, type ElementRef } from "react";
import { useCombobox } from "downshift";

import AutocompleteMenuContent from "./AutocompleteMenuContent";
import { HiMiniMagnifyingGlass, HiMiniChevronUp, HiMiniChevronDown } from "react-icons/hi2";

import { visuallyHidden } from "../../../styled-system-out/patterns";
import { css } from "../../../styled-system-out/css";
import {
    chevronIconsStyle,
    inputContainerStyle,
    inputIconsStyle,
    inputStyle,
    popupMenuStyle,
} from "./autocomplete.css";
import type { Consumer } from "@/types/functions";

export interface SearchOption<T> {
    id: string | number;
    label: string;
    data: T;
}

interface Props<T> {
    options: SearchOption<T>[];
    isLoading: boolean;
    input: string;
    onInputChange: Consumer<string>;
    onSearch: Consumer<T>;
}
const SearchBar = <T,>({ options, onInputChange, onSearch, isLoading }: Props<T>) => {
    const [suggestionBoxOpen, setSuggestionBoxOpen] = useState<boolean>(false);

    const combobox = useCombobox<SearchOption<T>>({
        items: options ?? [],
        onInputValueChange(changes) {
            onInputChange(changes.inputValue ?? "");
            if (changes.inputValue === "") setSuggestionBoxOpen(false);
        },
        onStateChange(changes) {
            if (changes.selectedItem) {
                onSearch(changes.selectedItem.data);
            }
        },
        itemToString: (item) => item?.label ?? "",
        isOpen: suggestionBoxOpen,
        onIsOpenChange(changes) {
            if (changes.inputValue !== "" || !changes.isOpen)
                setSuggestionBoxOpen(changes.isOpen ?? false);
        },
    });

    const inputRef = useRef<ElementRef<"input">>(null);
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
                <AutocompleteMenuContent<T>
                    combobox={combobox}
                    options={options}
                    isLoading={isLoading}
                />
            </ul>
        </search>
    );
};

export default SearchBar;
