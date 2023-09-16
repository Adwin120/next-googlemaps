import { getUserData } from "@/utils/mock";
import MarkerCard from "./MarkerCard";
import { vstack } from "../../../styled-system-out/patterns";
import type PropsWithPandaStyling from "@/types/PropsWithPandaStyling";
import { query } from "@/db/dbConnection";
import selectMarkers from "@/db/marker/selectUserMarkers.sql"
import { useSession } from "next-auth/react";
import getDbSession from "@/auth/getDbSession";
import type MarkerData from "@/types/MarkerData";

interface Props extends PropsWithPandaStyling {}
const UserData: React.FC<Props> = async ({ css: cssProp }) => {
    const session = await getDbSession()
    const data = await query<MarkerData>(selectMarkers, [session?.user?.email]);
    console.log(data)
    return (
        <div className={vstack({ gap: "3", ...cssProp })}>
            {data.map((marker) => (
                <MarkerCard marker={marker} key={marker.id} />
            ))}
        </div>
    );
};

export default UserData;
