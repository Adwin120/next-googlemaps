import { getServerSession } from "next-auth";
import authOptions from "./options";

const getDbSession = () => {
    return getServerSession(authOptions);
}

export default getDbSession