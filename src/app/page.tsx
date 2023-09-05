"use client"
import GoogleMap from "@/components/GoogleMap";
import GoogleMapsApiProvider from "@/components/GoogleMapsApiProvider";
import MapMarker from "@/components/MapMarker";
import useGeolocation from "@/hooks/useGeolocation";
import useLatLng from "@/hooks/useLatLng";

export default function Home() {
    const clientLatLng = useLatLng();

    return (
        <GoogleMapsApiProvider>
            <GoogleMap fallback={<div>test</div>}>
                {clientLatLng && (
                    <MapMarker
                        position={clientLatLng}
                        title="your location"
                    />
                )}
            </GoogleMap>
        </GoogleMapsApiProvider>
    );
}
