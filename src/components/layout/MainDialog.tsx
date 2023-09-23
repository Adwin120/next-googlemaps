"use client";
import type { PropsWithChildren } from "react";
import ModalDialog from "../utils/ModalDialog";
import { useLayout } from "./MainLayoutContext";

interface Props extends PropsWithChildren {}
const MainDialog: React.FC<Props> = ({ children }) => {
    const [{ isFormModalOpen }, dispatch] = useLayout();
    return (
        <ModalDialog
            open={isFormModalOpen}
            onClose={() => dispatch({ type: "close", part: "FormModal" })}
        >
            {children}
        </ModalDialog>
    );
};

export default MainDialog;
