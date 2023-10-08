"use client";
import { FaTrash } from "react-icons/fa6";
import { css } from "../../../../styled-system-out/css";
import { button, iconButton } from "@/theme/styles/buttons";
import { useId, type ElementRef, forwardRef } from "react";
import { deleteMarker } from "./deleteMarker";
import { hstack } from "../../../../styled-system-out/patterns";

interface Props {
    itemId: string;
}
const AlertDeleteButton: React.ForwardRefFC<ElementRef<"button">, Props> = ({ itemId }, ref) => {
    const popoverId = useId();
    return (
        <>
            <button
                ref={ref}
                className={iconButton}
                popovertarget={popoverId}
                popovertargetaction="show"
            >
                <FaTrash className={css({ display: "inline" })} /> Delete
            </button>
            <div
                id={popoverId}
                popover="auto"
                className={css({ margin: "auto", p: 4, rounded: "xl" })}
            >
                Are you sure you want to delete the marker
                <div className={hstack({ justify: "space-around" })}>
                    <button
                        className={css(button, { bg: "gray.200" })}
                        popovertarget={popoverId}
                        popovertargetaction="hide"
                    >
                        Cancel
                    </button>
                    <button
                        className={css(button, { color: "red.200", bg: "red.900" })}
                        onClick={() => deleteMarker(itemId)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
};

export default forwardRef(AlertDeleteButton);
