"use client"
import GoogleMap from "@/components/GoogleMap";
import GoogleMapsApiProvider from "@/components/GoogleMapsApiProvider";
import MapMarker from "@/components/MapMarker";
import useGeolocation from "@/hooks/useGeolocation";

export default function Home() {
    const geolocation = useGeolocation();

    return (
        <GoogleMapsApiProvider>
            <GoogleMap fallback={<div>test</div>}>
                {geolocation && (
                    <MapMarker
                        position={{
                            lat: geolocation.coords.latitude,
                            lng: geolocation.coords.longitude,
                        }}
                        title="your location"
                    />
                )}
            </GoogleMap>
        </GoogleMapsApiProvider>
    );
}
