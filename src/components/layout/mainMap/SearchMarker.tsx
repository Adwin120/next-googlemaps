import { use, useMemo } from "react";

import { useParentMap } from "@/components/maps/GoogleMap";
import { useSearchParams } from "next/navigation";

import MapMarker from "@/components/maps/MapMarker";
import useGoogleMapsAPI from "@/hooks/useGoogleMapsAPI";

interface Props {}
const SearchMarker: React.FC<Props> = () => {
    const geocoder = useGoogleMapsAPI("geocoder");
    const params = useSearchParams();
    const map = useParentMap();
    const searchResultPlaceID = params.get("search");

    const geocodeResultPlaceID = useMemo(async () => {
        if (!geocoder || !searchResultPlaceID) return null;
        const geocodeResults = await geocoder.geocode({ placeId: searchResultPlaceID });
        const location = geocodeResults.results[0]?.geometry.location;
        if (location) {
            map?.panTo(location);
        }
        return location ?? null;
    }, [geocoder, map, searchResultPlaceID]);
    const resultLocation = use(geocodeResultPlaceID);

    return <MapMarker position={resultLocation} title="search result" />;
};

export default SearchMarker;
