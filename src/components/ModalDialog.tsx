"use client";

import { useCallback, useEffect, useRef } from "react";
import { css } from "../../styled-system-out/css";
import { center } from "../../styled-system-out/patterns";
import type { MouseEvent, PropsWithChildren } from "react";
import { pointInDOMRect } from "@/utils/pointInDOMRect";

// the open html attribute on dialog tag does not open the dialog in modal mode
// modal mode works only with .openModal()

// there is no cleaner way of making it close on backdrop

interface Props extends PropsWithChildren {
    open?: boolean;
}
const ModalDialog: React.FC<Props> = ({ open = false, children }) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (open) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [open]);

    const closeOnBackdrop = useCallback((e: MouseEvent<HTMLDialogElement>) => {
        const boundingRect = e.currentTarget.getBoundingClientRect();
        const clickPoint = [e.clientX, e.clientY] as const;
        const backdropClick = !pointInDOMRect(clickPoint, boundingRect);
        if (backdropClick) {
            e.currentTarget.close();
        }
    }, []);

    return (
        <dialog
            onClick={closeOnBackdrop}
            ref={dialog}
            className={css({ bg: "gray.800", m: "auto", p: "4", shadow: "20", _backdrop: {
                bg: "rgba(0, 0, 0, 0.4)"
            } })}
        >
            {children}
        </dialog>
    );
};

export default ModalDialog;
