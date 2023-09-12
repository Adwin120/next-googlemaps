import { UseComboboxReturnValue } from "downshift";
import { css } from "../../../styled-system-out/css";
import { menuItemStyle } from "./autocomplete.css";

interface Props<T = unknown> {
    combobox: UseComboboxReturnValue<T>;
    option: T;
    index: number;
    optionToString: (x: T) => string;
}
function MenuItem<T>({ combobox, option, index: i, optionToString }: Props<T>) {
    return (
        <li
            {...combobox.getItemProps({ item: option, index: i })}
            className={menuItemStyle({
                highlighted: combobox.highlightedIndex === i,
                selected: combobox.selectItem === option,
            })}
        >
            {optionToString(option)}
        </li>
    );
}

export default MenuItem;
