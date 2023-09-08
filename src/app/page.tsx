import Logo from "@/components/Logo";
import TopBar from "@/components/TopBar";
import UserInfo from "@/components/UserInfo";
import SearchBar from "@/components/locationAutocomplete/SearchBar";
import GoogleMapsApiProvider from "@/components/maps/GoogleMapsApiProvider";
import MainMap from "@/components/maps/MainMap";
import SideDrawerOpener from "@/components/SideDrawerOpener";
import SideDrawer from "@/components/SideDrawer";

export default function Home() {
    return (
        <GoogleMapsApiProvider>
            <TopBar>
                <Logo />
                <SearchBar />
                <SideDrawerOpener>
                    <UserInfo />
                </SideDrawerOpener>
            </TopBar>
            <SideDrawer/>
            <MainMap />
        </GoogleMapsApiProvider>
    );
}
