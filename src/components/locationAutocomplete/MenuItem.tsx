import { UseComboboxReturnValue } from "downshift";
import { css } from "../../../styled-system-out/css";

interface Props<T = unknown> {
    combobox: UseComboboxReturnValue<T>;
    option: T;
    index: number;
    optionToString: (x: T) => string;
}
function MenuItem<T>({ combobox, option, index: i, optionToString }: Props<T>) {
    const style = css({
        bg: combobox.highlightedIndex === i ? "blue.950" : "transparent",
        fontWeight: combobox.selectedItem === option ? "extrabold" : "initial",
        color: "white",
    });

    return (
        <li {...combobox.getItemProps({ item: option, index: i })} className={style}>
            {optionToString(option)}
        </li>
    );
}

export default MenuItem;
