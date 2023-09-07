"use client";
import usePromise from "@/hooks/usePromise";
import { search } from "@/utils/mock";
import { useCallback, useRef, useState } from "react";
import { css, cx } from "../../../styled-system-out/css";
import { useCombobox } from "downshift";
import AutocompleteMenuContent from "./AutocompleteMenuContent";
import { hstack, square, visuallyHidden } from "../../../styled-system-out/patterns";
import { MagnifyingGlassIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import {
    chevronIconsStyle,
    inputContainerStyle,
    inputIconsStyle,
    inputStyle,
    popupMenuStyle,
} from "./autocomplete.css";

interface Props {}
const SearchBar: React.FC<Props> = () => {
    const [query, setQuery] = useState<string | null>(null); //TODO: change to position-representing object
    const [input, setInput] = useState<string>("");

    const searchPromise = useCallback(() => {
        return search(input);
    }, [input]);
    const [options, status] = usePromise(searchPromise);

    const combobox = useCombobox({
        items: options ?? [],
        onInputValueChange(changes) {
            setInput(changes.inputValue ?? "");
        },
        onStateChange(changes) {
            setQuery(changes.selectedItem ?? null);
        },
        itemToString: (x) => x ?? "",
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const focusInput = () => {
        combobox.openMenu();
        inputRef.current?.focus();
    };

    return (
        <search className={css({ pos: "relative" })}>
            <div className={inputContainerStyle}>
                <label {...combobox.getLabelProps()} className={visuallyHidden()}>
                    search map
                </label>
                <MagnifyingGlassIcon className={inputIconsStyle} onClick={focusInput} />
                <input {...combobox.getInputProps({ref: inputRef})} className={inputStyle} />
                <button {...combobox.getToggleButtonProps()}>
                    {combobox.isOpen ? (
                        <ChevronUpIcon className={chevronIconsStyle} />
                    ) : (
                        <ChevronDownIcon className={chevronIconsStyle} />
                    )}
                </button>
            </div>
            <ul {...combobox.getMenuProps()} className={popupMenuStyle}>
                <AutocompleteMenuContent
                    combobox={combobox}
                    optionToString={(x) => x ?? ""}
                    options={options ?? []}
                    status={status}
                />
            </ul>
        </search>
    );
};

export default SearchBar;
