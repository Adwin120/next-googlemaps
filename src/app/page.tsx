import GoogleMap from "@/components/GoogleMap";
import GoogleMapsApiProvider from "@/components/GoogleMapsApiProvider";

export default function Home() {
    return (
        <GoogleMapsApiProvider>
            <GoogleMap fallback={<div>test</div>} />
        </GoogleMapsApiProvider>
    );
}
