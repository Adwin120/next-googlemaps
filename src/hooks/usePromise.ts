/*
    "Traditional" use of Promises in React abstracted with a hook.
    Suspense + use() don't render the component during loading.
    This hook lets you null-coalesce the value with a default instead.
 */

import { useEffect, useState } from "react";

type Status = "loading" | "success" | "failure";

type HookReturnTuple<S extends Status, T, E> = [T, S, E];

type ReturnValue<T, E> =
    | HookReturnTuple<"success", T, null>
    | HookReturnTuple<"failure", null, E>
    | HookReturnTuple<"loading", null, null>;

const usePromise = <T, E>(callback: () => Promise<T>): ReturnValue<T, E> => {
    const [status, setStatus] = useState<Status>("loading");
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);
    useEffect(() => {
        callback()
            .then((data) => {
                setStatus("success");
                setData(data);
            })
            .catch((error) => {
                setStatus("failure");
                setError(error);
            });
    }, [callback]);
    return [data, status, error] as ReturnValue<T, E>;
};

export default usePromise;
