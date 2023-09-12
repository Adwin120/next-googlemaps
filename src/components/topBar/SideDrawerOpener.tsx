"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { hstack, square } from "../../../styled-system-out/patterns";
import UserInfo from "./UserInfo";
import { PropsWithChildren } from "react";
import { useLayout } from "../layoutContexts/TopBarAndDrawerLayoutContext";

const chevronStyle = square({ size: 8, mt: 1, color: "white", cursor: "pointer" });

interface Props extends PropsWithChildren {}
const SideDrawerOpener: React.FC<Props> = ({ children }) => {
    const [layout, dispatchLayout] = useLayout();

    return (
        <button
            className={hstack({ gap: "1", cursor: "pointer" })}
            onClick={() => dispatchLayout({ type: "toggleSideBar" })}
            aria-label="toggle side drawer"
            aria-pressed={layout.isSideBarOpen}
        >
            {children}
            {layout.isSideBarOpen ? (
                <ChevronUpIcon className={chevronStyle} />
            ) : (
                <ChevronDownIcon className={chevronStyle} />
            )}
        </button>
    );
};

export default SideDrawerOpener;
