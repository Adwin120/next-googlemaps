import getDbSession from "@/auth/getDbSession";
import type { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
    fallback: ReactNode;
}
const EnsureLoggedIn: React.FC<Props> = async ({ fallback, children }) => {
    const session = await getDbSession();
    const user = session?.user;

    if (!user) return <>{fallback}</>;
    return <>{children}</>;
};

export default EnsureLoggedIn;
