import MarkerCard from "./MarkerCard";
import { vstack } from "../../../styled-system-out/patterns";
import type { PropsWithPandaStyling } from "@/types/PropsWithPandaStyling";
import { query } from "@/db/dbConnection";

import getDbSession from "@/auth/getDbSession";
import type MarkerData from "@/types/MarkerData";
import { cache } from 'react'
import { getUserMarkers } from "./getUserMarkers";

interface Props extends PropsWithPandaStyling {}
const UserData: React.FC<Props> = async ({ css: cssProp }) => {
    const session = await getDbSession();
    const data = await getUserMarkers(session?.user?.id!)
    return (
        <div className={vstack({ gap: "3", ...cssProp })}>
            {data.map((marker) => (
                <MarkerCard marker={marker} key={marker.id} />
            ))}
        </div>
    );
};

export default UserData;
