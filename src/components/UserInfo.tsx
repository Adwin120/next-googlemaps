import PropsWithPandaStyling from "@/types/PropsWithPandaStyling";
import { getUser } from "@/utils/mock";
import { css, cx } from "../../styled-system-out/css";
import { circle, hstack, square } from "../../styled-system-out/patterns";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Props extends PropsWithPandaStyling {}
const UserInfo: React.FC<Props> = async ({ css: cssProp }) => {
    const user = await getUser();
    return (
        <div className={hstack({ gap: "1", justify: "space-around", ...cssProp })}>
            <Image src={user.avatarUrl} alt={user.username} className={circle({ size: 10 })} />
            <span className={css({ color: "white", fontSize: "2xl" })}>{user.username}</span>
            <ChevronDownIcon className={square({size: 8, mt: 1, color: "white", cursor: "pointer"})}/>
        </div>
    );
};

export default UserInfo;
