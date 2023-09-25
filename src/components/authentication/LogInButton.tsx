"use client";
import { signIn } from "next-auth/react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { square } from "../../../styled-system-out/patterns";
import { css } from "../../../styled-system-out/css";
import { buttonStyles } from "./auth.css";

interface Props {}
const LogInButton: React.FC<Props> = () => {
    return (
        <button onClick={() => signIn()} className={css(buttonStyles)}>
            <HiArrowRightOnRectangle
                className={square({ size: 8, color: "white", bg: "transparent" })}
            />
            Log in
        </button>
    );
};

export default LogInButton;
