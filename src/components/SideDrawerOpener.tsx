"use client"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { hstack, square } from "../../styled-system-out/patterns";
import UserInfo from "./UserInfo";
import { PropsWithChildren } from "react";
import { useLayout } from "@/app/layout";

const chevronStyle = square({ size: 8, mt: 1, color: "white", cursor: "pointer" })

interface Props extends PropsWithChildren {}
const SideDrawerOpener: React.FC<Props> = ({children}) => {
    const [layout, dispatchLayout] = useLayout();
    
    return (
        //TODO: probably has to be a button, check mui icon button for reference
        <div className={hstack({ gap: "1", cursor: "pointer" })} onClick={() => dispatchLayout({type: "toggleSideBar"})}>
            {children}
            {layout.isSideBarOpen ? <ChevronUpIcon className={chevronStyle}/> : <ChevronDownIcon className={chevronStyle}/>}
        </div>
    );
};

export default SideDrawerOpener;
