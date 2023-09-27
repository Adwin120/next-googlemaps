import { useCallback, useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";

const permissionFetcher = (name: PermissionName) => {
    return navigator.permissions.query({ name });
};

const usePermission = (name: PermissionName) => {
    const [permissionState, setPermissionState] = useState<PermissionState | null>(null);

    const { data: permission } = useSWRImmutable(name, permissionFetcher);

    const permissionChangeListener = useCallback(() => {
        if (!permission) return;
        setPermissionState(permission.state);
    }, [permission]);

    useEffect(() => {
        if (!permission) return;
        setPermissionState(permission.state);
        permission.addEventListener("change", permissionChangeListener);
        return () => {
            permission.removeEventListener("change", permissionChangeListener);
        };
    }, [permission, permissionChangeListener]);

    return permissionState;
};

export const getPermission = (name: PermissionName) =>
    navigator.permissions.query({ name }).then((perm) => perm.state);

export default usePermission;
