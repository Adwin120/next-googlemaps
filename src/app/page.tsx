import Logo from "@/components/utils/Logo";
import TopBar from "@/components/topBar/TopBar";
import UserInfo from "@/components/topBar/UserInfo";
import SearchBar from "@/components/locationAutocomplete/SearchBar";
import GoogleMapsApiProvider from "@/components/maps/GoogleMapsApiProvider";
import MainMap from "@/components/maps/MainMap";
import SideDrawerOpener from "@/components/topBar/SideDrawerOpener";
import SideDrawer from "@/components/sideDrawer/SideDrawer";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/utils/LoadingSpinner";
import EnsureLoggedIn from "@/components/sideDrawer/EnsureLoggedIn";
import NotLoggedInfo from "@/components/sideDrawer/NotLoggedInfo";
import UserData from "@/components/sideDrawer/UserData";
import LogOutButton from "@/components/sideDrawer/LogOutButton";

export default function Home() {
    return (
        <GoogleMapsApiProvider>
            <TopBar>
                <Logo />
                <SearchBar />
                <SideDrawerOpener>
                    <Suspense fallback={<LoadingSpinner />}>
                        <UserInfo />
                    </Suspense>
                </SideDrawerOpener>
            </TopBar>

            <SideDrawer>
                <EnsureLoggedIn fallback={<NotLoggedInfo/>}>
                    <UserData/>
                    <LogOutButton/>
                </EnsureLoggedIn>
            </SideDrawer>
            
            <MainMap />
        </GoogleMapsApiProvider>
    );
}
