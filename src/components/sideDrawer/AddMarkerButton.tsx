"use client";

import { FaPlus } from "react-icons/fa6";
import { css } from "../../../styled-system-out/css";
import { square } from "../../../styled-system-out/patterns";
import { useLayout } from "../layout/MainLayoutContext";
import { iconButton } from "@/theme/styles/buttons";

interface Props {}
const AddMarkerButton: React.FC<Props> = () => {
    const [_, dispatch] = useLayout();
    return (
        <button className={iconButton} onClick={() => dispatch({ type: "open", part: "FormModal" })}>
            <FaPlus className={square({ size: "6" })} />
        </button>
    );
};

export default AddMarkerButton;
