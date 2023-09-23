"use client";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { css } from "../../../styled-system-out/css";
import type { PropsWithPandaStyling } from "@/types/PropsWithPandaStyling";
import { square } from "../../../styled-system-out/patterns";
import useLatLng, { toGoogleMapsLatLng } from "@/hooks/useLatLng";
import { useMainMap } from "../layout/MainMapInstanceProvider";
import { useCallback } from "react";
import usePermission from "@/hooks/usePermission";

interface Props extends PropsWithPandaStyling {}
const GetLocationButton: React.FC<Props> = ({ css: cssProp }) => {
    const mainMap = useMainMap();
    const userLatLng = useLatLng();
    const locationPermission = usePermission("geolocation");

    // TODO: refactor for readability
    const onClickCallback = useCallback(() => {
        if (locationPermission === "prompt" && mainMap)
            return promptGeolocationPermission((pos) => centerMapOn(mainMap, pos));
        if (locationPermission === "prompt") promptGeolocationPermission();
        if (mainMap && userLatLng) centerMapOn(mainMap, userLatLng);
    }, [locationPermission, mainMap, userLatLng]);

    return (
        <button
            onClick={onClickCallback}
            disabled={!mainMap}
            className={css(
                {
                    p: 2,
                    bg: "secondary",
                    rounded: "md",
                    cursor: "pointer",
                    shadow: "bump",
                    _active: { shadow: "well" },
                },
                cssProp
            )}
        >
            <FaLocationCrosshairs className={square({ size: 8, color: "white" })} />
        </button>
    );
};

export default GetLocationButton;

// unified clean way to ask for permission not supported by browsers as of writing this code
// https://caniuse.com/mdn-api_permissions_request
// TODO: bug here, doesn't execute callback if position was cached
const promptGeolocationPermission = (
    andThen: (pos: google.maps.LatLngLiteral) => void = () => {}
) => {
    navigator.geolocation.getCurrentPosition(
        (data) => andThen(toGoogleMapsLatLng(data)),
        console.error
    );
};

const centerMapOn = (map: google.maps.Map, position: google.maps.LatLngLiteral): void => {
    console.log("panning");
    map.panTo(position);
};
