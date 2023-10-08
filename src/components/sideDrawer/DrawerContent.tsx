import DrawerHeader from "./DrawerHeader";
import UserData from "../userContentList/UserData";
import LogOutButton from "../authentication/LogOutButton";

import { divider, vstack } from "../../../styled-system-out/patterns";
import { Suspense } from "react";
import { BlockLoadingSpinner } from "../utils/LoadingSpinner";

interface Props {}
const DrawerContent: React.FC<Props> = () => {
    return (
        <div className={vstack({ h: "full" })}>
            <DrawerHeader />
            <Suspense fallback={<BlockLoadingSpinner />}>
                <UserData css={{ flexGrow: 1, w: "full" }} />
            </Suspense>
            <div className={divider({ thickness: "0.5", color: "gray.400" })} />
            <LogOutButton />
        </div>
    );
};

export default DrawerContent;
