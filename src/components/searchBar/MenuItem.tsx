import type { UseComboboxReturnValue } from "downshift";
import { menuItemStyle } from "./autocomplete.css";
import type { SearchOption } from "./SearchBar";

interface Props<T = unknown> {
    combobox: UseComboboxReturnValue<SearchOption<T>>;
    option: SearchOption<T>;
    index: number;
}
function MenuItem<T>({ combobox, option, index: i }: Props<T>) {
    return (
        <li
            {...combobox.getItemProps({ item: option, index: i })}
            className={menuItemStyle({
                highlighted: combobox.highlightedIndex === i,
                selected: combobox.selectItem === option.data,
            })}
        >
            {option.label}
        </li>
    );
}

export default MenuItem;
