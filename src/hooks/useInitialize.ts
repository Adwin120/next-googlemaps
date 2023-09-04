import { useEffect, useState } from "react";

/*
abstracted useEffect pattern from react docs
https://react.dev/learn/you-might-not-need-an-effect#initializing-the-application
 */
const useInitialize = (effect: () => void, dependencyList: (object | null)[]) => {
    const [performed, setPerformed] = useState<boolean>(false);
    useEffect(() => {
        if (dependencyList.every((x) => Boolean(x)) && !performed) {
            setPerformed(true);
            effect();
        }
    }, [effect, performed, dependencyList]);
    return performed;
};

export default useInitialize