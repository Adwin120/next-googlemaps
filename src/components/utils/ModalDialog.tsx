"use client";
import { useCallback, useEffect, useRef } from "react";
import type { ElementRef, MouseEvent, PropsWithChildren } from "react";

import { pointInDOMRect } from "@/utils/pointInDOMRect";
import { css } from "../../../styled-system-out/css";

// the open html attribute on dialog tag does not open the dialog in modal mode
// modal mode works only with .openModal()

// there is no cleaner way of making it close on backdrop

interface Props extends PropsWithChildren {
    open?: boolean;
    onClose: () => void;
}
const ModalDialog: React.FC<Props> = ({ open = false, onClose, children }) => {
    const dialog = useRef<ElementRef<"dialog">>(null);

    useEffect(() => {
        if (open) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [open]);

    const closeOnBackdrop = useCallback(
        (e: MouseEvent<HTMLDialogElement>) => {
            const boundingRect = e.currentTarget.getBoundingClientRect();
            const clickPoint = [e.clientX, e.clientY] as const;
            const backdropClick = !pointInDOMRect(clickPoint, boundingRect);
            if (backdropClick) {
                onClose();
            }
        },
        [onClose]
    );

    return (
        <dialog
            onClick={closeOnBackdrop}
            ref={dialog}
            className={css({
                bg: "gray.800",
                m: "auto",
                p: "4",
                shadow: "20",
                _backdrop: {
                    bg: "rgba(0, 0, 0, 0.4)",
                },
            })}
        >
            {children}
        </dialog>
    );
};

export default ModalDialog;
