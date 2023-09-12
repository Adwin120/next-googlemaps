import { FaUserXmark } from "react-icons/fa6";
import { square, vstack } from "../../../styled-system-out/patterns";
import LogInButton from "./LogInButton";

interface Props {}
const NotLoggedInfo: React.FC<Props> = () => {
    return (
        <div className={vstack({gap: "1", color: "white"})}>
            <FaUserXmark className={square({ size: "20" })} />
            <p>To create marker stories you need to log in</p>
            <LogInButton/> 
        </div>
    );
};

export default NotLoggedInfo;
