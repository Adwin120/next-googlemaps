import { css, cx } from "../../../styled-system-out/css";
import { hstack, square } from "../../../styled-system-out/patterns";

export const inputContainerStyle = hstack({
    borderColor: "blue.950",
    borderWidth: "thick",
    borderRadius: "full",
    px: "2",
});

export const inputStyle = css({
    bg: "transparent",
    color: "white",
    fontSize: "xl",
    _focusVisible: {
        outline: "none",
    },
});

export const inputIconsStyle = square({ size: 8, color: "white" });
export const chevronIconsStyle = cx(inputIconsStyle, css({cursor: "pointer"}))

export const popupMenuStyle = css({
    pos: "absolute",
    w: "full",
    bg: "gray.600",
});
