import { css, cx } from "@/../styled-system-out/css";
import { hstack } from "../../styled-system-out/patterns";
import Logo from "./Logo";
import SearchBar from "./locationAutocomplete/SearchBar";
import UserInfo from "./UserInfo";

interface Props {}
const TopBar: React.FC<Props> = () => {
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
            <Logo />
            <SearchBar />
            <UserInfo />
        </header>
    );
};

export default TopBar;
