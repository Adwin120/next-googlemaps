import { type DefaultSession } from "next-auth";
import getDbSession from "@/auth/getDbSession";
import Image from "next/image";

import type { PropsWithPandaStyling } from "@/types/PropsWithPandaStyling";
import { css } from "../../../styled-system-out/css";
import { avatar, hstack, square } from "../../../styled-system-out/patterns";
import { HiUserCircle } from "react-icons/hi2";

interface Props extends PropsWithPandaStyling {}
const UserInfo: React.FC<Props> = async ({ css: cssProp }) => {
    const session = await getDbSession();
    const userInfo = session?.user ?? guestInfo;

    const userDisplayName = userInfo?.name?.split(" ")[0];
    const userImage = userInfo?.image ? (
        <div className={avatar({ size: "10", shadow: "well" })}>
            <Image
                width={40}
                height={40}
                src={userInfo?.image}
                alt={userDisplayName ?? "user avatar"}
            />
        </div>
    ) : (
        <HiUserCircle className={square({ size: "10", color: "gray.400" })} />
    );

    return (
        <div className={hstack({ gap: "1", justify: "space-around", ...cssProp })}>
            {userImage}
            <span className={css({ color: "gray.100", fontSize: "2xl" })}>{userDisplayName}</span>
        </div>
    );
};

export default UserInfo;

const guestInfo: DefaultSession["user"] = {
    name: "Guest",
};
