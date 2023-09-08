"use client";
import { UseComboboxReturnValue } from "downshift";
import { PromiseStatus } from "@/hooks/usePromise";
import MenuItem from "./MenuItem";
import { LoadingSpinner } from "../utils/LoadingSpinner";

interface Props<T> {
    combobox: UseComboboxReturnValue<T>;
    options: T[];
    optionToString: (option: T) => string;
    status: PromiseStatus;
}
function AutocompleteMenuContent<T>({ combobox, options, optionToString, status }: Props<T>) {
    if (!combobox.isOpen) return null;
    if (status !== "success")
        return (
            <li>
                <LoadingSpinner css={{ size: 8 }} spinnerWidth="16" /> loading
            </li>
        );
    if (options.length === 0) return <li>no options</li>;

    return options.map((option, i) => (
        <MenuItem
            combobox={combobox}
            index={i}
            key={optionToString(option)}
            option={option}
            optionToString={optionToString}
        />
    ));
}

export default AutocompleteMenuContent;
