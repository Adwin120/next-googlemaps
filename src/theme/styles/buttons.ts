import { css } from "../../../styled-system-out/css";

export const button = css.raw({
    p: 2,
    cursor: "pointer",
    rounded: "xl",
    shadow: "bump",
    _active: { shadow: "well" },
});

export const iconButton = css(button, {
    color: "white",
    rounded: "full",
    shadow: "0",
    _hover: { bg: "gray.900" },
});
