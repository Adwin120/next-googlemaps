/*
    "Traditional" use of Promises in React abstracted with a hook.
    Suspense + use() don't render the component during loading.
    This hook lets you null-coalesce the value with a default instead.
 */

import { useEffect, useState } from "react";

export type PromiseStatus = "loading" | "success" | "failure";

type HookReturnTuple<S extends PromiseStatus, T, E> = [T, S, E];

type ReturnValue<T, E> =
    | HookReturnTuple<"success", T, null>
    | HookReturnTuple<"failure", null, E>
    | HookReturnTuple<"loading", null, null>;

//TODO: use one useState, change input from callback to Promise itself, change useCallback to useMemo in every use case
const usePromise = <T, E>(callback: () => Promise<T>): ReturnValue<T, E> => {
    const [status, setStatus] = useState<PromiseStatus>("loading");
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);
    useEffect(() => {
        let stale = false;
        setStatus("loading")
        callback()
            .then((data) => {
                if (stale) return;
                setStatus("success");
                setData(data);
            })
            .catch((error) => {
                if (stale) return;
                setStatus("failure");
                setError(error);
            });
        return () => {stale = true};
    }, [callback]);
    return [data, status, error] as ReturnValue<T, E>;
};

export default usePromise;
