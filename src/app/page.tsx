import TopBar from "@/components/TopBar";
import GoogleMapsApiProvider from "@/components/maps/GoogleMapsApiProvider";
import MainMap from "@/components/maps/MainMap";

export default function Home() {
    const clientLatLng = undefined;

    return (
        <GoogleMapsApiProvider>
            <TopBar/>
            <MainMap/>
        </GoogleMapsApiProvider>
    );
}
