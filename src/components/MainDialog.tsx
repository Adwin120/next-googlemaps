"use client";
import type { PropsWithChildren } from "react";
// TODO: move to some "layout" folder

import AddMarkerForm from "./AddMarkerForm";
import ModalDialog from "./ModalDialog";
import { useLayout } from "./layoutContexts/TopBarAndDrawerLayoutContext";

interface Props extends PropsWithChildren {}
const MainDialog: React.FC<Props> = ({children}) => {
    const [{ isFormModalOpen }, dispatch] = useLayout();
    return (
        <ModalDialog open={isFormModalOpen} onClose={() => dispatch({ type: "closeFormModal" })}>
            {children}
        </ModalDialog>
    );
};

export default MainDialog;
