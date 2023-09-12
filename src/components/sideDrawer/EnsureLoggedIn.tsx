import { PropsWithChildren, ReactNode } from "react";

// TODO: when not logged in, display fallback, if logged in display children
interface Props extends PropsWithChildren {
    fallback: ReactNode
}
const EnsureLoggedIn: React.FC<Props> = () => {
    
    return null;
};

export default EnsureLoggedIn;