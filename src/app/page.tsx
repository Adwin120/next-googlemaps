"use client";
import TopBar from "@/components/TopBar";
import GoogleMap from "@/components/maps/GoogleMap";
import GoogleMapsApiProvider from "@/components/maps/GoogleMapsApiProvider";
import MapMarker from "@/components/maps/MapMarker";
import useGeolocation from "@/hooks/useGeolocation";
import useLatLng from "@/hooks/useLatLng";

export default function Home() {
    const clientLatLng = useLatLng();

    return (
        <GoogleMapsApiProvider>
            <TopBar/>
            {/* TODO: change fallback */}
            <GoogleMap fallback={<div>test</div>}>
                {clientLatLng && <MapMarker position={clientLatLng} title="your location" />}
            </GoogleMap>
        </GoogleMapsApiProvider>
    );
}
