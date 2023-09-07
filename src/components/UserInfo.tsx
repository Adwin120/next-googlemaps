import PropsWithPandaStyling from "@/types/PropsWithPandaStyling";
import { getUser } from "@/utils/mock";
import { css, cx } from "../../styled-system-out/css";
import { circle, hstack } from "../../styled-system-out/patterns";
import Image from "next/image";

interface Props extends PropsWithPandaStyling {}
const UserInfo: React.FC<Props> = async ({ css: cssProp }) => {
    const user = await getUser();
    return (
        <div className={cx(hstack({ gap: "1", justify: "space-around" }), css(cssProp))}>
            <Image src={user.avatarUrl} alt={user.username} className={circle({ size: 10 })} />
            <span
                className={css({
                    color: "white",
                    fontSize: "2xl",
                })}
            >
                {user.username}
            </span>
        </div>
    );
};

export default UserInfo;
