import PropsWithPandaStyling from "@/types/PropsWithPandaStyling";
import { getUser } from "@/utils/mock";
import { css } from "../../styled-system-out/css";
import { avatar, circle, hstack, square } from "../../styled-system-out/patterns";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Props extends PropsWithPandaStyling {}
const UserInfo: React.FC<Props> = async ({ css: cssProp }) => {
    const user = await getUser();
    return (
        <div className={hstack({ gap: "1", justify: "space-around", ...cssProp })}>
            <div className={avatar({ size: "10", shadow: "well" })}>
                <Image src={user.avatarUrl} alt={user.username} />
            </div>
            <span className={css({ color: "white", fontSize: "2xl" })}>{user.username}</span>
        </div>
    );
};

export default UserInfo;
