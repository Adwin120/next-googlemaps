import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useSearchParamsSetter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return useCallback(
        (newParams: Record<string, string | null>) => {
            const parameterObj = new URLSearchParams(searchParams);
            Object.entries(newParams).forEach(([key, value]) => {
                if (value === null) {
                    parameterObj.delete(key);
                } else {
                    parameterObj.set(key, value);
                }
            });
            router.push(pathname + "?" + parameterObj.toString());
        },
        [pathname, router, searchParams]
    );
};

export default useSearchParamsSetter;
