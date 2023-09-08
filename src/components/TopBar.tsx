import { hstack } from "../../styled-system-out/patterns";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}
const TopBar: React.FC<Props> = ({children}) => {
    return (
        <header
            className={hstack({
                justify: "space-between",
                height: "headerHeight",
                shadow: "lg",
                zIndex: 2,
                pos: "sticky",
                bg: "emerald.950",
                px: "3",
            })}
        >
            {children}
        </header>
    );
};

export default TopBar;
