import { css } from "../../../styled-system-out/css";
import { hstack } from "../../../styled-system-out/patterns";
import AddMarkerButton from "./AddMarkerButton";

interface Props {}
const DrawerHeader: React.FC<Props> = () => {
    return (
        <div className={hstack({ w: "full", justify: "space-between", color: "white" })}>
            <h2 className={css({ fontSize: "3xl", fontWeight: "medium" })}>Your markers</h2>
            <div>
                <AddMarkerButton/>
            </div>
        </div>
    );
};

export default DrawerHeader;
