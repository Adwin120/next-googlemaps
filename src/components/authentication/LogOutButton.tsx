"use client";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";

import { square } from "../../../styled-system-out/patterns";
import { buttonStyles } from "./auth.css";
import { css } from "../../../styled-system-out/css";

interface Props {}
const LogOutButton: React.FC<Props> = () => {
    return (
        <button onClick={() => signOut()} className={css(buttonStyles, { color: "red.500" })}>
            <HiArrowLeftOnRectangle className={square({ size: 8 })} />
            Log out
        </button>
    );
};

export default LogOutButton;
