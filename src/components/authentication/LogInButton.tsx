"use client";
import { signIn } from "next-auth/react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { hstack, square } from "../../../styled-system-out/patterns";

interface Props {}
const LogInButton: React.FC<Props> = () => {
    // TODO: extract styles
    return (
        <button
            onClick={() => signIn()}
            className={hstack({
                gap: 2,
                w: "full",
                p: "4",
                justify: "center",
                fontSize: "2xl",
                fontWeight: "bold",
                color: "white",
                bg: "secondary",
                shadow: "bump",
                cursor: "pointer",
                rounded: "xl",
            })}
        >
            <HiArrowRightOnRectangle
                className={square({ size: 8, color: "white", bg: "secondary" })}
            />
            Log in
        </button>
    );
};

export default LogInButton;
