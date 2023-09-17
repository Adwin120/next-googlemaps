import { divider, vstack } from "../../styled-system-out/patterns";
import DrawerHeader from "./sideDrawer/DrawerHeader";
import UserData from "./sideDrawer/UserData";
import LogOutButton from "./utils/LogOutButton";

// TODO: move to some "layout" folder
interface Props {}
const DrawerContent: React.FC<Props> = () => {
    return (
        <div className={vstack({ h: "full" })}>
            <DrawerHeader />
            <UserData css={{ flexGrow: 1, w: "full" }} />
            <div className={divider({ thickness: "0.5", color: "gray.400" })} />
            <LogOutButton />
        </div>
    );
};

export default DrawerContent;
