import { useEffect, useRef } from "react";
import usePromise, { type PromiseHookReturnTuple } from "./usePromise";

type ReturnValue<T, E> =
    | PromiseHookReturnTuple<"success", T, null>
    | PromiseHookReturnTuple<"failure", null, E>
    | PromiseHookReturnTuple<"loading", T | null, null>;

const useMemoizedPromise = <T, E>(callback: () => Promise<T>): ReturnValue<T, E> => {
    const [value, status, error] = usePromise<T, E>(callback);
    const ref = useRef<T | null>(null);

    if (value !== null || status === "success") ref.current = value;

    return [ref.current, status, error] as ReturnValue<T, E>;
};

export default useMemoizedPromise;
