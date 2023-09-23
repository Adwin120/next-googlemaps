"use client";
import type { UseComboboxReturnValue } from "downshift";
import type { PromiseStatus } from "@/hooks/usePromise";
import MenuItem from "./MenuItem";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { menuItemStyle } from "./autocomplete.css";
import type { SearchOption } from "./SearchBar";

interface Props<T> {
    combobox: UseComboboxReturnValue<SearchOption<T>>;
    options: SearchOption<T>[];
    isLoading: boolean;
}
function AutocompleteMenuContent<T>({ combobox, options, isLoading }: Props<T>) {
    if (!combobox.isOpen) return null;
    if (isLoading && options.length === 0)
        return (
            <li>
                <LoadingSpinner css={{ size: 8 }} spinnerWidth="16" /> loading
            </li>
        );
    if (options.length === 0) return <li className={menuItemStyle()}>no options</li>;

    return options.map((option, i) => (
        <MenuItem<T>
            combobox={combobox}
            index={i}
            key={option.id}
            option={option}
        />
    ));
}

export default AutocompleteMenuContent;
