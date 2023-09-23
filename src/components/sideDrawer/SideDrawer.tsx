"use client";

import { useLayout } from "../layout/MainLayoutContext";
import type { PropsWithChildren } from "react";
import { css } from "../../../styled-system-out/css";
import { token } from "../../../styled-system-out/tokens";

interface Props extends PropsWithChildren {}
const SideDrawer: React.FC<Props> = ({ children }) => {
    const [layout] = useLayout();
    return (
        <div
            className={css({
                pos: "fixed",
                right: "0px",
                top: token("sizes.headerHeight"),
                h: "underHeaderHeight",
                w: "90%",
                px: "2",
                py: "4",
                maxW: "96",
                zIndex: 1,
                bg: "gray.800",
                shadow: "10",
                transform: layout.isSideBarOpen ? "" : "translateX(100%)",
                transition: "transform 0.3s ease-out",
            })}
            aria-hidden={!layout.isSideBarOpen}
        >
            {children}
        </div>
    );
};

export default SideDrawer;
