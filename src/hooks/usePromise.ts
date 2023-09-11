/*
    "Traditional" use of Promises in React abstracted with a hook.
    Suspense + use() don't render the component during loading.
    This hook lets you null-coalesce the value with a default instead.
 */

import { useEffect, useState } from "react";

export type PromiseStatus = "loading" | "success" | "failure";

export type PromiseHookReturnTuple<S extends PromiseStatus, T, E> = readonly [T, S, E];

type ReturnValue<T, E> =
    | PromiseHookReturnTuple<"success", T, null>
    | PromiseHookReturnTuple<"failure", null, E>
    | PromiseHookReturnTuple<"loading", null, null>;

const initialState = [null, "loading", null] as const;


const usePromise = <T, E>(callback: () => Promise<T>): ReturnValue<T, E> => {
    const [state, setState] = useState<ReturnValue<T, E>>(initialState);
    useEffect(() => {
        let stale = false;
        setState(initialState);
        
        callback()
            .then((data) => {
                if (stale) return;
                setState([data, "success", null]);
            })
            .catch((error) => {
                if (stale) return;
                setState([null, "failure", error]);
            });
        return () => {
            stale = true;
        };
    }, [callback]);

    return state;
};

export default usePromise;
