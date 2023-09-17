"use client";

import { FaPlus } from "react-icons/fa6";
import { css } from "../../../styled-system-out/css";
import { square } from "../../../styled-system-out/patterns";
import { useLayout } from "../layoutContexts/TopBarAndDrawerLayoutContext";

interface Props {}
const AddMarkerButton: React.FC<Props> = () => {
    const [_, dispatch] = useLayout();
    return (
        <button
            onClick={() => dispatch({ type: "openFormModal" })}
            className={css({ p: "1", color: "white", cursor: "pointer" })}
        >
            <FaPlus className={square({ size: "6" })} />
        </button>
    );
};

export default AddMarkerButton;
