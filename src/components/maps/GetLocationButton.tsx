import { FaLocationCrosshairs } from "react-icons/fa6";
import { css } from "../../../styled-system-out/css";
import type { PropsWithPandaStyling } from "@/types/PropsWithPandaStyling";
import { square } from "../../../styled-system-out/patterns";
import { toGoogleMapsLatLng } from "@/hooks/useLatLng";

interface Props extends PropsWithPandaStyling {}
const GetLocationButton: React.FC<Props> = ({ css: cssProp }) => {
    return (
        <button
            onClick={promptAndCenterLocation}
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
const promptAndCenterLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => centerMapOn(toGoogleMapsLatLng(pos)));
};

//TODO: replace with call to center method on main map instance
const centerMapOn = (position: google.maps.LatLngLiteral): void => {};
