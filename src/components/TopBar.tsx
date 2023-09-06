import { css, cx } from "@/../styled-system-out/css";
import { hstack } from "../../styled-system-out/patterns";

interface Props {}
const TopBar: React.FC<Props> = () => {
    return (
        <header
            className={cx(css({
                height: "headerHeight",
                shadow: "lg",
                zIndex: 2,
                pos: "sticky",
                bg: "slate.800",
                px: "3"
            }), hstack())}
        >
            
        </header>
    );
};

export default TopBar;
