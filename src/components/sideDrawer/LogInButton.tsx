"use client"
import { signIn } from "next-auth/react";
import { HiArrowRightOnRectangle} from "react-icons/hi2"
import { square } from "../../../styled-system-out/patterns";

interface Props {}
const LogInButton: React.FC<Props> = () => {
    
    return (
        <button onClick={() => signIn()}>
            <HiArrowRightOnRectangle className={square({ size: 8, color: "white", bg: "secondary" })} />
            Log in
        </button>
    );;
};

export default LogInButton;