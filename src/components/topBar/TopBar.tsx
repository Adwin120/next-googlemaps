import { hstack } from "../../../styled-system-out/patterns";
import { PropsWithChildren } from "react";
import { token } from "../../../styled-system-out/tokens";

interface Props extends PropsWithChildren {}
const TopBar: React.FC<Props> = ({children}) => {
    return (
        <header
            className={hstack({
                justify: "space-between",
                height: "headerHeight",
                shadow: "13",
                zIndex: 2,
                pos: "sticky",
                bg: "primary",
                px: "3",
            })}
        >
            {children}
        </header>
    );
};

export default TopBar;