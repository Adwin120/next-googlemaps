"use client";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import { hstack, square } from "../../../styled-system-out/patterns";

interface Props {}
const LogOutButton: React.FC<Props> = () => {
    return (
        <button
            onClick={() => signOut()}
            className={hstack({
                gap: 2,
                w: "full",
                p: "4",
                fontSize: "2xl",
                fontWeight: "bold",
                color: "red.500",
                bg: "gray.900",
                shadow: "bump",
                cursor: "pointer",
                rounded: "lg"
            })}
        >
            <HiArrowLeftOnRectangle className={square({ size: 8 })} />
            Log out
        </button>
    );
};

export default LogOutButton;
