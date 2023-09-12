"use client"
import { HiArrowLeftOnRectangle} from "react-icons/hi2"
import { signOut } from "next-auth/react";
import { square } from "../../../styled-system-out/patterns";

interface Props {}
const LogOutButton: React.FC<Props> = () => {
    return (
        <button onClick={() => signOut()}>
            <HiArrowLeftOnRectangle className={square({ size: 8, color: "red.500", bg: "secondary" })} />
            Log out
        </button>
    );
};

export default LogOutButton;
