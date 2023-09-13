import { getUserData } from "@/utils/mock";
import MarkerCard from "./MarkerCard";
import { vstack } from "../../../styled-system-out/patterns";
import type PropsWithPandaStyling from "@/types/PropsWithPandaStyling";

interface Props extends PropsWithPandaStyling {}
const UserData: React.FC<Props> = async ({ css: cssProp }) => {
    const data = await getUserData();
    return (
        <div className={vstack({ gap: "3", ...cssProp })}>
            {data.map((marker) => (
                <MarkerCard marker={marker} key={marker.id} />
            ))}
        </div>
    );
};

export default UserData;
