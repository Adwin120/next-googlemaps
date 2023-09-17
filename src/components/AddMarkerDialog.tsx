"use client";
// TODO: move to some "layout" folder

import AddMarkerForm from "./AddMarkerForm";
import ModalDialog from "./ModalDialog";
import { useLayout } from "./layoutContexts/TopBarAndDrawerLayoutContext";

interface Props {}
const AddMarkerDialog: React.FC<Props> = () => {
    const [{ isFormModalOpen }, dispatch] = useLayout();
    return (
        <ModalDialog open={isFormModalOpen} onClose={() => dispatch({ type: "closeFormModal" })}>
            <AddMarkerForm />
        </ModalDialog>
    );
};

export default AddMarkerDialog;
