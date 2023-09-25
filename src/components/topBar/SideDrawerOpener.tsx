"use client";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { hstack, square } from "../../../styled-system-out/patterns";
import type { PropsWithChildren } from "react";
import { useLayout } from "../layout/MainLayoutContext";

const chevronStyle = square({ size: 8, mt: 1, color: "white", cursor: "pointer" });

interface Props extends PropsWithChildren {}
const SideDrawerOpener: React.FC<Props> = ({ children }) => {
    const [layout, dispatchLayout] = useLayout();

    return (
        <button
            className={hstack({ gap: "1", cursor: "pointer" })}
            onClick={() => dispatchLayout({ type: "toggle", part: "SideBar" })}
            aria-label="toggle side drawer"
            aria-pressed={layout.isSideBarOpen}
        >
            {children}
            {layout.isSideBarOpen ? (
                <HiChevronUp className={chevronStyle} />
            ) : (
                <HiChevronDown className={chevronStyle} />
            )}
        </button>
    );
};

export default SideDrawerOpener;
